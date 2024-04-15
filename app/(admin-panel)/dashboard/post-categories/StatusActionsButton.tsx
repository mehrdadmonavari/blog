import React from "react";
import { Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
   id: number;
}

const StatusActionsButton = ({ id }: Props) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               className="flex items-center justify-center text-center h-8 w-8 p-0">
               <span className="sr-only">Open menu</span>
               <MoreHorizontal className="h-4 w-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <Link href={`/dashboard/post-categories/${id}`}>
               <DropdownMenuItem className="text-slate-700 font-medium cursor-pointer">
                  <Eye className="w-5 mr-1.5" />
                  View Detail
               </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-slate-700 font-medium cursor-pointer transition duration-300 hover:!bg-blue-100 hover:!text-blue-500">
               <SquarePen className="w-5 mr-1.5" />
               Update Category
            </DropdownMenuItem>
            <DropdownMenuItem
               className="text-slate-700 font-medium cursor-pointer transition duration-300 hover:!bg-red-100 hover:!text-red-500"
               onClick={() => console.log("clicked on delete")}>
               <AlertDialogTrigger className="flex justify-center items-center">
                  <Trash2 className="w-5 mr-1.5" />
                  Delete Category
               </AlertDialogTrigger>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default StatusActionsButton;
