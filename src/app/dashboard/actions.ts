"use server";

import { auth } from "@/auth";
import prisma from "@/db";
import { LOGIN } from "@/utils/constants";
import { TCategory, TTransaction } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function NewCategory(data: TCategory) {
  const session = await auth();
  if (!session?.user?.id) redirect(LOGIN);

  await prisma.category.create({
    data: {
      type: data.type,
      name: data.name,
      icon: data.icon,
      userId: session.user.id,
    },
  });
  return true;
}

export async function NewTransaction(data: TTransaction) {
  try {
    const session = await auth();
    if (!session?.user?.id) redirect(LOGIN);

    const date = new Date(data.date); // Ensure this is in UTC

    const localDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const day = localDate.getDate();
    const month = localDate.getMonth(); // Adding 1 since months are zero-based
    const year = localDate.getFullYear();

    await prisma.$transaction([
      // Create transaction
      prisma.transaction.create({
        data: {
          amount: data.amount,
          date: date.toISOString(), // Save date in UTC
          description: data.description || "",
          type: data.type,
          category: data.category,
          categoryIcon: data.categoryIcon,
          userId: session.user.id,
        },
      }),
      // Update month history
      prisma.monthHistory.upsert({
        where: {
          day_month_year_userId: {
            day,
            month,
            year,
            userId: session.user.id,
          },
        },
        create: {
          userId: session.user.id,
          day,
          month,
          year,
          income: data.type === "Income" ? data.amount : 0,
          expense: data.type === "Expense" ? data.amount : 0,
        },
        update: {
          income: {
            increment: data.type === "Income" ? data.amount : 0,
          },
          expense: {
            increment: data.type === "Expense" ? data.amount : 0,
          },
        },
      }),
      // Update year history
      prisma.yearHistory.upsert({
        where: {
          month_year_userId: {
            month,
            year,
            userId: session.user.id,
          },
        },
        create: {
          userId: session.user.id,
          month,
          year,
          income: data.type === "Income" ? data.amount : 0,
          expense: data.type === "Expense" ? data.amount : 0,
        },
        update: {
          income: {
            increment: data.type === "Income" ? data.amount : 0,
          },
          expense: {
            increment: data.type === "Expense" ? data.amount : 0,
          },
        },
      }),
    ]);

    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    console.log(error);
  }
}
