"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
  RegisterFormSchema,
  RegisterFormSchemaType,
} from "../../../../Schema/Register.s";

// api
import { Signup } from "../../../../api/Authentication/Signup";
import { AxiosError } from "axios";

const RegisterForm = () => {
  const router = useRouter();
  const [loding, setLoding] = useState(false);

  const formSchema = RegisterFormSchema;
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const handelRegister = async (values: RegisterFormSchemaType) => {
    setLoding(true);
    try {
      const signup = await Signup(values);
      if ("user" in signup) {
        toast.success(signup.message);
        router.push("/login");
      } else {
        toast.error(signup.message);
      }
      setLoding(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong!");
      if (err.response?.data?.message === "Account Already Exists")
        router.push("/login");
      setLoding(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handelRegister)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
              <FormDescription />
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password:</FormLabel>
              <FormControl>
                <Input type="password" {...field} required />
              </FormControl>
              <FormDescription />
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone:</FormLabel>
              <FormControl>
                <Input type="tel" {...field} required />
              </FormControl>
              <FormDescription />
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white"
        >
          {loding ? "waiting 😮‍💨" : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
