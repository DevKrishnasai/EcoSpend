import { auth } from "@/auth";
import { LOGIN } from "@/utils/constants";
import { redirect } from "next/navigation";
import AddTransaction from "./_components/AddTransaction";

import StatsSection from "./_components/StatsSection";
import PieChartSection from "./_components/PieChartSection";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  return (
    <div className="">
      {/* <section className="border-2 rounded-md py-4 px-5 flex flex-col justify-center items-center  md:flex-row md:justify-between md:items-center">
        <div className="text-center md:w-full md:text-left">
          <p className="text-4xl font-bold ">
            Hi, <span className="text-red-700">{session.user.name}</span>!
          </p>
          <p className=" font-semibold text-sm mb-4 md:mb-0 md:mt-1 ">
            hope all going well
          </p>
        </div>
      </section> */}
      <StatsSection />
      <PieChartSection />
    </div>
  );
};

export default page;
