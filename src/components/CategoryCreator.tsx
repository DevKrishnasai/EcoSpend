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
import { TCategory, TTransaction, TType } from "@/utils/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { BoxSelectIcon, PlusSquare } from "lucide-react";
import { Input } from "./ui/input";
import { UseFormClearErrors, UseFormSetValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/lib/schema";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NewCategory } from "@/app/dashboard/actions";

const CategoryCreator = ({
  type,
  parentSet,
  parentOpen,
  clearErrors,
  refetch,
  trigger,
  setRandom,
}: {
  type: TType;
  parentSet?: UseFormSetValue<TTransaction>;
  parentOpen?: Dispatch<SetStateAction<boolean>>;
  clearErrors?: UseFormClearErrors<TTransaction>;
  trigger?: React.ReactNode;
  refetch?: () => void;
  setRandom?: Dispatch<SetStateAction<number>>;
}) => {
  const theme: UseThemeProps = useTheme();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const {
    register,
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
        `${type} category with ${data.icon} ${data.name} created successfully`,
        { id: "add-category" }
      );

      if (refetch && parentSet && parentOpen && clearErrors) {
        refetch();
        parentSet("category", data.name);
        parentSet("categoryIcon", data.icon);

        clearErrors();
        parentOpen(false);
      } else {
        if (setRandom) setRandom(Math.random());
      }
      setDialog(false);
    },
    onError: (e) => {
      console.error(e);
      toast.error(
        `Failed to create ${type} category with ${getValues(
          "icon"
        )} ${getValues("name")}`,
        { id: "add-category" }
      );
    },
  });

  const createCategory = (data: TCategory) => {
    toast.loading(`Creating ${data.icon} ${data.name} category...`, {
      id: "add-category",
    });
    addCategoryMutation.mutate(data);
  };

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            className="flex items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
          >
            <PlusSquare className="mr-2 h-4 w-4" />
            Create new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="m-2">
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
        <form className="space-y-5" onSubmit={handleSubmit(createCategory)}>
          <Input {...register("name")} placeholder="Enter category name..." />
          {errors.name && (
            <span className="text-red-700 text-xs">{errors.name.message}</span>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                className="flex h-[130px] w-full cursor-pointer flex-col items-center justify-center border-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-300"
                onClick={() => setOpen(!open)}
              >
                {getValues("icon") ? (
                  <div className="text-5xl">{getValues("icon")}</div>
                ) : (
                  <BoxSelectIcon />
                )}
                <p className="mt-1">
                  {getValues("icon")
                    ? "Click here to change icon"
                    : "Click here to select an icon"}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="absolute -top-80 -left-48 bg-transparent border-0">
              <Picker
                onEmojiSelect={(emoji: { native: string }) => {
                  setValue("icon", emoji.native);
                  setOpen(false);
                }}
                data={data}
                theme={theme.theme === "dark" ? "dark" : "light"}
                autofocus={true}
              />
            </PopoverContent>
          </Popover>

          {errors.icon && (
            <span className="text-red-700 text-xs">{errors.icon.message}</span>
          )}

          <Button
            className={cn(
              type === "Income" ? "bg-green-800" : "bg-red-800",
              "w-full",
              isSubmitting && "cursor-not-allowed"
            )}
            variant="outline"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreator;
