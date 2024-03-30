import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const RegisterSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب ان يكون 3 احرف على الاقل" }),
  phone: z.string().regex(/^(5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, {
    message: "رقم الجوال غير صحيح",
  }),
});

const Register = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      phone: "",
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    console.log(data);
  }

  useEffect(() => {
    // if the first number is 0 then remove it
    if (form.watch("phone")?.charAt(0) === "0") {
      form.setValue(
        "phone",
        form.watch("phone")?.substring(1, form.watch("phone").length)
      );
    }
  }, [form.watch("phone")]);

  return (
    <div className="flex h-screen w-full flex-col justify-center">
      <div className="flex h-screen flex-1 items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container m-4 space-y-12 shadow-lg"
          >
            <div className="space-y-2 text-center">
              <img src="/Logo/blue.png" alt="" className="m-auto w-44" />
              <h1 className="text-4xl font-bold tracking-tighter text-primary">
                تسجيل جديد
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                أدخل البيانات التالية لتسجيل حساب جديد
              </p>
            </div>
            <div className="space-y-4">
              <Name />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <div className="space-y-2">
                    <div>
                      <FormLabel>الجوال</FormLabel>
                      <div className="flex flex-row-reverse gap-x-4 ">
                        <Input
                          className="w-24 text-left"
                          disabled
                          value="+966"
                          maxLength={9}
                        />
                        <FormControl>
                          <Input
                            type="number"
                            dir="ltr"
                            className="text-left placeholder:text-right"
                            required
                            {...field}
                            placeholder="رقم الجوال*"
                          />
                        </FormControl>
                      </div>
                    </div>

                    <FormDescription>5XXXXXXXX</FormDescription>
                    <FormMessage />
                  </div>
                )}
              />

              <Button type="submit" className="w-full">
                تسجيل جديد
              </Button>
              <div className="flex items-center">
                <p className="text-gray-500 dark:text-gray-400">
                  لديك حساب بالفعل؟
                </p>
                <Link to="/auth/login" className="text-primary">
                  <Button variant={"link"}>سجل دخول</Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const Name = () => {
  const form = useFormContext<z.infer<typeof RegisterSchema>>();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <div className="space-y-2">
          <div>
            <FormLabel>الاسم</FormLabel>
            <div className="flex flex-row-reverse gap-x-4 ">
              <FormControl>
                <Input required {...field} placeholder="الاسم*" />
              </FormControl>
            </div>
          </div>

          <FormMessage />
        </div>
      )}
    />
  );
};

export default Register;
