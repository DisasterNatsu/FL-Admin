"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Axios } from "@/utils/AxiosConfig";

const formSchema = z.object({
  email: z.string().min(4, {
    message: "Email must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Home = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // initiate router
  const Router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const req = await Axios.post("/admin/log-in", values);

      const res: LogInResponseType = await req.data;

      Cookies.set("fl-admin-token", res.authToken, { expires: 3 });

      // show a toast

      toast({
        title: "Success",
        description: `Welcome back ${res.email}`,
      });
      return setTimeout(() => {
        Router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Something Went Wrong",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="w-96 border-2 p-5 rounded-md">
        <h2 className="text-center mb-2 font-semibold">Welcome Back</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                  {showPassword ? (
                    <EyeOff
                      className="absolute top-8 right-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Eye
                      className="absolute top-8 right-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Home;
