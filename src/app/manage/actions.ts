"use server";

import { auth } from "@/auth";
import prisma from "@/db";
import { TUser } from "@/lib/schema";
import { LOGIN } from "@/utils/constants";
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
