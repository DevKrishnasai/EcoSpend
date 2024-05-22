"use server";

import { auth } from "@/auth";
import prisma from "@/db";
import { LOGIN } from "@/utils/constants";
import { TType, TUser } from "@/utils/types";
import { redirect } from "next/navigation";

export async function updateUserDetailsAction(data: TUser) {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data,
  });
  return true;
}

export async function deleteCategory({
  name,
  icon,
  type,
}: {
  name: string;
  icon: string;
  type: TType;
}) {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  await prisma.category.delete({
    where: {
      name_userId_type: {
        name,
        userId: session.user.id || "",
        type,
      },
    },
  });
  return true;
}
