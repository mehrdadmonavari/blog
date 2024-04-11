import Image from "next/image";
import favicon from "@/public/favicon.ico";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import SideBarLinkList from "./SideBarLinkList";
import { forwardRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
   type: string;
   onResize: () => void;
}

const SideBar = forwardRef<HTMLElement, Props>(function sidebar({ onResize, type }, ref) {
   return (
      <aside
         ref={ref}
         className={`h-screen flex flex-col w-[17rem] transition-all duration-300`}>
         {/* SideBar header */}
         <section className="flex justify-start items-center gap-x-2 min-h-[5.25rem] px-6 relative">
            <span className="">
               <Image src={favicon} alt="logo" className="w-9" />
            </span>
            <span className="min-w-14 text-slate-500 text-2xl font-bold">Admin</span>
            {type === "resizable" ? (
               <Button
                  onClick={onResize}
                  className="hidden lg:block absolute right-0 p-2 w-fit h-fit rounded-l-full bg-[#f5f5f9] transition-all duration-300"
                  variant={"none"}>
                  <ChevronLeft className="bg-indigo-500 text-white rounded-full w-fit h-fit p-0.5" />
               </Button>
            ) : (
               <SheetClose className="absolute right-0 p-2 w-fit h-fit rounded-l-full bg-[#f5f5f9] transition-all duration-300">
                  <ChevronLeft className="bg-indigo-500 text-white rounded-full w-fit h-fit p-0.5" />
               </SheetClose>
            )}
         </section>
         {/* SideBar link list */}
         <ScrollArea>
            <SideBarLinkList />
         </ScrollArea>
      </aside>
   );
});

export default SideBar;
