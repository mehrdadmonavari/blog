import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface subItem {
   label: string;
   href: string;
}

interface SideBarAccordionProps {
   header: string;
   icon: ReactNode;
   subItems: subItem[];
   currentPath: string;
}

const SideBarAccordion = ({
   header,
   icon,
   subItems,
   currentPath,
}: SideBarAccordionProps) => {
   let isActive: boolean = false;

   subItems.map((item) => {
      if (item.href === currentPath) isActive = true;
   });

   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="item-1">
            <AccordionTrigger
               className={`min-w-52 w-full flex justify-between items-center pl-4 pr-2 py-2.5 text-sm ${
                  isActive
                     ? "data-[state=open]:bg-indigo-100 data-[state=open]:text-indigo-500 data-[state=closed]:bg-indigo-100 data-[state=closed]:text-indigo-500 relative before:absolute before:w-2 before:h-full before:-right-5 before:bg-indigo-500 before:rounded-full"
                     : "data-[state=open]:bg-slate-100 data-[state=open]:text-slate-700 data-[state=closed]:text-slate-500 data-[state=closed]:hover:bg-slate-100 data-[state=closed]:hover:text-slate-700"
               } rounded-lg font-medium transition-all duration-300 [&[data-state=open]>span>svg]:rotate-90`}>
               <span className="flex justify-start items-center gap-x-2">
                  <span className="">{icon}</span>
                  <span className="font-medium align-bottom">{header}</span>
               </span>
               <span>
                  <ChevronRight className="w-4 transition-transform" />
               </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-y-1 py-1">
               {subItems.map((subitem) => (
                  <Link key={subitem.href} href={subitem.href}>
                     <Button
                        variant={`${
                           subitem.href === currentPath
                              ? "activeSidebarSubLink"
                              : "sidebarSubLink"
                        }`}
                        className="min-w-52">
                        <span>
                           <Dot
                              className={`${
                                 subitem.href === currentPath
                                    ? "scale-[200%] text-indigo-500"
                                    : "scale-[140%] text-slate-400"
                              } w-5`}
                           />
                        </span>
                        <span>{subitem.label}</span>
                     </Button>
                  </Link>
               ))}
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   );
};

export default SideBarAccordion;
