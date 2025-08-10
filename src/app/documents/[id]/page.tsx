"use client";

import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const trpc = useTRPC();
  const document = useQuery(trpc.documents.getById.queryOptions(id));

  if (document.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center" style={{ height: "90vh" }}>
      <h1>DocumentPage</h1>
      <embed src={document.data?.url} type={document.data?.contentType} className="w-full h-full" />
    </div>
  );
}
