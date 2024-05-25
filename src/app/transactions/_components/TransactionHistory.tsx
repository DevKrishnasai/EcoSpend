"use client";
import { TRangedTransactions } from "@/app/api/transactions-history/route";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import TransactionsTable from "./TransactionsTable";
import { TUser } from "@/utils/types";

const TransactionHistory = () => {
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(Date.now()),
  });
  const [random, setRandom] = useState(Math.random());

  const { isFetching, data: transactions } = useQuery<TRangedTransactions>({
    queryKey: ["transactions", date.from, date.to, random],
    queryFn: () =>
      fetch(`/api/transactions-history?from=${date.from}&to=${date.to}`).then(
        (res) => res.json()
      ),
  });

  const { data: user } = useQuery<TUser>({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user-details").then((res) => res.json()),
  });

  return (
    <div className="w-full ">
      <div className="flex justify-center lg:justify-end items-center ">
        {/* <h2 className="font-bold text-xl">Transactions </h2> */}
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
          full={false}
        />
      </div>
      <TransactionsTable
        transactions={transactions || []}
        isLoading={isFetching}
        currency={user?.currency || ""}
        setRandom={setRandom}
      />
    </div>
  );
};

export default TransactionHistory;
