import {
  categoriesSchema,
  categorySchema,
  statsDateSchema,
  transactionSchema,
  userSettingsSchema,
} from "@/lib/schema";
import { z } from "zod";

export type TNavItem = {
  label: string;
  link: string;
  cls?: string;
  icon: React.ReactNode;
};

export type TThemes = "light" | "dark";

export type TUser = z.infer<typeof userSettingsSchema>;

export type TType = "Income" | "Expense";

export type TTransaction = z.infer<typeof transactionSchema>;

export type TCategory = z.infer<typeof categorySchema>;

export type TCategories = z.infer<typeof categoriesSchema>;

export type TRangePicker = z.infer<typeof statsDateSchema>;
