import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/prisma/client";
import { z } from "zod";

const createPostCategorySchema = z.object({
   name: z.string().min(1).max(255),
   description: z.string().min(10),
   status: z.enum(["ENABLE", "DISABLE"]),
   imageUrl: z.string(),
});

interface PostCategoryData {
   name: string;
   description: string;
   status: "ENABLE" | "DISABLE";
   imageUrl: string;
   userId: string;
}

export async function POST(req: NextRequest) {
   const session = await getServerSession();

   if (!session) {
      return NextResponse.json({ message: "unauthenticated!" });
   }

   const user = await prisma.user.findUnique({ where: { email: session.user?.email! } });

   const body = await req.json();
   const validation = createPostCategorySchema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
   }

   const createtData: PostCategoryData = {
      name: body.name,
      description: body.description,
      status: body.status,
      imageUrl: body.imageUrl,
      userId: user?.id!,
   };

   const newPostCategory = await prisma.postCategory.create({
      data: createtData,
   });

   return NextResponse.json(newPostCategory, { status: 201 });
}

export async function GET(req: NextRequest) {
   const data = await prisma.postCategory.findMany();

   return NextResponse.json(data, { status: 201 });
}
