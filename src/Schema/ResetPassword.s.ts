


import { z } from "zod";

export const ResetPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),

  newPassword: z
    .string()
    .regex(/^[A-Za-z][A-Za-z0-9]{5,8}$/, {
      message:
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers.",
    }),
  
});


export type ResetPasswordFormSchemaType = z.infer<typeof ResetPasswordFormSchema>
