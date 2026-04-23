import { z } from "zod";

export const AddAddressFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be at most 20 characters." }),
  details: z.string(),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, {
    message:
      "Phone number must be a valid Egyptian number (e.g. 01[0|1|2|5]********).",
  }),
  city: z
    .string()
    .min(3, { message: "City must be at least 3 characters." })
    .max(20, { message: "City must be at most 20 characters." }),
});

export type AddAddressFormSchemaType = z.infer<typeof AddAddressFormSchema>;

export interface AddAddress extends AddAddressFormSchemaType {
  _id: string;
}
