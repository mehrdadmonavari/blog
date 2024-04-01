"use client";

import React, { PropsWithChildren, useRef, useState } from "react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import SideBar from "./SideBar";
import Header from "./Header";

const AdminPanelLayout = ({ children }: PropsWithChildren) => {
   const [isOpen, setIsOpen] = useState(true);
   const sidebarRef = useRef<HTMLElement | null>(null);

   const onResize = (): void => {
      isOpen
         ? sidebarRef.current?.classList.replace("w-[17rem]", "!w-[0]")
         : sidebarRef.current?.classList.replace("!w-[0]", "w-[17rem]");

      setIsOpen((prevState) => !prevState);
   };

   return (
      <main>
         <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="hidden lg:block max-w-fit transition-all duration-300">
               <SideBar ref={sidebarRef} type="resizable" onResize={onResize} />
            </ResizablePanel>
            <ResizablePanel className="transition-all duration-300">
               <section className="min-h-screen flex flex-col px-6 bg-[#f5f5f9]">
                  <Header isOpen={isOpen} onResize={onResize} />
                  <section id="content" className="flex-1 flex">
                     {children}
                  </section>
               </section>
            </ResizablePanel>
         </ResizablePanelGroup>
      </main>
   );
};

export default AdminPanelLayout;
