import prisma from "@/prisma/client";
import { PostCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   req: NextRequest,
   { params: { id } }: { params: { id: string } }
) {
   const category = await prisma.postCategory.findUnique({ where: { id: parseInt(id) } });

   if (!category) {
      return NextResponse.json("Invalid Category", { status: 404 });
   }

   return NextResponse.json(category, { status: 200 });
}

export async function DELETE(
   req: NextRequest,
   { params: { id } }: { params: { id: string } }
) {
   const category = await prisma.postCategory.findUnique({
      where: { id: parseInt(id) },
   });

   if (!category) {
      return NextResponse.json("Invalid Category", { status: 404 });
   }

   await prisma.postCategory.delete({ where: { id: category.id } });

   return NextResponse.json({});
}
