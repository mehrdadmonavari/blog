import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

const updatePostCategorySchema = z.object({
   name: z.string().min(1).max(255).nullish(),
   description: z.string().min(10).nullish(),
   status: z.enum(["ENABLE", "DISABLE"]).nullish(),
   imageUrl: z.string().nullish(),
});

export async function PATCH(
   request: NextRequest,
   { params: { id } }: { params: { id: string } }
) {
   const body = await request.json();
   const validation = updatePostCategorySchema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
   }
   
   const postCategory = await prisma.postCategory.findUnique({ where: { id: parseInt(id) } });
   if (!postCategory)
      return NextResponse.json({ error: "category does not exist" }, { status: 404 });

   const updatedPostCategory = await prisma.postCategory.update({
      where: { id: parseInt(id) },
      data: {
         ...body,
      },
   });

   return NextResponse.json(updatedPostCategory, { status: 201 });
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
