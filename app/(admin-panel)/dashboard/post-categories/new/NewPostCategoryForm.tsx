"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Spinner from "@/components/ui/spinner";

const MAX_FILE_SIZE = 1024 * 1024 * 1;

const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png"];

const createPostCategorySchema = z.object({
   name: z.string({ invalid_type_error: "Name field is required" }).min(1).max(255),
   description: z
      .string({ invalid_type_error: "Description field is required" })
      .min(10, "Description must contain at least 10 character(s)"),
   status: z.enum(["ENABLE", "DISABLE"]),
   image: z
      .any()
      .refine((files) => {
         return files !== undefined;
      }, `Image field is required`)
      .refine(
         (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
         "Only .jpg, .jpeg and .png formats are supported."
      )
      .refine((files) => {
         return files?.size <= MAX_FILE_SIZE;
      }, `Max image size is 1MB.`),
});

type FormData = z.infer<typeof createPostCategorySchema>;

const NewPostCategoryForm = () => {
   const { edgestore } = useEdgeStore();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const searchParams = useSearchParams();

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

   const form = useForm<FormData>({
      resolver: zodResolver(createPostCategorySchema),
      defaultValues: {
         name: "",
         description: "",
         status: "ENABLE",
      },
   });

   const onSubmit = async (values: FormData) => {
      setIsSubmitting(true);
      const newFormValues = {
         name: values.name,
         description: values.description,
         status: values.status,
         imageUrl: "",
      };

      if (!values.image) {
         console.log("image does not exist");
         setIsSubmitting(false);
         return;
      }
      const file: File = values.image;

      try {
         const res = await edgestore.publicFiles.upload({ file });
         newFormValues.imageUrl = res.url;
      } catch (error) {
         console.log("error in upload image", error);
         setIsSubmitting(false);
         return;
      }

      try {
         const { data } = await axios.post(
            "http://localhost:3000/api/post-categories",
            newFormValues
         );
         setIsSubmitting(false);
         const url = createQueryString({
            path: "http://localhost:3000/dashboard/post-categories",
            queries: [
               { name: "dialog", value: "open" },
               { name: "dialogType", value: "SUCCESS" },
               { name: "dialogTitle", value: "successfull" },
               { name: "dialogDescription", value: "category created successfully" },
            ],
         });
         router.push(url);
         router.refresh();
      } catch (error) {
         setIsSubmitting(false);
         console.log(error);
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="py-6 space-y-4">
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-x-10 gap-y-4 md:gap-y-0">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">Name</FormLabel>
                        <FormControl>
                           <Input
                              className={`text-slate-700 ${
                                 fieldState?.invalid && "border-red-500"
                              } transition duration-300 focus-visible:border-indigo-500 focus-visible:shadow-sm placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-2.5`}
                              placeholder="Sport"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="status"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                              <SelectTrigger
                                 className={`text-slate-700 ${
                                    fieldState?.invalid && "border-red-500"
                                 } transition duration-300 focus-visible:outline-none aria-[expanded=true]:border-indigo-500 focus:border-indigo-500 focus:shadow-sm`}>
                                 <SelectValue />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              <SelectItem value="ENABLE">enable</SelectItem>
                              <SelectItem value="DISABLE">disable</SelectItem>
                           </SelectContent>
                        </Select>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-x-10 gap-y-4 md:gap-y-0">
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[255px]">
                        <FormLabel className="text-slate-500">Description</FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="Some description"
                              className={`resize-none text-slate-700 ${
                                 fieldState?.invalid && "border-red-500"
                              } transition duration-300 min-h-[200px] focus-visible:border-indigo-500 focus-visible:shadow-sm placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-2.5`}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="image"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[255px]">
                        <FormLabel className="text-slate-500">Image</FormLabel>
                        <FormControl>
                           <SingleImageDropzone
                              className="min-h-[200px]"
                              error={fieldState.invalid ? fieldState.error?.message : ""}
                              {...field}
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />
            </div>
            <Button
               className={`flex gap-x-3 ${
                  isSubmitting && "min-w-[84px] flex justify-center"
               }`}
               type="submit"
               disabled={isSubmitting}>
               {isSubmitting ? <Spinner /> : "Submit"}
            </Button>
         </form>
      </Form>
   );
};

export default NewPostCategoryForm;
