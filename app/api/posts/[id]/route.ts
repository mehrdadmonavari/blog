import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";

export async function GET(
   req: NextRequest,
   { params: { id } }: { params: { id: string } }
) {
   const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

   if (!post) {
      return NextResponse.json("Invalid Post", { status: 404 });
   }

   return NextResponse.json(post, { status: 200 });
}

const updatePostSchema = z.object({
   title: z
      .string({ invalid_type_error: "Title field is required" })
      .min(1, { message: "Title must contain at least 1 character(s)" })
      .max(255)
      .nullish(),
   summary: z
      .string({ invalid_type_error: "Summary field is required" })
      .min(10, "Summary must contain at least 10 character(s)")
      .nullish(),
   body: z
      .string({ invalid_type_error: "Body field is required" })
      .min(20, "Body must contain at least 20 character(s)")
      .nullish(),
   status: z.enum(["ENABLE", "DISABLE"]).nullish(),
   commentable: z.enum(["COMMENTABLE", "UNCOMMENTABLE"]).nullish(),
   categoryId: z.number().nullish(),
   imageUrl: z.string().nullish(),
   publishedAt: z.string().transform((str) => new Date(str)).nullish(),
});

export async function PATCH(
   request: NextRequest,
   { params: { id } }: { params: { id: string } }
) {
   const body = await request.json();
   const validation = updatePostSchema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
   }

   if (body.categoryId) {
      const category = await prisma.postCategory.findUnique({
         where: { id: body.categoryId },
      });

      if (!category) {
         return NextResponse.json("selected category not found", { status: 400 });
      }
   }

   const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
   if (!post) return NextResponse.json({ error: "post does not exist" }, { status: 404 });

   const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
         ...body,
      },
   });

   return NextResponse.json(updatedPost, { status: 201 });
}

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
