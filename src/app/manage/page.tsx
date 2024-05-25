import { auth } from "@/auth";
import BasicDeatilsSection from "./_components/BasicDeatilsSection";
import CategoryMangeSection from "./_components/CategoryMangeSection";
import { redirect } from "next/navigation";
import { LOGIN } from "@/utils/constants";
import WidthWraper from "../_components/WidthWraper";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);
  return (
    <WidthWraper>
      <div className="w-11/12 md:w-3/4 h-full mx-auto mt-5 space-y-4">
        <BasicDeatilsSection />
        <CategoryMangeSection />
      </div>
    </WidthWraper>
  );
};

export default page;
