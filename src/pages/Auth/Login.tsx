import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  phone: z.string().regex(/^(5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, {
    message: "رقم الجوال غير صحيح",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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
              <h1 className="text-4xl  font-bold tracking-tighter text-primary">
                تسجيل الدخول
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                أدخل هاتفك لتسجيل الدخول
              </p>
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <div className="space-y-2">
                    <div>
                      <FormLabel>الجوال</FormLabel>
                      <div className="flex flex-row-reverse gap-x-4 ">
                        <Input
                          className="w-16 text-left"
                          disabled
                          value="+966"
                        />
                        <FormControl>
                          <Input
                            type="number"
                            dir="ltr"
                            required
                            {...field}
                            className="placeholder:text-right"
                            placeholder="الجوال*"
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
                تسجيل الدخول
              </Button>
              <div className="flex items-center">
                <p className="text-gray-500 dark:text-gray-400">
                  ليس لديك حساب؟
                </p>
                <Link to="/auth/register" className="text-primary">
                  <Button variant={"link"}>سجل الان</Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
