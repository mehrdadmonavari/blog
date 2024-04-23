import React from "react";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import StatusBadge from "../StatusBadge";
import ImageBox from "@/components/ui/ImageBox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
   params: { id: string };
}

const PostCategoryDetailPage = async ({ params: { id } }: Props) => {
   const category = await prisma.postCategory.findUnique({
      where: { id: parseInt(id) },
   });

   if (!category) {
      return notFound();
   }

   return (
      <div className="flex-1 flex flex-col">
         <div className="py-4 sm:py-6">
            <Breadcrumb>
               <BreadcrumbList>
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                        <Link href="/dashboard">Dashboard</Link>
                     </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                        <Link href="/dashboard/post-categories">Categories</Link>
                     </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbPage>{category.name} Detail</BreadcrumbPage>
                  </BreadcrumbItem>
               </BreadcrumbList>
            </Breadcrumb>
         </div>

         <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-6 my-3 max-h-[calc(100vh-11.5rem)]">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-y-4 mb-6">
               <span className="text-xl sm:text-2xl text-slate-700 font-semibold">
                  Categoriers Report
               </span>
               <Link href={`/dashboard/post-categories/${category.id}/edit`}>
                  <Button className="w-full">Edit Categore</Button>
               </Link>
            </div>

            <ScrollArea className="">
               <div className="">
                  <div className="flex flex-col gap-y-1">
                     <div className="text-xl font-semibold text-slate-700">
                        {category.name}
                     </div>
                     <div className="flex items-center gap-x-2">
                        <span className="font-normal text-sm text-slate-500">
                           {category.createdAt.toLocaleDateString("en-us", {
                              weekday: "long",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                           })}
                        </span>
                        <StatusBadge status={category.status} />
                     </div>
                     <div className="mt-4 text-slate-700">{category.description}</div>
                     <div className="mt-4 flex justify-start items-start">
                        <ImageBox
                           width={{ xs: "full", xl: "900" }}
                           imageUrl={category.imageUrl}
                           alt={category.name}
                        />
                     </div>
                  </div>
               </div>
            </ScrollArea>
         </div>
      </div>
   );
};

export default PostCategoryDetailPage;
