"use client";

import { Loading } from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { XMLDataTable } from "@/components/xml-data-table";
import { parseXMLData } from "@/utils/xml-parser";

export function XMLList() {
  const xmlQuery = useQuery({
    queryKey: ["xml"],
    queryFn: () => fetch("/api/xml").then((res) => res.text()),
  });

  if (xmlQuery.isLoading) return <Loading />;
  if (xmlQuery.error)
    return (
      <div className="bg-card border border-border/50 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-red-400 text-sm">Error: {xmlQuery.error.message}</p>
        </div>
      </div>
    );

  const parsedData = parseXMLData(xmlQuery.data ?? "");

  return (
    <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
      <XMLDataTable data={parsedData} />
    </div>
  );
}
