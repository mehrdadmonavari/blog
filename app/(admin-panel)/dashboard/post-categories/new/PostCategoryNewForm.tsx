"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";

const createPostCategorySchema = z.object({
   name: z.string({ invalid_type_error: "Name field is requered" }).min(1).max(255),
   description: z
      .string({ invalid_type_error: "Description field is requered" })
      .min(10, "Description must contain at least 10 character(s)"),
   status: z.enum(["ENABLE", "DISABLE"]),
});

type FormData = z.infer<typeof createPostCategorySchema>;

const PostCategoryNewForm = () => {
   const router = useRouter();
   const [file, setFile] = useState<File>();
   const { edgestore } = useEdgeStore();

   const form = useForm<FormData>({
      resolver: zodResolver(createPostCategorySchema),
      defaultValues: {
         name: "",
         description: "",
         status: "ENABLE",
      },
   });

   const onSubmit = async (values: FormData) => {
      try {
         const { data } = await axios.post(
            "http://localhost:3000/api/post-categories",
            values
         );
         router.push("http://localhost:3000/dashboard/post-categories");
         router.refresh();
      } catch (error) {
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
               <FormItem className="md:flex-1 h-[255px]">
                  <FormLabel className="text-slate-500">Image</FormLabel>
                  <FormControl>
                     <SingleImageDropzone
                        className="min-h-[200px]"
                        // width={300}
                        // height={300}
                        value={file}
                        onChange={(file) => {
                           setFile(file);
                        }}
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-x-10 gap-y-4 md:gap-y-0">
               {/* <FormField
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                     <FormItem className="md:flex-1 h-[145px]">
                        <FormLabel className="text-slate-500">Description</FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="Some description"
                              className={`resize-none text-slate-700 ${
                                 fieldState?.invalid && "border-red-500"
                              } transition duration-300 focus-visible:border-indigo-500 focus-visible:shadow-sm placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-2.5`}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               /> */}
            </div>
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   );
};

export default PostCategoryNewForm;
