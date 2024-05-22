"use server";
import { auth } from "@/auth";
import { TRangedTransactions } from "../api/transactions-history/route";
import { redirect } from "next/navigation";
import { LOGIN } from "@/utils/constants";
import prisma from "@/db";

export async function DeleteTransaction(data: TRangedTransactions[0]) {
  try {
    const session = await auth();
    if (!session?.user) redirect(LOGIN);

    console.log("@#############transaction", data);
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: data.id,
        userId: session.user.id || "",
      },
    });

    if (!transaction) return false;

    await prisma.$transaction([
      prisma.transaction.delete({
        where: {
          id: data.id,
          userId: session.user.id || "",
        },
      }),
      prisma.monthHistory.update({
        where: {
          day_month_year_userId: {
            userId: session.user.id || "",
            day: new Date(data.date).getDate(),
            month: new Date(data.date).getMonth(),
            year: new Date(data.date).getFullYear(),
          },
        },
        data: {
          ...(data.type === "Expense" && {
            expense: { decrement: data.amount },
          }),
          ...(data.type === "Income" && {
            expense: { decrement: data.amount },
          }),
        },
      }),
      prisma.yearHistory.update({
        where: {
          month_year_userId: {
            userId: session.user.id || "",
            month: new Date(data.date).getMonth(),
            year: new Date(data.date).getFullYear(),
          },
        },
        data: {
          ...(data.type === "Expense" && {
            expense: { decrement: data.amount },
          }),
          ...(data.type === "Income" && {
            expense: { decrement: data.amount },
          }),
        },
      }),
    ]);

    return true;
  } catch (error) {
    console.log("error", error);
  }
}
