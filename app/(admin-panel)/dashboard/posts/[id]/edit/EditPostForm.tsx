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
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Spinner from "@/components/ui/spinner";
import DatePicker from "@/components/ui/datePicker";

const MAX_FILE_SIZE = 1024 * 1024 * 1;

const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png"];

const editPostSchema = z.object({
   title: z
      .string({ invalid_type_error: "Title field is required" })
      .min(1, { message: "Title must contain at least 1 character(s)" })
      .max(255),
   summary: z
      .string({ invalid_type_error: "Summary field is required" })
      .min(10, "Summary must contain at least 10 character(s)"),
   body: z
      .string({ invalid_type_error: "Body field is required" })
      .min(20, "Body must contain at least 20 character(s)"),
   status: z.enum(["ENABLE", "DISABLE"]),
   commentable: z.enum(["COMMENTABLE", "UNCOMMENTABLE"]),
   categoryId: z
      .string()
      .trim()
      .min(1, "Category field is required. please select a category"),
   image: z.union([
      z.string(),
      z
         .any()
         .refine((files) => {
            return files !== "string" && files !== undefined;
         }, `Image field is required`)
         .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
            "Only .jpg, .jpeg and .png formats are supported."
         )
         .refine((files) => {
            return files?.size <= MAX_FILE_SIZE;
         }, `Max image size is 1MB.`),
   ]),
   publishedAt: z.date({ message: "published at field is required" }),
});

type FormData = z.infer<typeof editPostSchema>;

interface Props {
   post: Post;
   categories: Category[];
}

const EditPostForm = ({ post, categories }: Props) => {
   const { edgestore } = useEdgeStore();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const searchParams = useSearchParams();

   const comboboxData = categories.map((category) => {
      return {
         id: category.id,
         value: category.name.toLowerCase(),
         label: category.name.toLowerCase(),
      };
   });

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
      resolver: zodResolver(editPostSchema),
      defaultValues: {
         title: post ? post.title : "",
         summary: post ? post.summary : "",
         body: post ? post.body : "",
         status: post ? post.status : "ENABLE",
         commentable: post ? post.commentable : "COMMENTABLE",
         image: post ? post.imageUrl : "",
         publishedAt: post ? post.publishedAt : new Date(""),
         categoryId: post ? post.categoryId.toString() : "",
      },
   });

   const onSubmit = async (values: FormData) => {
      setIsSubmitting(true);

      const newFormValues: { [index: string]: any } = {
         title: values.title !== post.title ? values.title : null,
         summary: values.summary !== post.summary ? values.summary : null,
         body: values.body !== post.body ? values.body : null,
         status: values.status !== post.status ? values.status : null,
         commentable: values.commentable !== post.commentable ? values.commentable : null,
         imageUrl: "",
         publishedAt:
            values.publishedAt.toISOString() !== post.publishedAt.toISOString()
               ? values.publishedAt
               : null,
         categoryId:
            values.categoryId !== post.categoryId.toString()
               ? parseInt(values.categoryId)
               : null,
      };

      if (!values.image) {
         console.log("image does not exist");
         setIsSubmitting(false);
         return;
      }

      if (typeof values.image !== "string") {
         const file: File = values.image;

         try {
            const res = await edgestore.publicFiles.upload({
               file,
               options: {
                  replaceTargetUrl: post.imageUrl,
               },
            });
            newFormValues.imageUrl = res.url;
         } catch (error) {
            console.log("error in upload image", error);
            setIsSubmitting(false);
            return;
         }
      }
      
      for (const prop in newFormValues) {
         if (newFormValues[prop] === null || newFormValues[prop] === "")
            delete newFormValues[prop];
      }

      try {
         const { data } = await axios.patch(
            `http://localhost:3000/api/posts/${post.id}`,
            newFormValues
         );
         setIsSubmitting(false);
         const url = createQueryString({
            path: "http://localhost:3000/dashboard/posts",
            queries: [
               { name: "dialog", value: "open" },
               { name: "dialogType", value: "SUCCESS" },
               { name: "dialogTitle", value: "successfull" },
               { name: "dialogDescription", value: "post edited successfully" },
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
                  name="title"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">Title</FormLabel>
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
                  name="summary"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">Summary</FormLabel>
                        <FormControl>
                           <Input
                              className={`text-slate-700 ${
                                 fieldState?.invalid && "border-red-500"
                              } transition duration-300 focus-visible:border-indigo-500 focus-visible:shadow-sm placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-2.5`}
                              placeholder="Summary for sport"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="commentable"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">Commentable</FormLabel>
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
                              <SelectItem value="COMMENTABLE">commentable</SelectItem>
                              <SelectItem value="UNCOMMENTABLE">uncommentable</SelectItem>
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
                  name="publishedAt"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">published at</FormLabel>
                        <FormControl>
                           <DatePicker
                              date={field.value}
                              setDate={field.onChange}
                              invalid={fieldState.invalid}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                              <SelectTrigger
                                 className={`text-slate-700 ${
                                    fieldState?.invalid && "border-red-500"
                                 } transition duration-300 focus-visible:outline-none aria-[expanded=true]:border-indigo-500 focus:border-indigo-500 focus:shadow-sm`}>
                                 <SelectValue />
                                 {field.value === "" && (
                                    <span className="flex-1 text-left text-slate-400 font-medium transition-all duration-300">
                                       No category selected
                                    </span>
                                 )}
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              <Command>
                                 <CommandInput placeholder="Search category..." />
                                 <CommandEmpty>No Category found.</CommandEmpty>
                                 <CommandGroup>
                                    {comboboxData.map((item) => (
                                       <CommandItem
                                          className="px-0 py-0 aria-selected:bg-inherit aria-selected:text-inherit"
                                          key={item.id}
                                          value={item.value}>
                                          <SelectItem value={item.id.toString()}>
                                             {item.label}
                                          </SelectItem>
                                       </CommandItem>
                                    ))}
                                 </CommandGroup>
                              </Command>
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
                  name="body"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[255px]">
                        <FormLabel className="text-slate-500">Body</FormLabel>
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

export default EditPostForm;
