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
         <div className="flex-1 bg-white rounded-lg shadow-lg p-6 my-3">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-y-4 mb-6">
               <span className="text-xl sm:text-2xl text-slate-700 font-semibold">
                  Categoriers Reports
               </span>
               <Link href={`/dashboard/post-categories/${category.id}/edit`}>
                  <Button className="w-full">Update categore</Button>
               </Link>
            </div>
            <div className="flex flex-col gap-y-1">
               <div className="text-xl font-semibold text-slate-700">{category.name}</div>
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
               <div className="mt-4">{category.description}</div>
            </div>
         </div>
      </div>
   );
};

export default PostCategoryDetailPage;
