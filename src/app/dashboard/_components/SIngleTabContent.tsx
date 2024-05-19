"use client";
import { CategoryPicker } from "@/components/CategoryPicker";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { transactionSchema } from "@/lib/schema";
import { TTransaction, TType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { NewTransaction } from "../actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SIngleTabContent = ({
  type,
  setTab,
  random,
  setRandom,
}: {
  type: TType;
  setTab: Dispatch<SetStateAction<boolean>>;
  random: number;
  setRandom: Dispatch<SetStateAction<number>>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    formState: { isSubmitting, errors },
    clearErrors,
  } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type,
    },
  });

  const addTrnasationMutation = useMutation({
    mutationKey: ["add-transaction"],
    mutationFn: NewTransaction,
    onSuccess: (success, data) => {
      toast.success(
        `${type} transaction with amount ${data.amount} added successfully `,
        {
          id: "add-transaction",
        }
      );

      setRandom(Math.random());
      reset();
      setTab(false);
    },
    onError: (e) => {
      console.log(e);
      toast.error(
        `Failed to add ${type} transaction with amount ${getValues("amount")}`,
        {
          id: "add-transaction",
        }
      );
    },
  });

  const createTransaction = (data: TTransaction) => {
    toast.loading(
      `Creating ${data.type} transaction with amount ${data.amount}...`,
      {
        id: "add-transaction",
      }
    );
    addTrnasationMutation.mutate(data);
  };

  return (
    <>
      <p className="mb-2 text-center">
        Create new{" "}
        <span
          className={cn(
            type === "Income" ? "text-green-700" : "text-red-800",
            "font-extrabold animate-pulse"
          )}
        >
          {type}
        </span>{" "}
        transaction
      </p>
      <form className="space-y-6" onSubmit={handleSubmit(createTransaction)}>
        <Input
          {...register("description")}
          placeholder="enter description..."
        />

        <Input {...register("amount")} placeholder="enter amount..." />
        {errors.amount && (
          <span className="text-red-700 text-xs">{errors.amount.message}</span>
        )}

        <div className="flex justify-center items-center gap-3">
          <div className="flex flex-col flex-1">
            <CategoryPicker
              type={type}
              setValue={setValue}
              getValues={getValues}
              setError={setError}
              reset={reset}
              clearErrors={clearErrors}
            />
            {errors.category && (
              <p className="text-red-700 text-xs">{errors.category.message}</p>
            )}
          </div>

          <div className="flex flex-col flex-1">
            <DatePicker setValue={setValue} />
            {errors.date && (
              <p className="text-red-700 text-xs">{errors.date.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 ">
          {type === "Expense" ? (
            <Button
              className="w-full bg-red-800 hover:bg-red-700 text-white"
              onClick={handleSubmit(createTransaction)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          ) : (
            <Button
              className="w-full bg-green-800 hover:bg-green-700 text-white"
              onClick={handleSubmit(createTransaction)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          )}
          {
            <Button
              className="w-full "
              variant={"outline"}
              onClick={() => setTab(false)}
            >
              Cancel
            </Button>
          }
        </div>
      </form>
    </>
  );
};

export default SIngleTabContent;
