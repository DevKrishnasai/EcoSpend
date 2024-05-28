"use client";
import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import { PiggyBank } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SIngleTabContent from "./SIngleTabContent";
import { TType } from "@/utils/types";
import { cn } from "@/lib/utils";

const toggleBodyOverflow = (shouldHide: any) => {
  window.scrollTo(0, 0);
  if (shouldHide) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
};

const AddTransaction = ({
  random,
  setRandom,
}: {
  random: number;
  setRandom: Dispatch<SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    toggleBodyOverflow(open);
    return () => toggleBodyOverflow(false);
  }, [open]);

  return (
    <>
      <div className="fixed bottom-5 right-5 ">
        <div className="flex gap-5 justify-center items-center md:justify-end w-full h-full">
          {!open && (
            <PiggyBank
              size={50}
              className="border-2 border-black rounded-full text-black dark:text-white dark:border-white text-3xl p-2 cursor-pointer animate-spin hover:animate-none"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>
      <div
        className={cn(
          "bg-red absolute top-0 left-0 w-full h-full -z-10",
          open &&
            "z-5 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-all duration-300 ease-in-out"
        )}
      ></div>
      {open && (
        <TabsForTransaction
          tab={open}
          setTab={setOpen}
          random={random}
          setRandom={setRandom}
        />
      )}
    </>
  );
};

export default AddTransaction;

const TabsForTransaction = ({
  setTab,
  tab,
  random,
  setRandom,
}: {
  tab: boolean;
  setTab: React.Dispatch<React.SetStateAction<boolean>>;
  random: number;
  setRandom: Dispatch<SetStateAction<number>>;
}) => {
  const [type, setType] = useState<TType>("Expense");

  return (
    <Tabs
      defaultValue="Expense"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-[400px] z-20"
    >
      <TabsList
        className={cn(
          "grid w-full grid-cols-2 rounded-b-none font-bold text-white",
          type === "Expense" ? "bg-red-800" : "bg-green-800"
        )}
      >
        <TabsTrigger
          value="Expense"
          onClick={() => setType("Expense")}
          className="transition-all duration-300 ease-in-out"
        >
          Expense
        </TabsTrigger>
        <TabsTrigger
          value="Income"
          onClick={() => setType("Income")}
          className="transition-all duration-300 ease-in-out"
        >
          Income
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="Expense"
        className="bg-inherit p-2 mt-0 border rounded-t-none rounded-b-lg"
      >
        <SIngleTabContent
          type="Expense"
          setTab={setTab}
          random={random}
          setRandom={setRandom}
        />
      </TabsContent>
      <TabsContent
        value="Income"
        className="bg-inherit p-2 mt-0 border rounded-t-none rounded-b-lg"
      >
        <SIngleTabContent
          type="Income"
          setTab={setTab}
          random={random}
          setRandom={setRandom}
        />
      </TabsContent>
    </Tabs>
  );
};
