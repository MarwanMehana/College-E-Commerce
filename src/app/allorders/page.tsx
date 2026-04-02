"use server";

import React from "react";
import { getUserOrdersAction } from "../../Actions/orders/getUserOrders";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import Image from "next/image";
import { AllOrdersT } from "../../Types/AllOrders.t";

const AllOrders = async () => {
  const allOrders: AllOrdersT[] = await getUserOrdersAction();
  console.log(allOrders);

  return (
    <div className="p-20 flex justify-center items-center min-h-screen w-full">
      {allOrders.length > 0 ? (
        <Accordion type="single" collapsible className="w-full max-w-4xl">
          {allOrders.map((order: AllOrdersT, index: number) => (
            <AccordionItem key={order._id || index} value={`item-${index}`}>
              <AccordionTrigger>Order #{order.id}</AccordionTrigger>
              <AccordionContent>
                <p>
                  <span className="font-semibold">Customer:</span>{" "}
                  {order.user?.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {order.user?.email}
                </p>
                <p>
                  <span className="font-semibold">City:</span>{" "}
                  {order.shippingAddress?.city}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {order.shippingAddress?.phone}
                </p>
                <p>
                  <span className="font-semibold">Total Price:</span>{" "}
                  {order.totalOrderPrice} EGP
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.paymentMethodType}
                </p>
                <p>
                  <span className="font-semibold">Paid:</span>{" "}
                  <span
                    className={
                      order.isPaid ? "text-green-600 font-medium" : "text-red-600 font-medium"
                    }
                  >
                    {order.isPaid ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Delivered:</span>{" "}
                  <span
                    className={
                      order.isDelivered ? "text-green-600 font-medium" : "text-red-600 font-medium"
                    }
                  >
                    {order.isDelivered ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Items Count:</span>{" "}
                  {order.cartItems.length}
                </p>

                {/* ✅ المنتجات */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Products:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.cartItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 border p-3 rounded-lg shadow-sm hover:shadow-md transition"
                      >
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          width={200}
                          height={200}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.count} × {item.price} EGP
                          </p>
                          <p className="text-sm font-semibold">
                            Subtotal: {item.price * item.count} EGP
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-gray-500 mt-10">No orders available.</p>
      )}
    </div>
  );
};

export default AllOrders;
