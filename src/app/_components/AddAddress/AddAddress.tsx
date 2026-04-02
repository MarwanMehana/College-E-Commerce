"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

// page and component
import ForgotPasswordForm from "../Authentication/RegisterForm/ForgotPasswordForm";
import LodingPage from "../../loading";

// validation
import {
  AddAddressFormSchema,
  AddAddressFormSchemaType,
} from "../../../Schema/AddAddress.s";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// UI
import { toast } from "sonner";

// API
import { AddAddressAPI } from "../../../api/User Addresses/AddAddress";
import { AxiosError } from "axios";

const AddAddress = () => {
  const { data, status, update } = useSession();

  const [loding, setLoding] = useState(false);

  const AddAddressForm = useForm<AddAddressFormSchemaType>({
    resolver: zodResolver(AddAddressFormSchema),
    defaultValues: {
      name: data?.user.name || "",
      details: "",
      phone: "",
      city: "",
    },
  });

  const handelAddAddress = async (values: AddAddressFormSchemaType) => {
    setLoding(true);
    try {
      const addAddressData = await AddAddressAPI(values);
      toast.success(addAddressData?.message);
      window.location.href = "/profile";
      await update();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoding(false);
    }
  };

  if (status === "loading") {
    return <LodingPage />;
  }
  return (
    <ForgotPasswordForm
      bigTitle="Add Your Address"
      title="Add your Address information"
      buttonTitle={loding ? "waiting 😮‍💨" : "Update"}
      inputs={[
        { name: "name", title: "Name", type: "text" },
        { name: "details", title: "Details", type: "text" },
        { name: "phone", title: "Phone", type: "text" },
        { name: "city", title: "City", type: "text" },
      ]}
      form={AddAddressForm}
      onSubmit={handelAddAddress}
    />
  );
};

export default AddAddress;
