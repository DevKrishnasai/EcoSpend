import React, { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

const CustomSkeloton = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) => {
  if (!isLoading) {
    return children;
  }
  return (

    <Skeleton className="w-full">

      <div className="opacity-10">{children}</div>
    </Skeleton>
  );
};

export default CustomSkeloton;
