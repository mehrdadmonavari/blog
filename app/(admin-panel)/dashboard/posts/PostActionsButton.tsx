import React, { useCallback, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/spinner";

interface Props {
   id: number;
}

const PostActionsButton = ({ id }: Props) => {
   const { edgestore } = useEdgeStore();
   const router = useRouter();
   const searchParams = useSearchParams();
   const [isDeleting, setIsDeleting] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   const createQueryString = useCallback(
      ({
         path,
         queries,
      }: {
         path: string;
         queries: { name: string; value: string }[];
      }) => {
         const params = new URLSearchParams(searchParams.toString());
         queries.map((query) => {
            params.set(query.name, query.value);
         });
         return path + "?" + params.toString();
      },
      [searchParams]
   );

   const handleDelete = async (id: number) => {
      setIsDeleting(true);
      try {
         const { data } = await axios.get(`http://localhost:3000/api/posts/${id}`);
         await edgestore.publicFiles.delete({ url: data.imageUrl });
         await axios.delete(`http://localhost:3000/api/posts/${id}`);
         const url = createQueryString({
            path: "http://localhost:3000/dashboard/posts",
            queries: [
               { name: "dialog", value: "open" },
               { name: "dialogType", value: "SUCCESS" },
               { name: "dialogTitle", value: "successfull" },
               { name: "dialogDescription", value: "post deleted successfully" },
            ],
         });
         setIsDeleting(false);
         setIsOpen(false);
         router.push(url);
         router.refresh();
      } catch (error) {
         setIsDeleting(false);
         setIsOpen(false);
         console.log(error);
      }
   };

   return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
               <Link href={`/dashboard/posts/${id}`}>
                  <DropdownMenuItem className="text-slate-700 font-medium cursor-pointer">
                     <Eye className="w-5 mr-1.5" />
                     View Detail
                  </DropdownMenuItem>
               </Link>
               <Link href={`/dashboard/posts/${id}/edit`}>
                  <DropdownMenuItem className="text-slate-700 font-medium cursor-pointer transition duration-300 hover:!bg-blue-100 hover:!text-blue-500">
                     <SquarePen className="w-5 mr-1.5" />
                     edit Post
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem className="text-slate-700 font-medium cursor-pointer transition duration-300 hover:!bg-red-100 hover:!text-red-500">
                  <AlertDialogTrigger className="flex justify-center items-center">
                     <Trash2 className="w-5 mr-1.5" />
                     Delete Post
                  </AlertDialogTrigger>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
               <AlertDialogDescription>
                  Are you sure you want to delete this post, this action cannot be undone
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
               <Button
                  disabled={isDeleting}
                  className={`${isDeleting && "min-w-[84px] flex justify-center"}`}
                  variant="destructive"
                  onClick={() => handleDelete(id)}>
                  {isDeleting ? <Spinner variant="destructive" /> : "Submit"}
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default PostActionsButton;
