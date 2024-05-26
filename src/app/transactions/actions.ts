"use server";

import { auth } from "@/auth";
import prisma from "@/db";
import { LOGIN } from "@/utils/constants";
import { TRangedTransactions } from "../api/transactions-history/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DeleteTransaction(data: TRangedTransactions[0]) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect(LOGIN);
      return false;
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: data.id,
        userId: session.user.id,
      },
    });

    if (!transaction) {
      console.error("Transaction not found for deletion:", data.id);
      return false;
    }

    console.log("########### transaction ###########", transaction);

    const date = new Date(transaction.date); // Ensure this is in UTC
    const localDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const day = localDate.getDate();
    const month = localDate.getMonth(); // Adding 1 since months are zero-based
    const year = localDate.getFullYear();

    await prisma.$transaction(async (prisma) => {
      await prisma.transaction.delete({
        where: {
          id: data.id,
        },
      });

      await prisma.monthHistory.update({
        where: {
          day_month_year_userId: {
            userId: session?.user?.id || "",
            day,
            month,
            year,
          },
        },
        data: {
          ...(transaction.type === "Expense" && {
            expense: { decrement: transaction.amount },
          }),
          ...(transaction.type === "Income" && {
            income: { decrement: transaction.amount },
          }),
        },
      });

      await prisma.yearHistory.update({
        where: {
          month_year_userId: {
            userId: session?.user?.id || "",
            month,
            year,
          },
        },
        data: {
          ...(transaction.type === "Expense" && {
            expense: { decrement: transaction.amount },
          }),
          ...(transaction.type === "Income" && {
            income: { decrement: transaction.amount },
          }),
        },
      });
    });

    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return false;
  }
}
