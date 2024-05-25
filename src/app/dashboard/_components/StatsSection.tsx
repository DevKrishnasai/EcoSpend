"use client";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import OverviewSection from "./OverviewSection";
import OverCategoriesSection from "./OverCategoriesSection";
import OverChartsSection from "./OverChartsSection";
import AddTransaction from "./AddTransaction";
import { TUser } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const StatsSection = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [random, setRandom] = useState(Math.random());
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(Date.now()),
  });

  const { data: userInfo } = useQuery<TUser>({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user-details").then((res) => res.json()),
  });

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col justify-center items-center gap-2 md:flex-row lg:justify-end -mb-4">
        {/* <p className="text-2xl md:text-3xl font-bold">overview </p> */}
        <DateRangePicker
          onUpdate={(values) => {
            if (!values.range.from || !values.range.to) return;
            setDate(values.range);
          }}
          initialDateFrom={date.from}
          initialDateTo={date.to}
          align="start"
          locale="en-GB"
          showCompare={false}
        />
      </div>
      <OverviewSection date={date} random={random} />
      <OverCategoriesSection date={date} random={random} />
      <OverChartsSection
        random={random}
        setRandom={setRandom}
        currency={userInfo?.currency || ""}
      />
      <AddTransaction random={random} setRandom={setRandom} />
    </div>
  );
};

export default StatsSection;
