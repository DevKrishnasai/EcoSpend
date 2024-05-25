"use client";
import { TCategoryStats } from "@/app/api/stats/categories/route";
import { cn } from "@/lib/utils";
import ProgressBar from "@ramonak/react-progress-bar";

const CategoryStats = ({
  type,
  data,
}: {
  type: string;
  data: TCategoryStats;
}) => {
  const filteredData = data.stats.filter((d) => d.type === type);
  const total = filteredData.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div
      className={cn(
        "flex-1 border flex flex-col items-center gap-2 p-2 rounded-md shadow-sm",
        filteredData.length === 0 && "justify-center items-center"
      )}
    >
      {filteredData.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold">No data found</p>
          <span className="text-xs">try selecting other dates</span>
        </div>
      )}
      {filteredData.map((d) => {
        const amount = d.amount || 0;
        const percentage = (amount / total || amount) * 100;
        return (
          <div key={d.category} className=" w-full">
            <div className="w-full flex justify-between px-2 mb-3">
              <span className="text-sm md:text-base font-semibold overflow-hidden">
                {d.categoryIcon} {d.category}
              </span>
              <span className="text-sm md:text-base font-bold overflow-hidden">
                {data.currency}
                {d.amount}
              </span>
            </div>
            {/* <Progress value={percentage} /> */}
            <ProgressBar
              completed={percentage}
              isLabelVisible={false}
              animateOnRender
              bgColor={type === "Income" ? "#116111" : "#b00b0b"}
              // className={cn("h-[8px] lg-h-[10px]")}
              transitionDuration="2s"
              height="10px"
              // className="hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-not-allowed"
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryStats;
