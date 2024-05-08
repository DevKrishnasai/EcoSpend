import { auth } from "@/auth";
import prisma from "@/db";
import { transactionTypeSchema } from "@/lib/schema";
import { LOGIN } from "@/utils/constants";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  const { searchParams } = new URL(req.url);
  const value = searchParams.get("type");

  const safeData = transactionTypeSchema.safeParse(value);

  if (!safeData.success) {
    Response.json(safeData.error, { status: 400 });
  }
  const type = safeData.data?.type;
  const data = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
      ...(type && { type }),
    },
  });

  Response.json({ ...data }, { status: 200 });
}
