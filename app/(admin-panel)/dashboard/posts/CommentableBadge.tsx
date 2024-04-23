import { Badge } from "@/components/ui/badge";
import { Commentable } from "@prisma/client";
import React from "react";

const commentableMap: Record<Commentable, { label: string; variant: "default" | "destructive" }> = {
   COMMENTABLE: { label: "enable", variant: "default" },
   UNCOMMENTABLE: { label: "disable", variant: "destructive" },
};

interface Props {
   commentable: Commentable;
}

const CommentableBadge = ({ commentable }: Props) => {
   return <Badge variant={commentableMap[commentable].variant}>{commentableMap[commentable].label}</Badge>;
};

export default CommentableBadge;
