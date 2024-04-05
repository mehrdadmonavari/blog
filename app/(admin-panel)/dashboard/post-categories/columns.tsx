"use client"
import { ColumnDef } from "@tanstack/react-table";

export type Category = {
   id: number;
   name: string;
   description: string;
};

export const columns: ColumnDef<Category>[] = [
   { accessorKey: "name", header: "Name" },
   { accessorKey: "description", header: "Description" },
];
