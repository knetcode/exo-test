"use client";

import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { DocumentItem } from "./document-item";

export function DocumentList() {
  const trpc = useTRPC();
  const documentList = useQuery(trpc.documents.list.queryOptions());

  return (
    <div>
      {documentList.data && documentList.data.length > 0 && (
        <div className="flex flex-col gap-4">
          {documentList.data?.map((doc) => (
            <DocumentItem key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
