"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// validation
import {
  AddAddress,
  AddAddressFormSchema,
  AddAddressFormSchemaType,
} from "../../Schema/AddAddress.s";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import LodingPage from "../loading";
import ForgotPasswordForm from "../_components/Authentication/RegisterForm/ForgotPasswordForm";

// UI
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

// Icons
import { IoClose } from "react-icons/io5";

// API
import { GetUserAddresses } from "../../api/User Addresses/GetUserAddresses";
import { AddAddressAPI } from "../../api/User Addresses/AddAddress";
import { RemoveAddressAPI } from "../../api/User Addresses/RemoveAddress";
import { AxiosError } from "axios";

// context
import { CartContext, CartContextType } from "../../context/CartContext";
import { CashOrderAction } from "../../Actions/orders/CashOrder";
import { OnlineOrderAction } from "../../Actions/orders/OnlineOrder";


const Payment = () => {
  const cartContext = useContext<CartContextType | null>(CartContext);

  if (!cartContext) {
    throw new Error("PaymentPage must be used within a CartProvider");
  }

  const { cartId } = cartContext;

  const [loding, setLoding] = useState(false);

  // for addres
  const [addresses, setAddresses] = useState<AddAddress[]>([]);
  const [paymentType, setPaymentType] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // form
  const { data, update } = useSession();

  // router
  const router = useRouter();

  const AddAddressForm = useForm<AddAddressFormSchemaType>({
    resolver: zodResolver(AddAddressFormSchema),
    defaultValues: {
      name: data?.user.name || "",
      details: "",
      phone: "",
      city: "",
    },
  });

  // get addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoding(true);
      try {
        const { data } = await GetUserAddresses();
        if (data && data.length > 0) {
          setAddresses(data);
        } else {
          setShowForm(true);
        }
      } catch (error) {
        console.error("Error fetching addresses", error);
      } finally {
        setLoding(false);
      }
    };
    fetchAddresses();
  }, []);

  // add address
  const handelAddAddress = async (values: AddAddressFormSchemaType) => {
    setLoding(true);
    try {
      const addAddressData = await AddAddressAPI(values);
      toast.success(addAddressData?.message);
      setAddresses((prev) => [...prev, addAddressData.address]);
      setShowForm(false);
      await update();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoding(false);
    }
  };

  // remove address
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

  // payment
  const handlePayment = async (address: AddAddress) => {
    setLoding(true);
    try {
      const { _id, name, ...rest } = address;
      switch (paymentType) {
        case "cath":
          setLoding(true);
          try {
            const res = await CashOrderAction(cartId, rest);
            toast.success(res?.status || "Done payment");
            router.push("/allorders");
          } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Something went wrong!");
          } finally {
            setLoding(false);
          }
          break;
        case "online":
          setLoding(true);
          try {
            const res = await OnlineOrderAction(cartId, rest);
            console.log(res);
            if (res?.status === "success") {
              toast.success(res?.status || "Done payment");
              window.location.href = res.session.url;
            }
          } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Something went wrong!");
          } finally {
            setLoding(false);
          }
          break;

        default:
          toast.error("Plase choose type of payment");
          break;
      }
      console.log(rest);
      console.log(paymentType);
    } catch (error) {
      console.error("Error during payment", error);
    } finally {
      setLoding(false);
    }
  };

  // CashOrderAction

  if (loding) return <LodingPage />;

  return (
    <div className="p-20 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 pb-10 pt-5">
        <h2 className="text-xl font-bold text-center">
          Choose type of payment
        </h2>

        <div className=" flex items-center gap-3">
          <Button
            className="bg-green-600 text-white"
            onClick={() => {
              setPaymentType("cath");
              setShowAddress(true);
            }}
          >
            Cash Order
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={() => {
              setPaymentType("online");
              setShowAddress(true);
            }}
          >
            Online
          </Button>
        </div>
      </div>

      {showAddress && (
        <>
          <h2 className="text-xl font-bold mb-6 text-center">
            Choose your address
          </h2>
          <div className="space-y-4">
            {addresses.map((address, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg flex justify-between items-center relative"
              >
                <div>
                  <div
                    className="absolute top-2 right-4 text-xl cursor-pointer"
                    onClick={() => handelRemoveAddress(address._id)}
                  >
                    <IoClose />
                  </div>

                  <p>
                    <strong>City:</strong> {address.city}
                  </p>
                  <p>
                    <strong>Details:</strong> {address.details}
                  </p>
                  <p>
                    <strong>Phone:</strong> {address.phone}
                  </p>
                </div>
                <Button
                  className="bg-green-600 text-white"
                  onClick={() => {
                    handlePayment(address);
                  }}
                >
                  Use this
                </Button>
              </div>
            ))}

            <div className="text-center pb-10">
              <Button
                variant="outline"
                onClick={() => setShowForm(!showForm)}
                className="mt-5"
              >
                ➕ Add new address
              </Button>
            </div>
          </div>
        </>
      )}

      {showForm && (
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
      )}
    </div>
  );
};

export default Payment;
