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
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500 text-sm">Error: {xmlQuery.error.message}</p>
      </div>
    );

  const parsedData = parseXMLData(xmlQuery.data ?? "");

  return (
    <div>
      <XMLDataTable data={parsedData} />
    </div>
  );
}
