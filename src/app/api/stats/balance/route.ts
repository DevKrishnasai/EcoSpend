import { auth } from "@/auth";
import prisma from "@/db";
import { statsDateSchema } from "@/lib/schema";
import { LOGIN } from "@/utils/constants";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const safeData = statsDateSchema.safeParse({ from, to });

  if (!safeData.success) {
    return Response.json(safeData.error, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const stats = await getStats(safeData.data.from, safeData.data.to);
  return Response.json({ ...stats, currency: user?.currency }, { status: 200 });
}

async function getStats(from: Date, to: Date) {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);
  const data = await prisma.transaction.groupBy({
    by: ["type"],
    where: {
      userId: session.user.id,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const income = data.find((d) => d.type === "Income")?._sum.amount || 0;

  const expense = data.find((d) => d.type === "Expense")?._sum.amount || 0;

  return { income, expense };
}

export type TStats = Awaited<ReturnType<typeof getStats>> & {
  currency?: string;
};
