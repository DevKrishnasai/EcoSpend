"use client";
import React, { useEffect } from "react";
import CustomCard from "./CustomCard";
import { DateRange } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { TStats } from "@/app/api/stats/balance/route";
import { TrendingDown, TrendingUp, Wallet, Wallet2 } from "lucide-react";
import { cn } from "@/lib/utils";

const OverviewSection = ({
  date,
  random,
}: {
  date: DateRange;
  random: number;
}) => {
  const { data, isFetching, refetch } = useQuery<TStats>({
    queryKey: ["cards-stats", date.from, date.to, random, random],
    queryFn: () =>
      fetch(`/api/stats/balance?from=${date.from}&to=${date.to}`).then((res) =>
        res.json()
      ),
  });

  const income = data?.income || 0;
  const expense = data?.expense || 0;
  const balance = income - expense;

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
        <CustomCard
          title="Income"
          value={income}
          currency={data?.currency}
          icon={
            <TrendingUp
              size={30}
              className={cn(isFetching && "animate-bounce")}
            />
          }
        />
        <CustomCard
          title="Expense"
          value={expense}
          currency={data?.currency}
          icon={
            <TrendingDown
              size={30}
              className={cn(isFetching && "animate-bounce")}
            />
          }
        />
        <CustomCard
          title="Balance"
          value={balance}
          currency={data?.currency}
          icon={
            <Wallet size={30} className={cn(isFetching && "animate-pulse")} />
          }
        />
      </div>
    </>
  );
};

export default OverviewSection;
