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
}: {
  type: TType;
  setValue: UseFormSetValue<TTransaction>;
  getValues: UseFormGetValues<TTransaction>;
  setError: UseFormSetError<TTransaction>;
  reset: UseFormReset<TTransaction>;
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<TCategories>([]);

  const { isFetching, refetch } = useQuery<TCategories>({
    queryKey: ["fullCatagories"],
    queryFn: async () => {
      const data = await fetch(`/api/categories?type=${type}`);
      const jsonData = await data.json();

      const safeData = categoriesSchema.safeParse(jsonData);
      if (!safeData.success) {
        throw new Error("Invalid data from api");
      }
      setCategories(safeData.data);
      return jsonData;
    },
  });

  const forceRefetch = async (name: string, icon: string) => {
    await refetch();
    setValue("category", name);
    setValue("categoryIcon", icon);
    setOpen(false);
  };

  return (
    // <CustomSkeloton isLoading={isFetching}>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {getValues("category")
            ? getValues("categoryIcon") + " " + getValues("category")
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          {/* <Button variant={"outline"}>+ add new</Button> */}

          <CategoryCreator
            parentOpen={setOpen}
            type={type}
            refetch={forceRefetch}
          />
          <CommandList className="text-center">
            <CommandEmpty className="flex justify-center items-center flex-col h-[80px]">
              <div className="text-sm">No category found.</div>
              <div className="text-sm">create a new category</div>
            </CommandEmpty>

            <CommandGroup>
              {categories.map((category) => (
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
    // </CustomSkeloton>
  );
}
