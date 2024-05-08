import { auth } from "@/auth";
import { LOGIN } from "@/utils/constants";
import { redirect } from "next/navigation";
import React from "react";
import CreatTransation from "./_components/CreatTransation";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);

  return (
    <div className="w-11/12 mx-auto">
      <section className="border-2 rounded-md py-4 px-5 flex flex-col justify-center items-center  md:flex-row md:justify-between md:items-center">
        <div className="text-center md:w-full md:text-left">
          <p className="text-4xl font-bold ">
            Hi, <span className="text-red-700">{session.user.name}</span>!
          </p>
          <p className=" font-semibold text-sm mb-4 md:mb-0 md:mt-1 ">
            hope all going well
          </p>
        </div>

        <div className="flex gap-5 justify-center items-center  md:justify-end w-full h-full">
          <CreatTransation
            trigger={<Button variant={"destructive"}>Expense</Button>}
            type="Expense"
          />
          <CreatTransation
            trigger={<Button variant={"default"}>Income</Button>}
            type="Income"
          />
        </div>
      </section>
    </div>
  );
};

export default page;
