"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TCategories, TCategory, TTransaction, TType } from "@/utils/types";
import { categoriesSchema, categorySchema } from "@/lib/schema";
import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import CustomSkeloton from "./CustomSkeloton";
import CategoryCreator from "./CategoryCreator";

export function CategoryPicker({
  type,
  setValue,
  getValues,
  setError,
  reset,
  clearErrors,
}: {
  type: TType;
  setValue: UseFormSetValue<TTransaction>;
  getValues: UseFormGetValues<TTransaction>;
  setError: UseFormSetError<TTransaction>;
  reset: UseFormReset<TTransaction>;
  clearErrors: UseFormClearErrors<TTransaction>;
}) {
  const [open, setOpen] = useState(false);

  const {
    isFetching,
    refetch,
    data: categories,
  } = useQuery<TCategories>({
    queryKey: ["full-catagories"],
    queryFn: async () => {
      const data = await fetch(`/api/categories?type=${type}`);
      const jsonData = await data.json();

      const safeData = categoriesSchema.safeParse(jsonData);
      if (!safeData.success) {
        throw new Error("Invalid data from api");
      }
      return jsonData;
    },
  });

  return (
    <CustomSkeloton isLoading={isFetching}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between w-full",
              isFetching && "cursor-not-allowed"
            )}
          >
            {getValues("category")
              ? getValues("categoryIcon") + " " + getValues("category")
              : "Select category..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command onSubmit={(e) => e.preventDefault()}>
            <CategoryCreator
              parentOpen={setOpen}
              type={type}
              parentSet={setValue}
              clearErrors={clearErrors}
              refetch={refetch}
            />
            <CommandInput placeholder="Search category..." />
            {/* <Button variant={"outline"}>+ add new</Button> */}

            <CommandList className="text-center">
              <CommandEmpty className="flex justify-center items-center flex-col h-[80px]">
                <div className="text-sm">No category found.</div>
                <div className="text-sm">create a new category</div>
              </CommandEmpty>

              <CommandGroup>
                {categories?.map((category) => (
                  <CommandItem
                    key={category.name}
                    value={category.name}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      if (currentValue) {
                        setError("category", {
                          message: "",
                        });
                        setValue("category", category.name);
                        setValue("categoryIcon", category.icon);
                      }
                    }}
                  >
                    {category.icon} {category.name}
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        getValues("category") === category.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </CustomSkeloton>
  );
}
