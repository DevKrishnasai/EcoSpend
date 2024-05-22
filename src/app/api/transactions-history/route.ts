import { auth } from "@/auth";
import prisma from "@/db";
import { statsDateSchema } from "@/lib/schema";
import { LOGIN } from "@/utils/constants";
import { redirect } from "next/navigation";
import { TRangePicker } from "@/utils/types";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to");
  const from = searchParams.get("from");

  const safeData = statsDateSchema.safeParse({ to, from });

  if (!safeData.success) {
    Response.json(safeData.error, { status: 400 });
  }
  console.log("@@@@@@@@!!!!!!!!!!!!!", safeData.data);

  const data = await RangedTransactions(
    safeData.data || { from: new Date(), to: new Date() }
  );

  return Response.json(data, { status: 200 });
}

async function RangedTransactions({ from, to }: TRangePicker) {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);
  const data = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: from,
        lte: to,
      },
    },
    select: {
      amount: true,
      category: true,
      categoryIcon: true,
      date: true,
      description: true,
      type: true,
      id: true,
    },
  });
  return data;
}

export type TRangedTransactions = Awaited<
  ReturnType<typeof RangedTransactions>
>;
