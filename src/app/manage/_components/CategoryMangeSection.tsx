"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TCategories } from "@/utils/types";
import CustomSkeloton from "@/components/CustomSkeloton";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryCreator from "@/components/CategoryCreator";
import { deleteCategory } from "../actions";
import { toast } from "sonner";

const CategoryMangeSection = () => {
  const [random, setRandom] = useState(Math.random());

  const { isFetching, data: categories } = useQuery<TCategories>({
    queryKey: ["full-catagories", random],
    queryFn: () => fetch(`/api/categories`).then((res) => res.json()),
  });
  let incomeCategories: TCategories = [];
  let expenseCategories: TCategories = [];
  if (categories) {
    incomeCategories = categories?.filter(
      (category) => category.type === "Income"
    );
    expenseCategories = categories?.filter(
      (category) => category.type === "Expense"
    );
  }

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (status, data) => {
      setRandom(Math.random());
      toast.success(
        `${data.type} category with ${data.icon} ${data.name} deleted successfully`,
        { id: "delete-category" }
      );
    },
    onError: (e) => {
      console.error(e);
      toast.error(`Failed to delete category`, { id: "delete-category" });
    },
  });

  const deleteCategoryHandler = ({
    category,
  }: {
    category: {
      name: string;
      type: "Income" | "Expense";
      icon: string;
    };
  }) => {
    toast.loading(`Deleting ${category.icon} ${category.name} category...`, {
      id: "delete-category",
    });
    mutate(category);
  };
  return (
    <CustomSkeloton isLoading={isFetching} full>
      <Card className="">
        <CardHeader>
          <CardTitle>Add/Remove Categories</CardTitle>
          <CardDescription>
            Simple way to add and remove categories to your trasactions
            <p className="text-xs">
              Note: This will not affect your previous transactions
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-col justify-center ">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-lg">Income Categories</h1>

            <CategoryCreator
              type="Income"
              trigger={
                <Button variant={"outline"} className="bg-green-800">
                  Add Income Category
                </Button>
              }
              setRandom={setRandom}
            />
          </div>
          {incomeCategories?.length === 0 && (
            <div className="h-[120px] w-full shadow-sm border rounded-lg flex flex-col justify-center items-center">
              <p>No Income Categories</p>
            </div>
          )}
          <section className="grid grid-cols-2 lg:grid-cols-5   gap-2">
            {incomeCategories?.map((category) =>
              categorySection({ category, deleteCategoryHandler })
            )}
          </section>
          <div className="flex justify-between items-center mb-2 mt-3">
            <h1 className="font-bold text-lg">Expense Categories</h1>
            <CategoryCreator
              type="Expense"
              trigger={
                <Button variant={"outline"} className="bg-red-800 ">
                  Add Income Category
                </Button>
              }
              setRandom={setRandom}
            />
          </div>
          {expenseCategories?.length === 0 && (
            <div className="h-[120px] w-full shadow-sm border rounded-lg flex flex-col justify-center items-center">
              <p>No Expense Categories</p>
            </div>
          )}
          <section className="grid grid-cols-2 lg:grid-cols-5 gap-2 ">
            {expenseCategories?.map((category) =>
              categorySection({ category, deleteCategoryHandler })
            )}
          </section>
        </CardContent>
      </Card>
    </CustomSkeloton>
  );
};

export default CategoryMangeSection;

const categorySection = ({
  category,
  deleteCategoryHandler,
}: {
  category: {
    name: string;
    type: "Income" | "Expense";
    icon: string;
  };
  deleteCategoryHandler: ({
    category,
  }: {
    category: {
      name: string;
      type: "Income" | "Expense";
      icon: string;
    };
  }) => void;
}) => {
  return (
    <div
      key={category.icon + category.name}
      className=" h-[120px]  shadow-sm border rounded-lg flex flex-col"
    >
      <div className="flex flex-col justify-center items-center h-full gap-1 overflow-hidden">
        <p>{category.icon}</p>
        <p className="text-wrap">{category.name}</p>
      </div>
      <Button
        variant={"destructive"}
        className="w-full justify-items-end border-r-0 bg-transparent border mt-auto"
        onClick={() => deleteCategoryHandler({ category })}
      >
        <Trash className={cn("w-full text-black/50 dark:text-white/80")} />
      </Button>
    </div>
  );
};
