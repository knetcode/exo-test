"use client";

import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const trpc = useTRPC();
  const userList = useQuery(trpc.users.list.queryOptions());

  return (
    <div>
      {userList.data?.map((x) => {
        return (
          <div key={x.id}>
            <h1>{x.firstName}</h1>
          </div>
        );
      })}
    </div>
  );
}
