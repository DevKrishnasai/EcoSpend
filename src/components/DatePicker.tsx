"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TTransaction } from "@/utils/types";
import { UseFormSetValue } from "react-hook-form";
import { useState } from "react";

export function DatePicker({
  setValue,
}: {
  setValue: UseFormSetValue<TTransaction>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            console.log(d);
            setOpen((p) => !p);
            if (d) setDate(d);
            if (d) setValue("date", d);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
