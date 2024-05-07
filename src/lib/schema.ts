import { z } from "zod";

export const userSettingsSchema = z.object({
  name: z.string().min(3, {
    message: "name must be greater than 3 characters",
  }),
  email: z.string().email({
    message: "email must be valid",
  }),
  country: z.string({
    message: "country must be valid",
  }),
  currency: z.string({
    message: "currency must be valid",
  }),
  image: z.string().url({
    message: "image must be valid",
  }),
  updatedAt: z.coerce.date(),
});

export type TUser = z.infer<typeof userSettingsSchema>;
