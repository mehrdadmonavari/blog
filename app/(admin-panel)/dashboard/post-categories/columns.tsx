"use client";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "./StatusBadge";
import { Status } from "@prisma/client";

export type Category = {
   id: number;
   name: string;
   description: string;
   status: Status;
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
];
