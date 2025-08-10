"use client";

import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { Loading } from "@/components/loading";

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const trpc = useTRPC();
  const document = useQuery(trpc.documents.getById.queryOptions(id));

  if (document.isLoading) {
    return <Loading size="lg" text="Loading document..." className="min-h-[400px]" />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-card/50 border border-border rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-teal-500 mb-8">Document Viewer</h1>
        <p className="text-center text-muted-foreground">View your uploaded document</p>

        <div className="border-t border-border pt-6">
          <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
            <div className="h-[80vh] w-full">
              <embed src={document.data?.url} type={document.data?.contentType} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
