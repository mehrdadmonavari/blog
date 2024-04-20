import { Separator } from "@/components/ui/separator";
import React from "react";

const NotFoundPage = () => {
   return (
      <div className="w-full flex justify-center items-center pb-28">
         <div className="font-bold text-3xl text-slate-700">404</div>
         <Separator orientation="vertical" className="bg-slate-500 mx-6 h-14" />
         <div className="font-bold text-xl text-slate-700">This page coud not be found</div>
      </div>
   );
};

export default NotFoundPage;
