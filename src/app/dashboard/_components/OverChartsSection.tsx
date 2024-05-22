"use client";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import HistroySelector from "./HistroySelector";
import { THistory } from "@/app/api/historys/data/route";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CountUp } from "use-count-up";
import { cn } from "@/lib/utils";

const OverChartsSection = ({
  random,
  setRandom,
  currency,
}: {
  random: number;
  setRandom: Dispatch<SetStateAction<number>>;
  currency: string;
}) => {
  const [period, setPeriod] = useState<"year" | "month">("month");
  const [timePeriod, setTimePeriod] = useState<{
    month: number;
    year: number;
  }>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { data } = useQuery<THistory>({
    queryKey: ["history", timePeriod, period, random],
    queryFn: () =>
      fetch(
        `/api/historys/data?period=${period}&year=${timePeriod.year}&month=${timePeriod.month}`
      ).then((res) => res.json()),
  });

  return (
    <>
      <HistroySelector
        period={period}
        setPeriod={setPeriod}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        random={random}
      />
      <div
        className={cn(
          " h-[300px] rounded-md shadow-md flex justify-center items-center ",
          data && data.length === 0 && "border"
        )}
      >
        {data && data.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-base">No data found</p>
            <span className="text-sm">try selecting other {period}</span>
          </div>
        )}
        {data && data.length > 0 && (
          <Chart data={data || []} period={period} currency={currency} />
        )}
      </div>
    </>
  );
};

export default OverChartsSection;

const Chart = ({
  data,
  period,
  currency,
}: {
  data: THistory;
  period: string;
  currency: string;
}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart height={300} data={data} barCategoryGap={10} barSize={30}>
        <defs>
          <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset={"0"} stopColor="#10b981" stopOpacity={"1"} />
            <stop offset={"1"} stopColor="#10b981" stopOpacity={"0"} />
          </linearGradient>

          <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset={"0"} stopColor="#ef4444" stopOpacity={"1"} />
            <stop offset={"1"} stopColor="#ef4444" stopOpacity={"0"} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="5 5"
          strokeOpacity={"0.2"}
          vertical={false}
        />
        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dataKey={(data) => {
            const { year, month, day } = data;
            const date = new Date(year, month, day || 1);
            if (period === "year") {
              return date.toLocaleDateString("default", {
                month: "short",
              });
            }
            return date.toLocaleDateString("default", {
              day: "2-digit",
            });
          }}
        />
        <YAxis
          width={30}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey={"income"}
          label="Income"
          fill="url(#incomeBar)"
          radius={4}
          className="cursor-pointer"
          animationEasing="ease-in-out"
        />
        <Bar
          dataKey={"expense"}
          label="Expense"
          fill="url(#expenseBar)"
          radius={4}
          className="cursor-pointer"
          animationEasing="ease-in-out"
        />
        <Tooltip
          cursor={{ opacity: 0.1 }}
          content={(props) => <CustomTooltip currency={currency} {...props} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

function CustomTooltip({ active, payload, currency }: any) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const { expense, income } = data;

  return (
    <div className="w-[170px] max-w-[300px] rounded-3xl border bg-background p-4">
      <TooltipRow
        label="Expense"
        value={expense}
        bgColor="bg-red-500"
        textColor="text-red-500"
        currency={currency}
      />
      <TooltipRow
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
        currency={currency}
      />
      <TooltipRow
        label="Balance"
        value={income - expense}
        bgColor="bg-gray-100"
        textColor="text-foreground"
        currency={currency}
      />
    </div>
  );
}

function TooltipRow({
  label,
  value,
  bgColor,
  textColor,
  currency,
}: {
  label: string;
  textColor: string;
  bgColor: string;
  value: number;
  currency: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-4 w-4 rounded-full", bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          <span>{currency}</span>
          <CountUp duration={3} easing={"easeInCubic"} end={value} isCounting />
        </div>
      </div>
    </div>
  );
}
