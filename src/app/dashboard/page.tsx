import { auth } from "@/auth";
import { LOGIN } from "@/utils/constants";
import { redirect } from "next/navigation";
import StatsSection from "./_components/StatsSection";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  return <StatsSection />;
};

export default page;
