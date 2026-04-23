import { z } from "zod";

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z.string().regex(/^[A-Za-z][A-Za-z0-9]{5,8}$/, {
      message:
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers.",
    }),

    password: z.string().regex(/^[A-Za-z][A-Za-z0-9]{5,8}$/, {
      message:
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers.",
    }),

    rePassword: z.string().regex(/^[A-Za-z][A-Za-z0-9]{5,8}$/, {
      message:
        "Password must start with a letter, be 6-9 characters long, and contain only letters and numbers.",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match.",
    path: ["rePassword"],
  });

export type UpdatePasswordFormSchemaType = z.infer<
  typeof UpdatePasswordFormSchema
>;
