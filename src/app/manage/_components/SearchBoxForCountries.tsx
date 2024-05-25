import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { currencies } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TUser } from "@/utils/types";

const SearchBoxForCountries = ({
  setValue,
  value,
}: {
  register: UseFormRegister<TUser>;
  setValue: UseFormSetValue<TUser>;
  value: string;
}) => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(value);
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full lg:w-[400px] justify-between lg:flex-1"
          >
            {country
              ? currencies.find((currency) => currency.country === country)
                  ?.country
              : "Select country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] md:w-[400px] p-0">
          <Command>
            <CommandInput
              placeholder="Type a country name or search..."
              accept="text/plain"
            />
            <CommandList className="text-center">
              <CommandEmpty>No countries found.</CommandEmpty>

              <ScrollArea className="h-72 w-100 rounded-md border">
                <CommandGroup>
                  {currencies.map((currency) => (
                    <CommandItem
                      value={currency.country.toLowerCase()}
                      key={currency.symbol}
                      onSelect={() => {
                        setCountry(currency.country);
                        setValue("country", currency.country);
                        setValue("currency", currency.symbol);
                        setOpen(false);
                      }}
                    >
                      {currency.symbol} {currency.country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {country && (
        <div className="text-sm text-wrap lg:flex-1 text-center mt-4 lg:mt-0">
          <span className="">Your Currency is</span>
          <span className="font-bold ml-2">
            {currencies.find((c) => c.country === country)?.symbol}
          </span>
        </div>
      )}
    </section>
  );
};

export default SearchBoxForCountries;
