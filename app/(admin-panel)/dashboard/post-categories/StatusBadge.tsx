import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";
import React from "react";

const statusMap: Record<Status, { label: string; variant: "default" | "destructive" }> = {
   ENABLE: { label: "enable", variant: "default" },
   DISABLE: { label: "disable", variant: "destructive" },
};

interface Props {
   status: Status;
}

const StatusBadge = ({ status }: Props) => {
   return <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>;
};

export default StatusBadge;
