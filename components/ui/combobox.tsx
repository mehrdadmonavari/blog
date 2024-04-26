"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
   invalid: boolean;
   data: { id: number; value: string; label: string }[];
}

const Combobox = ({ invalid, data }: Props) => {
   const [open, setOpen] = React.useState(false);
   const [value, setValue] = React.useState("");

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="selectInput"
               role="combobox"
               aria-expanded={open}
               className={cn(
                  `flex-1 flex justify-between items-center w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm align-middle ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-slate-700 ${
                     invalid && "border-red-500"
                  } transition duration-300 focus-visible:border-indigo-500 focus-visible:shadow-sm placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-2.5`
               )}>
               {value
                  ? data.find((item) => item.value === value)?.label
                  : "Select framework..."}
               <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[200px] p-0">
            <Command>
               <CommandInput placeholder="Search framework..." />
               <CommandEmpty>No Category found.</CommandEmpty>
               <CommandGroup>
                  {data.map((item) => (
                     <CommandItem
                        key={item.id}
                        value={item.value}
                        onSelect={(currentValue) => {
                           setValue(currentValue === value ? "" : currentValue);
                           setOpen(false);
                        }}>
                        <Check
                           className={cn(
                              "mr-2 h-4 w-4",
                              value === item.value ? "opacity-100" : "opacity-0"
                           )}
                        />
                        {item.label}
                     </CommandItem>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   );
};

export default Combobox;
