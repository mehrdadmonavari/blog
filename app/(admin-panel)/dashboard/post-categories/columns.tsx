"use client";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "./StatusBadge";
import { Status } from "@prisma/client";

export type Category = {
   id: number;
   name: string;
   description: string;
   status: Status;
   createdAt: Date;
};

export const columns: ColumnDef<Category>[] = [
   { accessorKey: "name", header: "Name" },
   { accessorKey: "description", header: "Description" },
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
         return <div>{date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</div>;
      },
   },
];
