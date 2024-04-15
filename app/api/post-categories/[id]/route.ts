import prisma from "@/prisma/client";
import { PostCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {}

export async function DELETE(
   req: NextRequest,
   { params: { id } }: { params: { id: string } }
) {
   const postCategory = await prisma.postCategory.findUnique({
      where: { id: parseInt(id) },
   });

   if (!postCategory) {
      return NextResponse.json("Invalid Category", { status: 404 });
   }

   await prisma.postCategory.delete({ where: { id: postCategory.id } });

   return NextResponse.json({});
}
