import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
   req: NextRequest,
   { params: { id } }: { params: { id: string } }
) {
   const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
   });

   if (!post) {
      return NextResponse.json("Invalid Post", { status: 404 });
   }

   await prisma.post.delete({ where: { id: post.id } });

   return NextResponse.json({});
}
