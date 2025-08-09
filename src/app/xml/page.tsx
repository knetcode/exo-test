"use client";

import { useQuery } from "@tanstack/react-query";

export default function XMLPage() {
  const xmlQuery = useQuery({
    queryKey: ["xml"],
    queryFn: () => fetch("/api/xml").then((res) => res.text()),
  });

  if (xmlQuery.isLoading) return <div>Loading...</div>;
  if (xmlQuery.error) return <div>Error: {xmlQuery.error.message}</div>;

  return <div>{xmlQuery.data}</div>;
}
