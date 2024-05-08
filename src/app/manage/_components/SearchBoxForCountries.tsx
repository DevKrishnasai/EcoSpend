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
  register,
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
    <section className="flex justify-start items-center gap-5 md:gap-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] md:w-[400px] justify-between"
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
        <div className="text-sm text-wrap">
          <span className="md:inline hidden">Your Currency is</span>
          <span className="md:hidden inline">Currency </span>
          <span className="font-bold ml-2">
            {currencies.find((c) => c.country === country)?.symbol}
          </span>
        </div>
      )}
    </section>
  );
};

export default SearchBoxForCountries;
