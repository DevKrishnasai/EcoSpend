"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { TCategory, TType } from "@/utils/types";

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { BoxSelectIcon, PlusSquare } from "lucide-react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/lib/schema";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import { useMutation, QueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { NewCategory } from "@/app/dashboard/actions";

const CategoryCreator = ({
  type,
  refetch,
  parentOpen,
}: {
  type: TType;
  refetch: (a: string, b: string) => Promise<void>;
  parentOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const theme: UseThemeProps = useTheme();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const queryClient = new QueryClient();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type,
    },
  });

  const addCategoryMutation = useMutation({
    mutationKey: ["add-category", type],
    mutationFn: NewCategory,
    onSuccess: async (success, data) => {
      toast.success(
        `${type} category with ${data.icon} ${data.name}  created successfully `,
        {
          id: "add-category",
        }
      );

      //not working
      await queryClient.invalidateQueries({
        queryKey: ["fullCatagories"],
        fetchStatus: "fetching",
      });

      refetch(data.name, data.icon);
      reset();
      setDialog(false);
    },
    onError: (e) => {
      console.log(e);
      toast.error(
        `Failed to create ${type} category with ${getValues(
          "icon"
        )} ${getValues("name")}}`,
        {
          id: "add-transaction",
        }
      );
    },
  });

  const createCategory = useCallback(
    (data: TCategory) => {
      toast.loading(`creating ${data.icon} ${data.name} category...`, {
        id: "add-category",
      });
      addCategoryMutation.mutate(data);
    },
    [addCategoryMutation]
  );

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start roudned-none border-b px-3 py-3 text-muted-foreground"
          // onClick={() => parentOpen(false)}
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          Create new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              className={cn(
                "m-1",
                type === "Income" ? "text-green-800" : "text-red-800"
              )}
            >
              {type}
            </span>
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-5 " onClick={handleSubmit(createCategory)}>
          <Input {...register("name")} placeholder="enter category name..." />
          {errors.name && (
            <span className="text-red-700 text-xs">{errors.name.message}</span>
          )}

          <EmojiPicker
            theme={theme.theme === "dark" ? Theme.DARK : Theme.LIGHT}
            open={open}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onEmojiClick={(emoji) => {
              setValue("icon", emoji.emoji);
              setOpen(false);
            }}
          />
          <div
            className="h-[130px] w-full flex flex-col justify-center items-center border-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-300"
            onClick={() => setOpen((o) => !o)}
          >
            {getValues("icon") ? (
              <div className="text-5xl">{getValues("icon")}</div>
            ) : (
              <BoxSelectIcon />
            )}
            <p className="mt-1">
              {getValues("icon")
                ? "click here to change icon"
                : "click here to select a icon"}
            </p>
          </div>

          <Button
            className={cn(
              type === "Income" ? "bg-green-800" : "bg-red-800",
              "w-full "
            )}
            variant={"outline"}
            onClick={() => handleSubmit(createCategory)}
          >
            create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreator;
