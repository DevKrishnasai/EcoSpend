"use client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TYearHistory } from "@/app/api/historys/periods/route";
import CustomSkeloton from "@/components/CustomSkeloton";

const HistroySelector = ({
  period,
  setPeriod,
  timePeriod,
  setTimePeriod,
  random,
}: {
  period: "year" | "month";
  setPeriod: React.Dispatch<React.SetStateAction<"year" | "month">>;
  timePeriod: { month: number; year: number };
  setTimePeriod: React.Dispatch<
    React.SetStateAction<{ month: number; year: number }>
  >;
  random: number;
}) => {
  const { data, isFetching } = useQuery<TYearHistory>({
    queryKey: ["year-history", random],
    queryFn: () => fetch(`/api/historys/periods`).then((res) => res.json()),
  });

  return (
    <Tabs
      value={period}
      onValueChange={(val) => {
        setPeriod((_) => val as "year" | "month");
      }}
      className="w-full flex justify-start items-center gap-2"
    >
      <TabsList>
        <CustomSkeloton isLoading={isFetching}>
          <TabsTrigger value="year">year</TabsTrigger>
        </CustomSkeloton>
        <CustomSkeloton isLoading={isFetching}>
          <TabsTrigger value="month">month</TabsTrigger>
        </CustomSkeloton>
      </TabsList>
      <CustomSkeloton isLoading={isFetching} full={false}>
        <YearHistory
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          years={data || []}
        />
      </CustomSkeloton>

      {period === "month" && (
        <CustomSkeloton isLoading={isFetching} full={false}>
          <MonthHistory
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            years={data || []}
          />
        </CustomSkeloton>
      )}
    </Tabs>
  );
};

export default HistroySelector;

const YearHistory = ({
  setTimePeriod,
  timePeriod,
  years,
}: {
  setTimePeriod: Dispatch<
    SetStateAction<{
      month: number;
      year: number;
    }>
  >;
  timePeriod: { month: number; year: number };
  years: TYearHistory;
}) => {
  return (
    <Select
      value={timePeriod.year.toString()}
      onValueChange={(val) => {
        setTimePeriod((_) => ({
          month: timePeriod.month,
          year: parseInt(val),
        }));
      }}
    >
      <SelectTrigger className="min-w-[90px] w-full lg:w-[100px]">
        <SelectValue placeholder="year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const MonthHistory = ({
  setTimePeriod,
  timePeriod,
  years,
}: {
  setTimePeriod: Dispatch<
    SetStateAction<{
      month: number;
      year: number;
    }>
  >;
  timePeriod: { month: number; year: number };
  years: TYearHistory;
}) => {
  return (
    <Select
      value={timePeriod.month.toString()}
      onValueChange={(val) => {
        setTimePeriod((_) => ({
          month: parseInt(val),
          year: timePeriod.year,
        }));
      }}
    >
      <SelectTrigger className="min-w-[100px] w-full lg:w-[120px]">
        <SelectValue placeholder="year" />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const month = new Date(timePeriod.year, i, 1).toLocaleString(
            "default",
            { month: "long" }
          );
          return (
            <SelectItem key={i} value={i.toString()}>
              {month}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
