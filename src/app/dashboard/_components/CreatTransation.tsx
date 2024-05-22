"use client";
import { CategoryPicker } from "@/components/CategoryPicker";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { transactionSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { TTransaction, TType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewTransaction } from "../actions";
import { toast } from "sonner";

const CreatTransation = ({
  trigger,
  type,
}: {
  trigger: ReactNode;
  type: TType;
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type,
      date: new Date(Date.now()),
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
      reset();
      setOpen(false);

      // revalidate the data
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
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

  const createTransaction = useCallback(
    (data: TTransaction) => {
      toast.loading(
        `Creating ${data.type} transaction with amount ${data.amount}...`,
        {
          id: "add-transaction",
        }
      );
      addTrnasationMutation.mutate(data);
    },
    [addTrnasationMutation]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create new{" "}
            <span
              className={cn(
                type === "Income" ? "text-green-700" : "text-red-800",
                "font-extrabold"
              )}
            >
              {type}
            </span>{" "}
            transaction
          </DialogTitle>
          <DialogDescription>
            provide more information of the transaction
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit(createTransaction)}>
          <Input
            {...register("description")}
            placeholder="enter description..."
          />

          <Input {...register("amount")} placeholder="enter amount..." />
          {errors.amount && (
            <span className="text-red-700 text-xs">
              {errors.amount.message}
            </span>
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
                <p className="text-red-700 text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <DatePicker setValue={setValue} />
              {errors.date && (
                <p className="text-red-700 text-xs">{errors.date.message}</p>
              )}
            </div>
          </div>

          {type === "Expense" ? (
            <Button
              className="w-full bg-red-800"
              variant={"destructive"}
              onClick={handleSubmit(createTransaction)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          ) : (
            <Button
              className="w-full bg-green-800"
              variant={"secondary"}
              onClick={handleSubmit(createTransaction)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatTransation;
