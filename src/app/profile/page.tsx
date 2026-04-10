"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

// page
import LodingPage from "../loading";
import AddAddress from "../_components/AddAddress/AddAddress";

// UI
import ForgotPasswordForm from "../_components/Authentication/RegisterForm/ForgotPasswordForm";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

// validation
import { useForm } from "react-hook-form";
import {
  UpdatePasswordFormSchema,
  UpdatePasswordFormSchemaType,
} from "../../Schema/UpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateUserDataFormSchema,
  UpdateUserDataFormSchemaType,
} from "../../Schema/UpdateUserData.s";
import { AddAddress as AddAddressType } from "../../Schema/AddAddress.s";

// API
import { UpdatePasswordAPI } from "../../api/Authentication/UpdatePasswordAPI";
import { AxiosError } from "axios";
import { UpdateDataAPI } from "../../api/Authentication/UpdateData";
import { GetUserAddresses } from "../../api/User Addresses/GetUserAddresses";
import { RemoveAddressAPI } from "../../api/User Addresses/RemoveAddress";

// icon
import { IoClose } from "react-icons/io5";

const Profile = () => {
  const { data, status, update } = useSession();
  const [loding, setLoding] = useState(false);

  // state for addresses
  const [addresses, setAddresses] = useState<AddAddressType[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showNewAddresses, setShowNewAddresses] = useState(false);


  // fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const { data } = await GetUserAddresses();
        console.log(data);

        setAddresses(data || []);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, []);

  // updatePassword
  const updatePasswordForm = useForm<UpdatePasswordFormSchemaType>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const handelUpdatePassword = async (values: UpdatePasswordFormSchemaType) => {
    setLoding(true);
    try {
      const updatePassword = await UpdatePasswordAPI(values);
      toast.success(updatePassword?.message);
      await update();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoding(false);
    }
  };

  // updateUserData
  const UpdateUserDataForm = useForm<UpdateUserDataFormSchemaType>({
    resolver: zodResolver(UpdateUserDataFormSchema),
    defaultValues: {
      name: data?.user.name || "",
      email: data?.user.email || "",
      phone: "",
    },
  });

  const handelUpdateUserData = async (values: UpdateUserDataFormSchemaType) => {
    setLoding(true);
    try {
      const updateUserData = await UpdateDataAPI(values);
      toast.success(updateUserData?.message);
      await update();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoding(false);
    }
  };

  const handelRemoveAddress = async (id: string) => {
    setLoding(true);
    try {
      const removeAddress = await RemoveAddressAPI(id);
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      toast.success(removeAddress?.message || "Address removed");
      await update();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoding(false);
    }
  };

  if (status === "loading" || loadingAddresses) {
    return <LodingPage />;
  }

  return (
    <div className="p-20">
      <h1 className="text-center font-bold text-3xl pb-10">Profile</h1>
      <div className="grid gap-5">
        <Accordion type="single" collapsible>
          {/* user data */}
          <AccordionItem value="item-1">
            <AccordionTrigger>User Data</AccordionTrigger>
            <AccordionContent>
              <div>
                <strong>Name: </strong>
                <span>{data?.user.name}</span>
              </div>
              <div>
                <strong>Email: </strong>
                <span>{data?.user.email}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* password */}
          <AccordionItem value="item-2">
            <AccordionTrigger> Update password</AccordionTrigger>
            <AccordionContent>
              <ForgotPasswordForm
                bigTitle="Update Password"
                title="Enter your current and new password"
                buttonTitle={loding ? "waiting 😮‍💨" : "Update"}
                inputs={[
                  {
                    name: "currentPassword",
                    title: "Current Password",
                    type: "password",
                  },
                  { name: "password", title: "New Password", type: "password" },
                  {
                    name: "rePassword",
                    title: "Confirm Password",
                    type: "password",
                  },
                ]}
                form={updatePasswordForm}
                onSubmit={handelUpdatePassword}
              />
            </AccordionContent>
          </AccordionItem>

          {/* update data */}
          <AccordionItem value="item-3">
            <AccordionTrigger>Update Data</AccordionTrigger>
            <AccordionContent>
              <ForgotPasswordForm
                bigTitle="Update Your Data"
                title="Update your personal information"
                buttonTitle={loding ? "waiting 😮‍💨" : "Update"}
                inputs={[
                  { name: "name", title: "Name", type: "text" },
                  { name: "email", title: "Email", type: "email" },
                  { name: "phone", title: "Phone", type: "text" },
                ]}
                form={UpdateUserDataForm}
                onSubmit={handelUpdateUserData}
              />
            </AccordionContent>
          </AccordionItem>

          {/* addresses */}
          <AccordionItem value="item-4">
            <AccordionTrigger>Address</AccordionTrigger>
            <AccordionContent>
              {addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-5 relative"
                      onClick={() => {
                        handelRemoveAddress(addr._id);
                      }}
                    >
                      <div className="absolute right-4 text-xl">
                        <IoClose />
                      </div>
                      <p>
                        <strong>Name:</strong> {addr.name}
                      </p>
                      <p>
                        <strong>City:</strong> {addr.city}
                      </p>
                      <p>
                        <strong>Phone:</strong> {addr.phone}
                      </p>
                      <p>
                        <strong>Details:</strong> {addr.details}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <AddAddress />
              )}
              <div
                className="pt-5 underline text-green-700 text-center"
                onClick={() => {
                  setShowNewAddresses(!showNewAddresses);
                }}
              >
                Add new address
              </div>
              {showNewAddresses && <AddAddress />}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Profile;
