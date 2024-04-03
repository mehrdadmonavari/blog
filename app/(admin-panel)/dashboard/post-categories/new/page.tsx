import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import PostCategoryNewForm from "./PostCategoryNewForm";

const NewPostCategoryPage = () => {
   return (
      <div className="flex-1 flex flex-col">
         <div className="py-6">
            <Breadcrumb>
               <BreadcrumbList>
                  <BreadcrumbItem className="text-base">
                     <BreadcrumbLink asChild>
                        <Link href="/dashboard">Dashboard</Link>
                     </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-base">
                     <BreadcrumbLink asChild>
                        <Link href="/dashboard/post-categories">Categories</Link>
                     </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-base">
                     <BreadcrumbPage>New Category</BreadcrumbPage>
                  </BreadcrumbItem>
                  {/* ... */}
               </BreadcrumbList>
            </Breadcrumb>
         </div>
         <div className="flex-1 bg-white rounded-lg shadow-lg p-6 my-3">
            <div className="text-2xl text-slate-700 font-semibold">
               New category registration
            </div>
            <PostCategoryNewForm />
         </div>
      </div>
   );
};

export default NewPostCategoryPage;
