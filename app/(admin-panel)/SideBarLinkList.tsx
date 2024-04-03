import { Button } from "@/components/ui/button";
import {
   Cable,
   CreditCard,
   Fingerprint,
   Gauge,
   Home,
   LayoutGrid,
   UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import SideBarAccordion from "./SideBarAccordion";

const sidebarLinks = [
   {
      id: 1,
      title: "",
      items: [
         {
            collapsible: false,
            label: "Dashboard",
            href: "/dashboard",
            icon: <Gauge className="w-5" />,
         },
      ],
   },
   {
      id: 2,
      title: "blog",
      items: [
         {
            collapsible: true,
            header: "Categories",
            subItems: [
               { label: "Reports", href: "/dashboard/post-categories" },
               { label: "New Category", href: "/dashboard/post-categories/new" },
            ],
            icon: <LayoutGrid className="w-5" />,
         },
      ],
   },
   {
      id: 3,
      title: "pages",
      items: [
         {
            collapsible: true,
            header: "Account Setting",
            subItems: [
               { label: "Account", href: "/account" },
               { label: "Notification", href: "/notification" },
               { label: "Connection", href: "/connection" },
            ],
            icon: <UserRoundCog className="w-5" />,
         },
         {
            collapsible: true,
            header: "Authentication",
            subItems: [
               { label: "Login", href: "/login" },
               { label: "Register", href: "/register" },
               { label: "Forgot Password", href: "/forgot-password" },
            ],
            icon: <Fingerprint className="w-5" />,
         },
      ],
   },
   {
      id: 4,
      title: "components",
      items: [
         {
            collapsible: false,
            label: "Cards",
            href: "/cards",
            icon: <CreditCard className="w-5" />,
         },
         {
            collapsible: true,
            header: "User Interface",
            subItems: [
               { label: "Accordion", href: "/accordion" },
               { label: "Alerts", href: "/alerts" },
               { label: "Badges", href: "/badges" },
            ],
            icon: <Cable className="w-5" />,
         },
      ],
   },
];

const SideBarLinkList = () => {
   const pathName = usePathname();

   const renderGroupTitle = (title: string): ReactNode => {
      if (title !== "") {
         return (
            <div className="text-sm font-medium text-slate-400 px-4 pt-6 pb-6 relative before:absolute before:-left-4 before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-400">
               {title.toUpperCase()}
            </div>
         );
      }
   };

   return (
      <section className="flex-1 flex flex-col p-4">
         {sidebarLinks.map((group) => {
            return (
               <div key={group.id} className="flex flex-col gap-y-1">
                  {renderGroupTitle(group.title)}
                  {group.items.map((item) => {
                     return item.collapsible ? (
                        <SideBarAccordion
                           key={item.header}
                           header={item.header!}
                           icon={item.icon}
                           subItems={item.subItems!}
                           currentPath={pathName}
                        />
                     ) : (
                        <Link key={item.href} href={item.href!}>
                           <Button
                              variant={`${
                                 pathName === item.href
                                    ? "activeSidebarLink"
                                    : "sidebarLink"
                              }`}
                              className="min-w-52">
                              <span className="">{item.icon}</span>
                              <span className="font-medium align-bottom">
                                 {item.label}
                              </span>
                           </Button>
                        </Link>
                     );
                  })}
               </div>
            );
         })}
      </section>
   );
};

export default SideBarLinkList;
