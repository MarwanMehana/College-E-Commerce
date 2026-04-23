import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),

  password: z
    .string()
    .regex(/^[A-Za-z][A-Za-z0-9]{5,10}$/, {
      message:
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers.",
    }),
  
});


export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>
