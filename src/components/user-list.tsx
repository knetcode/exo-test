"use client";

import { UserDataTable } from "@/components/user-data-table";
import { useTRPC } from "@/trpc/trpc";
import { maskId } from "@/utils/id-mask";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./loading";
import { Button } from "./ui/button";
import Link from "next/link";

export function UserList() {
  const trpc = useTRPC();
  const userList = useQuery(trpc.users.list.queryOptions());
  const occupationList = useQuery(trpc.occupations.list.queryOptions());

  if (userList.isLoading) return <Loading />;
  if (userList.error)
    return (
      <div className="bg-card border border-border/50 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center py-6 sm:py-8">
          <p className="text-red-400 text-sm">Error: {userList.error.message}</p>
        </div>
      </div>
    );

  const userListData = userList.data?.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    idNumber: maskId(user.idNumber),
    dateOfBirth: user.dateOfBirth,
    occupation: occupationList.data?.find((occupation) => occupation.id === user.occupationId)?.name ?? "",
    id: user.id,
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <Button asChild className="bg-teal-500 hover:bg-teal-600">
          <Link href="/users/create">Create User</Link>
        </Button>
      </div>

      <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
        {userList.data ? (
          <UserDataTable data={userListData ?? []} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">No users found</div>
        )}
      </div>
    </div>
  );
}
