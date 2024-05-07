import { auth } from "@/auth";
import prisma from "@/db";
import { LOGIN } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) redirect(LOGIN);
    const data = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        name: true,
        email: true,
        image: true,
        country: true,
        currency: true,
        updatedAt: true,
      },

      //TODO: all transations should be fetched in future versions
    });
    if (!data) {
      throw new Error(`Could not find ${session.user.name}`);
    }
    revalidatePath("/dashboard");
    return Response.json({ ...data }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "something went wrong" }, { status: 400 });
  }
}
