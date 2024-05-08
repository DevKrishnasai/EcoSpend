import {
  categoriesSchema,
  categorySchema,
  transactionSchema,
  userSettingsSchema,
} from "@/lib/schema";
import { z } from "zod";

export type TNavItem = {
  label: string;
  href: string;
};

export type TUser = z.infer<typeof userSettingsSchema>;

export type TType = "Income" | "Expense";

export type TTransaction = z.infer<typeof transactionSchema>;

export type TCategory = z.infer<typeof categorySchema>;

export type TCategories = z.infer<typeof categoriesSchema>;
