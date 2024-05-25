import { auth } from "@/auth";
import TransactionHistory from "./_components/TransactionHistory";
import { redirect } from "next/navigation";
import { LOGIN } from "@/utils/constants";
import WidthWraper from "../_components/WidthWraper";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);
  return (
    <WidthWraper>
      <TransactionHistory />
    </WidthWraper>
  );
};

export default page;
