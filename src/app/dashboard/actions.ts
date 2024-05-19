"use server";

import { auth } from "@/auth";
import prisma from "@/db";
import { LOGIN } from "@/utils/constants";
import { TCategory, TTransaction } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function NewTransaction(data: TTransaction) {
  try {
    const session = await auth();
    if (!session?.user?.id) redirect(LOGIN);

    await prisma.$transaction([
      // Create transaction
      prisma.transaction.create({
        data: {
          amount: data.amount,
          date: data.date,
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
            day: new Date(data.date).getDate(),
            month: new Date(data.date).getUTCMonth(),
            year: new Date(data.date).getUTCFullYear(),
            userId: session.user.id,
          },
        },
        create: {
          userId: session.user.id,
          day: new Date(data.date).getDate(),
          month: new Date(data.date).getUTCMonth(),
          year: new Date(data.date).getUTCFullYear(),
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
            month: new Date(data.date).getUTCMonth(),
            year: new Date(data.date).getUTCFullYear(),
            userId: session.user.id,
          },
        },
        create: {
          userId: session.user.id,
          month: new Date(data.date).getUTCMonth(),
          year: new Date(data.date).getUTCFullYear(),
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
