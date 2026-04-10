"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// component
import ForgotPasswordForm from "../_components/Authentication/RegisterForm/ForgotPasswordForm";

// ui
import { toast } from "sonner";

// Schema
import {
  ResetPasswordFormSchema,
  ResetPasswordFormSchemaType,
} from "../../Schema/ResetPassword.s";

// validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// API
import { AxiosError } from "axios";
import { ResetPasswordAPI } from "../../api/Authentication/ResetPassword";

const ResetPassword = () => {
  const router = useRouter();
  const [loding, setLoding] = useState(false);

  const form = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const handelResetPassword = async (values: ResetPasswordFormSchemaType) => {
    setLoding(true);
    try {
      const token = await ResetPasswordAPI(values);
      toast.success("successful change password");
      router.push("/");
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
        title="Reset your account password"
        buttonTitle={loding ? "waiting 😮‍💨" : "Reset password"}
        inputs={[
          {
            name: "email",
            title: "Email",
            type: "email",
          },
          {
            name: "newPassword",
            title: "New Password",
            type: "password",
          },
        ]}
        form={form}
        onSubmit={handelResetPassword}
      />
    </div>
  );
};

export default ResetPassword;
