import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be at most 20 characters." }),

  email: z.string().email({ message: "Invalid email address." }),

  password: z
    .string()
    .regex(/^[A-Za-z][A-Za-z0-9]{5,8}$/, {
      message:
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers.",
    }),

  rePassword: z.string(),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, {
      message: "Phone number must be a valid Egyptian number (e.g. 01[0|1|2|5}********).",
    }),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match.",
  path: ["rePassword"], 
});


export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>
