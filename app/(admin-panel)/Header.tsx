import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, Search } from "lucide-react";
import React, { useRef } from "react";
import SideBar from "./SideBar";

interface Props {
   isOpen: boolean;
   onResize: () => void;
}

const Header = ({ isOpen, onResize }: Props) => {
   const sheetRef = useRef<HTMLButtonElement | null>(null);

   return (
      <header className="h-16 flex justify-between items-center px-4 my-3 bg-white rounded-lg shadow-lg !overflow-hidden">
         <div
            className={`flex justify-start items-center transition-all duration-300 ${
               isOpen && "lg:-translate-x-12"
            }`}>
            <Button
               onClick={onResize}
               className="hidden lg:block w-fit h-fit p-1 mx-1"
               variant="none">
               <AlignJustify className="text-slate-500" />
            </Button>
            <Sheet>
               <SheetTrigger ref={sheetRef} className="lg:hidden">
                  <AlignJustify className="text-slate-500" />
               </SheetTrigger>
               <SheetContent className="lg:hidden p-0 w-[18rem] overflow-x-hidden">
                  <SideBar type="sheet" onResize={onResize} />
               </SheetContent>
            </Sheet>
            <Button className="w-fit h-fit p-1 mx-1" variant="none">
               <Search className="text-slate-500" />
            </Button>
            <Input
               className="border-none text-slate-700 placeholder:text-base placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-4"
               placeholder="Search..."
            />
         </div>
         <div>right</div>
      </header>
   );
};

export default Header;
