"use client";

import React from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const createPostCategorySchema = z.object({
   name: z.string({ invalid_type_error: "Name field is requered" }).min(1).max(255),
   description: z
      .string({ invalid_type_error: "Description field is requered" })
      .min(10, "Description must contain at least 10 character(s)"),
});

type FormData = z.infer<typeof createPostCategorySchema>;

const PostCategoryNewForm = () => {
   const router = useRouter();
   const form = useForm<FormData>({
      resolver: zodResolver(createPostCategorySchema),
      defaultValues: {
         name: "",
         description: "",
      },
   });

   const onSubmit = async (values: FormData) => {
      try {
         const { data } = await axios.post(
            "http://localhost:3000/api/post-categories",
            values
         );
         router.push("http://localhost:3000/dashboard/post-categories");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="py-6 space-y-6">
            <div className="flex justify-center gap-x-10">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                     <FormItem className="flex-1 h-[100px]">
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
                  name="description"
                  render={({ field, fieldState }) => (
                     <FormItem className="flex-1 h-[100px]">
                        <FormLabel className="text-slate-500">Description</FormLabel>
                        <FormControl>
                           <Input
                              className={`text-slate-700 ${
                                 fieldState?.invalid && "border-red-500"
                              } transition duration-300 focus-visible:border-indigo-500 focus-visible:shadow-sm placeholder:text-slate-400 placeholder:font-medium placeholder:transition-all placeholder:duration-300 focus-visible:placeholder:translate-x-2.5`}
                              placeholder="Some description..."
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <Button type="submit">Submit</Button>
         </form>
      </Form>
   );
};

export default PostCategoryNewForm;
