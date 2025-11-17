import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface CountryOption {
  code: string;
  dial_code: string;
  name: string;
}

interface ComboboxSelectProps {
  options: CountryOption[];
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  isError: boolean;
  placeholder?: string;
}

export function ComboboxSelect({
  options,
  value,
  onValueChange,
  onBlur,
  isError,
  placeholder = "Pilih kode negara...",
}: ComboboxSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedCountry = options.find(
    (country) => country.dial_code === value
  );

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    onValueChange(newValue);
    setOpen(false);
    onBlur();
  };

  // Menangani blur (karena Popover tidak memiliki native onBlur)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onBlur();
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left",
            isError &&
              "border-destructive ring-destructive focus-visible:ring-destructive"
          )}
        >
          {selectedCountry
            ? `${selectedCountry.dial_code} — ${selectedCountry.name}`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Cari kode atau nama negara..." />
          <CommandEmpty>Tidak ada negara ditemukan.</CommandEmpty>
          <CommandGroup className="max-h-80 overflow-y-scroll">
            {options.map((country) => (
              <CommandItem
                key={country.code}
                value={`${country.dial_code} ${country.name}`}
                onSelect={() => handleSelect(country.dial_code)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.dial_code ? "opacity-100" : "opacity-0"
                  )}
                />
                {country.dial_code} — {country.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
