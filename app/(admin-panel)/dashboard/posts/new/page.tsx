import React from "react";
import Link from "next/link";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NewPostForm from "./NewPostForm";
import prisma from "@/prisma/client";

const NewPostCategoryPage = async () => {
   const categories: Category[] = await prisma.postCategory.findMany();

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
                        <Link href="/dashboard/posts">Posts</Link>
                     </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbPage>New Post</BreadcrumbPage>
                  </BreadcrumbItem>
               </BreadcrumbList>
            </Breadcrumb>
         </div>
         <div className="flex-1 bg-white rounded-lg shadow-lg p-6 my-3">
            <div className="text-2xl text-slate-700 font-semibold">
               New post registration
            </div>
            <NewPostForm categories={categories} />
         </div>
      </div>
   );
};

export default NewPostCategoryPage;
