import { z } from "zod";

export const paymentFormSchema = z.object({
  details: z.string(),
  phone: z.string(),
  city: z.string(),
});

export type PaymentFormSchemaType = z.infer<typeof paymentFormSchema>;

export interface Address extends PaymentFormSchemaType {
  _id: string;
}
