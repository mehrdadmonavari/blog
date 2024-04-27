"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface Props {
   setDate: () => void;
   date: Date;
   invalid: boolean;
}

const DatePicker = ({ date, setDate, invalid }: Props) => {
   // const [date, setDate] = useState<Date>();

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="selectInput"
               className={cn(
                  // "w-[280px] justify-start text-left font-normal",
                  `text-slate-700 ${
                     invalid && "border-red-500"
                  } transition duration-300 focus-visible:border-indigo-500 focus-visible:shadow-sm placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-2.5`,
                  !date && "text-muted-foreground"
               )}>
               <CalendarIcon className="mr-2 h-4 w-4" />
               {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
         </PopoverContent>
      </Popover>
   );
};

export default DatePicker;
