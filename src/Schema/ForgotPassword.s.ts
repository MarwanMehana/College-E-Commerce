import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});


export type ForgotPasswordFormSchemaType = z.infer<typeof ForgotPasswordFormSchema>
