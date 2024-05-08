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

    await prisma.transaction.create({
      data: {
        amount: data.amount,
        date: data.date,
        description: data.description || "",
        type: data.type,
        category: data.category,
        categoryIcon: data.categoryIcon,
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function NewCategory(data: TCategory) {
  try {
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
    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    console.log(error);
  }
}
