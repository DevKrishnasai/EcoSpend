import React, { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const CustomSkeloton = ({
  children,
  isLoading,
  full = true,
}: {
  children: ReactNode;
  isLoading: boolean;
  full?: boolean;
}) => {
  if (!isLoading) {
    return children;
  }
  return (
    <Skeleton className={cn(full ? "w-full" : "")}>
      <div className="opacity-10">{children}</div>
    </Skeleton>
  );
};

export default CustomSkeloton;
