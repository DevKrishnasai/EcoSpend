import { auth } from "@/auth";
import prisma from "@/db";
import { LOGIN } from "@/utils/constants";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) redirect(LOGIN);

    const data = await YearHistory(session.user.id || "");

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ message: "something went wrong" }, { status: 400 });
  }
}

async function YearHistory(id: string) {
  const data = await prisma.monthHistory.findMany({
    where: {
      userId: id,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: {
      year: "asc",
    },
  });
  const years = data.map((d) => d.year);
  if (!years.length) {
    return [new Date().getFullYear()];
  }
  return years;
}

export type TYearHistory = Awaited<ReturnType<typeof YearHistory>>;
