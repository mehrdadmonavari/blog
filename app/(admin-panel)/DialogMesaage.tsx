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

interface Props {
   children: ReactNode;
}

const DialogMessage = ({ children }: Props) => {
   const [isOpen, setIsOpen] = useState(false);
   const searchParams = useSearchParams();
   const [dialogState, setDialogState] = useState<string | null>();
   const [dialogTitle, setDialogTitle] = useState<string | null>();
   const [dialogDescription, setDialogDescription] = useState<string | null>();
   const pathName = usePathname();
   const router = useRouter();

   useEffect(() => {
      searchParams.has("dialog") && setDialogState(searchParams.get("dialog"));
      searchParams.has("dialogTitle") && setDialogTitle(searchParams.get("dialogTitle"));
      searchParams.has("dialogDescription") && setDialogDescription(searchParams.get("dialogDescription"));
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
               <DialogTitle className="font-semibold text-2xl text-center">{dialogTitle}</DialogTitle>
               <DialogDescription className="pt-4">{dialogDescription}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
               <DialogClose asChild>
                  <Button type="button" variant="secondary">
                     Close
                  </Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default DialogMessage;
