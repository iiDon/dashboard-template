import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  password: z.string().min(6),
});

const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="flex h-screen w-full flex-col justify-center">
      <div className="flex h-screen flex-1 items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container pb-4 m-4 space-y-12 shadow-lg"
          >
            <div className="space-y-2 text-center">
              <img src="/Logo/blue.png" alt="" className="m-auto w-44" />
              <h1 className="text-4xl  font-bold tracking-tighter text-primary">
                تسجيل الدخول
              </h1>
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        placeholder="البريد الإلكتروني"
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        type="password"
                        placeholder="كلمة المرور"
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="w-full ">
                تسجيل الدخول
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
