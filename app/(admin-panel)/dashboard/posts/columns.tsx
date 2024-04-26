"use client";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "./StatusBadge";
import CommentableBadge from "./CommentableBadge";
import PostCategoryActionsButton from "../post-categories/PostCategoryActionsButton";
import PostActionsButton from "./PostActionsButton";
// import PostCategoryActionsButton from "./PostCategoryActionsButton";

export const columns: ColumnDef<Post>[] = [
   {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
         return <div className="min-w-24">{row.getValue("title")}</div>;
      },
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
         return <StatusBadge status={row.getValue("status")} />;
      },
   },
   {
      accessorKey: "commentable",
      header: "Commentable",
      cell: ({ row }) => {
         return <CommentableBadge commentable={row.getValue("commentable")} />;
      },
   },
   {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
         const date: Date = row.getValue("createdAt");
         return (
            <div className="min-w-40">
               {date.toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
               })}
            </div>
         );
      },
   },
   {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
         const post = row.original;

         return (
            <div className="flex justify-end text-right w-full pr-3">
               <PostActionsButton id={post.id} />
            </div>
         );
      },
   },
];
