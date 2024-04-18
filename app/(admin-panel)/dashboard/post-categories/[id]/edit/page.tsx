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
import EditPostCategoryForm from "./EditPostCateegoryForm";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

interface Props {
   params: { id: string };
}

const EditPostCategoryPage = async ({ params: { id } }: Props) => {
   const category = await prisma.postCategory.findUnique({ where: { id: parseInt(id) } });

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
                     <BreadcrumbPage>Edit Category</BreadcrumbPage>
                  </BreadcrumbItem>
               </BreadcrumbList>
            </Breadcrumb>
         </div>
         <div className="flex-1 bg-white rounded-lg shadow-lg p-6 my-3">
            <div className="text-2xl text-slate-700 font-semibold">Edit Category</div>
            <EditPostCategoryForm category={category} />
         </div>
      </div>
   );
};

export default EditPostCategoryPage;
