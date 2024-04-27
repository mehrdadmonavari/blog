import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { z } from "zod";

const createPostSchema = z.object({
   title: z
      .string({ invalid_type_error: "Title field is required" })
      .min(1, { message: "Title must contain at least 1 character(s)" })
      .max(255),
   summary: z
      .string({ invalid_type_error: "Summary field is required" })
      .min(10, "Summary must contain at least 10 character(s)"),
   body: z
      .string({ invalid_type_error: "Body field is required" })
      .min(20, "Body must contain at least 20 character(s)"),
   status: z.enum(["ENABLE", "DISABLE"]),
   commentable: z.enum(["COMMENTABLE", "UNCOMMENTABLE"]),
   imageUrl: z.string(),
   categoryId: z.number()
});

interface PostData {
   title: string;
   summary: string;
   body: string;
   status: "ENABLE" | "DISABLE";
   commentable: "COMMENTABLE" | "UNCOMMENTABLE";
   imageUrl: string;
   userId: string;
   categoryId: number;
}

export async function POST(req: NextRequest) {
   const session = await getServerSession();

   if (!session) {
      return NextResponse.json({ message: "unauthenticated!" });
   }

   const user = await prisma.user.findUnique({ where: { email: session.user?.email! } });

   const body = await req.json();
   const validation = createPostSchema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
   }

   const createdData: PostData = {
      title: body.title,
      summary: body.summary,
      body: body.body,
      status: body.status,
      commentable: body.commentable,
      imageUrl: body.imageUrl,
      userId: user?.id!,
      categoryId: body.categoryId,
   };

   const newPost = await prisma.post.create({
      data: createdData,
   });

   return NextResponse.json(newPost, { status: 201 });
}
