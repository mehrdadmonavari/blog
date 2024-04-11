"use client";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "./StatusBadge";
import { Status } from "@prisma/client";
import StatusActionsButton from "./StatusActionsButton";

export type Category = {
   id: number;
   name: string;
   status: Status;
   createdAt: Date;
};

export const columns: ColumnDef<Category>[] = [
   {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
         return <div className="min-w-36">{row.getValue("name")}</div>;
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
         const category = row.original;

         return (
            <div className="flex justify-end text-right w-full pr-3">
               <StatusActionsButton id={category.id} />
            </div>
         );
      },
   },
];
