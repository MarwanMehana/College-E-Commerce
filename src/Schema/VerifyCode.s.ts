import { z } from "zod";

export const VerifyCodeFormSchema = z.object({
  resetCode: z.string(),
});


export type VerifyCodeFormSchemaType = z.infer<typeof VerifyCodeFormSchema>
