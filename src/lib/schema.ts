import { differenceInDays } from "date-fns";
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

export const transactionSchema = z.object({
  type: z.enum(["Income", "Expense"]),
  category: z.string({
    message: "select a category",
  }),
  categoryIcon: z.string(),
  amount: z.coerce
    .number()
    .nonnegative({
      message: "amount cannot negative",
    })
    .positive({
      message: "amount cannot be 0",
    })
    .multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export const categorySchema = z.object({
  name: z.string().min(3, {
    message: "minimum 3 characters",
  }),
  type: z.enum(["Income", "Expense"]),
  icon: z.string(),
});

export const statsDateSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })

  .refine(
    (data) => {
      const diff = differenceInDays(
        new Date(data.to).toUTCString(),
        new Date(data.from).toUTCString()
      );

      return diff <= 120;
    },
    {
      message: "date range must be less than 120 days",
    }
  );

export const periodHistorySchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number().max(11).min(0),
  period: z.enum(["year", "month"]),
});

export const categoriesSchema = z.array(categorySchema);

export const transactionTypeSchema = z.enum(["Income", "Expense"]).nullable();
