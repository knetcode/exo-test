"use client";

import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { DocumentItem } from "./document-item";
import { Loading } from "./loading";

export function DocumentList() {
  const trpc = useTRPC();
  const documentList = useQuery(trpc.documents.list.queryOptions());

  if (documentList.isLoading) return <Loading size="lg" text="Loading documents..." />;

  if (documentList.error) {
    return (
      <div className="bg-card border border-border/50 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-red-400 text-sm">Error: {documentList.error.message}</p>
        </div>
      </div>
    );
  }

  if (!documentList.data || documentList.data.length === 0) {
    return (
      <div className="bg-card border border-border/50 rounded-lg p-6">
        <div className="text-center py-8 text-muted-foreground">No documents uploaded yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documentList.data.map((doc) => (
        <DocumentItem key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
