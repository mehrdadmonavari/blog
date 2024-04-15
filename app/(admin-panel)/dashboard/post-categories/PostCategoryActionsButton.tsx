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
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
   id: number;
}

const PostCategoryActionsButton = ({ id }: Props) => {
   const { edgestore } = useEdgeStore();
   const router = useRouter();

   const handleDelete = async (id: number) => {
      try {
         const { data } = await axios.get(
            `http://localhost:3000/api/post-categories/${id}`
         );
         await edgestore.publicFiles.delete({ url: data.imageUrl });
         await axios.delete(`http://localhost:3000/api/post-categories/${id}`);
         console.log("category deleted successfully");
         router.refresh()
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <AlertDialog>
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
               <Link href={`/dashboard/post-categories/${id}/edit`}>
                  <DropdownMenuItem className="text-slate-700 font-medium cursor-pointer transition duration-300 hover:!bg-blue-100 hover:!text-blue-500">
                     <SquarePen className="w-5 mr-1.5" />
                     edit Category
                  </DropdownMenuItem>
               </Link>
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
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
               <AlertDialogDescription>
                  Are you sure you want to delete this category, this action cannot be
                  undone
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={() => handleDelete(id)}>
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default PostCategoryActionsButton;
