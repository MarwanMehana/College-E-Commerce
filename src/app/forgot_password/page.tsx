"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// component
import ForgotPasswordForm from "../_components/Authentication/RegisterForm/ForgotPasswordForm";

// ui
import { toast } from "sonner";

// Schema
import {
  ForgotPasswordFormSchema,
  ForgotPasswordFormSchemaType,
} from "../../Schema/ForgotPassword.s";

// validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// API
import { ForgotPasswordAPI } from "../../api/Authentication/ForgotPassword";
import { AxiosError } from "axios";

const ForgotPassword = () => {
  const router = useRouter();
  const [loding, setLoding] = useState(false);

  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handelForgotPassword = async (values: ForgotPasswordFormSchemaType) => {
    setLoding(true);
    try {
      const forgotPassword = await ForgotPasswordAPI(values);
      toast.success(forgotPassword?.message);
      router.push("/verify-code");
      setLoding(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong!");
      setLoding(false);
    }
  };
  return (
    <div className="py-20 h-screen">
      <ForgotPasswordForm
        bigTitle="Forgot Password"
        title="Enter your email below to receive a verification code"
        buttonTitle={loding ? "waiting 😮‍💨" : "Verify"}
        inputs={[
          {
            name: "email",
            title: "Email",
            type: "email",
          },
        ]}
        form={form}
        onSubmit={handelForgotPassword}
      />
    </div>
  );
};

export default ForgotPassword;
