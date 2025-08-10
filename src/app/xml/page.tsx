"use client";

import { useQuery } from "@tanstack/react-query";
import { XMLDataTable } from "@/components/xml-data-table";
import { parseXMLData } from "@/utils/xml-parser";

export default function XMLPage() {
  const xmlQuery = useQuery({
    queryKey: ["xml"],
    queryFn: () => fetch("/api/xml").then((res) => res.text()),
  });

  if (xmlQuery.isLoading) return <div>Loading...</div>;
  if (xmlQuery.error) return <div>Error: {xmlQuery.error.message}</div>;

  const parsedData = parseXMLData(xmlQuery.data ?? "");

  return (
    <div className="space-y-6">
      <p>
        Wasn&apos;t too sure what the correct display of the data should be so I just went with my gut feel on how to
        display the data on the UI
      </p>
      {parsedData.length > 0 ? (
        <XMLDataTable data={parsedData} />
      ) : (
        <div>
          <p>No XML data could be parsed</p>
        </div>
      )}
    </div>
  );
}
