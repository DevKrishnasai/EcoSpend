import { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const CustomSkeloton = ({
  children,
  isLoading,
  full = true,
  opacity = 5,
}: {
  children: ReactNode;
  isLoading: boolean;
  full?: boolean;
  opacity?: number;
}) => {
  if (!isLoading) {
    return children;
  }
  return (
    <Skeleton className={cn(full ? "w-full" : "")}>
      <div className={`opacity-${opacity}`}>{children}</div>
    </Skeleton>
  );
};

export default CustomSkeloton;
