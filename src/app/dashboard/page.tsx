import { auth } from "@/auth";
import { LOGIN } from "@/utils/constants";
import StatsSection from "./_components/StatsSection";
import { redirect } from "next/navigation";
import WidthWraper from "../_components/WidthWraper";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  return (
    <WidthWraper>
      <StatsSection />
    </WidthWraper>
  );
};

export default page;
