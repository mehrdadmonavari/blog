import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";

const PostCategoriesPage = async () => {
   const postCategories = await prisma.postCategory.findMany();

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
                     <BreadcrumbPage>Categories</BreadcrumbPage>
                  </BreadcrumbItem>
               </BreadcrumbList>
            </Breadcrumb>
         </div>
         <div className="flex-1 bg-white rounded-lg shadow-lg p-6 my-3">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-y-4 mb-6">
               <span className="text-xl sm:text-2xl text-slate-700 font-semibold">
                  Categoriers Reports
               </span>
               <Link href="/dashboard/post-categories/new">
                  <Button className="w-full">New categore</Button>
               </Link>
            </div>
            <DataTable columns={columns} data={postCategories} />
         </div>
      </div>
   );
};

export const dynamic = "force-dynamic";

export default PostCategoriesPage;
