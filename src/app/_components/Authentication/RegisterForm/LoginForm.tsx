"use client";
import React, { useState } from "react";

// ui
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";

// validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Schema
import {
  LoginFormSchema,
  LoginFormSchemaType,
} from "../../../../Schema/Login.s";

// api
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [loding, setLoding] = useState(false);

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handelLogin = async (values: LoginFormSchemaType) => {
    setLoding(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.error) {
      toast.error(res.error);
      setLoding(false);
    } else {
      toast.success("Login successful!");
      setLoding(false);
      window.location.href = "/";
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handelLogin)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input type="email" {...field} required />
              </FormControl>
              <FormDescription />
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input type="password" {...field} required />
              </FormControl>
              <FormDescription />
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Link
          href="/forgot_password"
          className="text-sm underline hover:text-green-900"
        >
          Forgot Password?{" "}
        </Link>

        <Button
          variant="outline"
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white"
        >
          {loding ? "waiting 😮‍💨" : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
