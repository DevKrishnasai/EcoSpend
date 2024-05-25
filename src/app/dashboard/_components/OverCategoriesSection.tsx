"use client";

import { TCategoryStats } from "@/app/api/stats/categories/route";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import CategoryStats from "./CategoryStats";
import CustomSkeloton from "@/components/CustomSkeloton";

const OverCategoriesSection = ({
  date,
  random,
}: {
  date: DateRange;
  random: number;
}) => {
  const { data: rawData, isFetching } = useQuery<TCategoryStats>({
    queryKey: ["category-stats", date.from, date.to, random, random],
    queryFn: () =>
      fetch(`/api/stats/categories?from=${date.from}&to=${date.to}`).then(
        (res) => res.json()
      ),
  });

  const data = rawData || { stats: [] };

  return (
    <div className="w-full flex gap-2 min-h-[200px] mb-5">
      <CategoryStats type="Income" data={data || { stats: [] }} />
      <CategoryStats type="Expense" data={data || { stats: [] }} />
    </div>
  );
};

export default OverCategoriesSection;
