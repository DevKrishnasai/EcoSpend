import { auth } from "@/auth";
import prisma from "@/db";
import { periodHistorySchema } from "@/lib/schema";
import { LOGIN } from "@/utils/constants";
import { getDaysInMonth } from "date-fns";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) redirect(LOGIN);

    const { searchParams } = new URL(req.url);

    const period = searchParams.get("period");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    const safeData = periodHistorySchema.safeParse({
      period,
      year,
      month,
    });

    if (!safeData.success)
      return Response.json({ message: "invalid data" }, { status: 400 });

    const data = await historyData({
      ...safeData.data,
      userId: session.user.id || "",
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ message: "something went wrong" }, { status: 400 });
  }
}

const historyData = async ({
  period,
  year,
  month,
  userId,
}: {
  period: string;
  year: number;
  month: number;
  userId: string;
}) => {
  switch (period) {
    case "year":
      return await YearHistory(userId, year);
    case "month":
      return await MonthHistory(userId, year, month);
  }
};

type THistoryData = {
  year: number;
  month: number;
  income: number;
  expense: number;
  day?: number;
};

const YearHistory = async (id: string, year: number) => {
  const data = await prisma.yearHistory.groupBy({
    by: ["month"],
    where: {
      userId: id,
      year,
    },
    _sum: {
      income: true,
      expense: true,
    },
    orderBy: {
      month: "asc",
    },
  });

  if (!data || !data.length) return [];

  const historyData: THistoryData[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ].map((month) => {
    const monthData = data.find((d) => d.month === month);
    let income = 0;
    let expense = 0;
    if (monthData) {
      income = monthData._sum.income || 0;
      expense = monthData._sum.expense || 0;
    }
    return {
      year,
      month,
      income,
      expense,
    };
  });

  return historyData;
};

const MonthHistory = async (id: string, year: number, month: number) => {
  const data = await prisma.monthHistory.groupBy({
    by: ["day"],
    where: {
      userId: id,
      year,
      month,
    },
    _sum: {
      income: true,
      expense: true,
    },
    orderBy: {
      day: "asc",
    },
  });

  if (!data || !data.length) return [];

  const historyData: THistoryData[] = [];
  const maxDays = getDaysInMonth(new Date(year, month));
  for (let i = 1; i <= maxDays; i++) {
    const dayData = data.find((d) => d.day === i);
    let income = 0;
    let expense = 0;
    if (dayData) {
      income = dayData._sum.income || 0;
      expense = dayData._sum.expense || 0;
    }
    historyData.push({
      year,
      month,
      day: i,
      income,
      expense,
    });
  }

  return historyData;
};

export type THistory = Awaited<ReturnType<typeof historyData>>;
