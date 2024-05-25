import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { CountUp } from "use-count-up";

const CustomCard = ({
  title,
  value,
  currency,
  icon,
}: {
  title: string;
  value: number;
  currency?: string;
  icon: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-1/2 flex-1 min-w-[150px] md:flex-none md:w-[200px] h-[90px] flex gap-3 text-black dark:text-white justify-center items-center shadow-black shadow-sm border-2 hover:shadow-none dark:shadow-white rounded-lg font-bold"
      )}
    >
      {icon}

      <div className="flex flex-col">
        <p className="text-xs">{title}</p>
        <div className="text-2xl">
          <span>{currency}</span>{" "}
          <CountUp isCounting end={value} duration={3} easing={"easeInCubic"} />
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
