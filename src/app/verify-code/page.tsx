"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// component
import ForgotPasswordForm from "../_components/Authentication/RegisterForm/ForgotPasswordForm";

// ui
import { toast } from "sonner";

// Schema
import {
  VerifyCodeFormSchema,
  VerifyCodeFormSchemaType,
} from "../../Schema/VerifyCode.s";

// validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// API
import { AxiosError } from "axios";
import { VerifyResetCode } from "../../api/Authentication/VerifyResetCode";

const VerifyCode = () => {
  const router = useRouter();
  const [loding, setLoding] = useState(false);

  const form = useForm<VerifyCodeFormSchemaType>({
    resolver: zodResolver(VerifyCodeFormSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  const handelVerifyCode = async (values: VerifyCodeFormSchemaType) => {
    setLoding(true);
    try {
      const verifyResetCode = await VerifyResetCode(values);
      toast.success(verifyResetCode?.status);
      router.push("/reset-password");
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
        title="Enter the verification code sent to your email"
        buttonTitle={loding ? "waiting 😮‍💨" : "Verify"}
        inputs={[
          {
            name: "resetCode",
            title: "Verification Code",
            type: "text",
          },
        ]}
        form={form}
        onSubmit={handelVerifyCode}
      />
    </div>
  );
};

export default VerifyCode;
