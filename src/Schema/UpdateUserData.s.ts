

import { z } from "zod";

export const UpdateUserDataFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be at most 20 characters." }),

  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, {
      message: "Phone number must be a valid Egyptian number (e.g. 01[0|1|2|5}********).",
    }),
});


export type UpdateUserDataFormSchemaType = z.infer<typeof UpdateUserDataFormSchema>
