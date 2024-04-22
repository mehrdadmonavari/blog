import React, { ReactNode, useEffect, useState } from "react";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleCheck, CircleX, Info } from "lucide-react";

interface Props {
   children: ReactNode;
}

const DialogMessage = ({ children }: Props) => {
   const [isOpen, setIsOpen] = useState(false);
   const searchParams = useSearchParams();
   const [dialogState, setDialogState] = useState<string | null>();
   const [dialogType, setDialogType] = useState<string | null>();
   const [dialogTitle, setDialogTitle] = useState<string | null>();
   const [dialogDescription, setDialogDescription] = useState<string | null>();
   const pathName = usePathname();
   const router = useRouter();

   useEffect(() => {
      searchParams.has("dialog") && setDialogState(searchParams.get("dialog"));
      searchParams.has("dialogType") && setDialogType(searchParams.get("dialogType"));
      searchParams.has("dialogTitle") && setDialogTitle(searchParams.get("dialogTitle"));
      searchParams.has("dialogDescription") &&
         setDialogDescription(searchParams.get("dialogDescription"));
      if (searchParams.has("dialog")) {
         setIsOpen(true);
         router.replace("http://localhost:3000" + pathName);
      }
   }, [dialogState, searchParams]);

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         {children}
         <DialogContent>
            <DialogHeader>
               <div className="flex justify-center items-center">
                  {dialogType === "SUCCESS" && (
                     <CircleCheck className="w-20 h-20 text-green-500" />
                  )}
                  {dialogType === "ERROR" && (
                     <CircleX className="w-20 h-20 text-red-500" />
                  )}
                  {dialogType === "INFO" && <Info className="w-20 h-20 text-slate-500" />}
               </div>
               <DialogTitle className="font-semibold text-2xl text-center pt-4">
                  {dialogTitle}
               </DialogTitle>
               <DialogDescription className="pt-2 text-base text-center">
                  {dialogDescription}
               </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start flex !justify-center items-center">
               <DialogClose asChild>
                  <Button type="button">Close</Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default DialogMessage;
