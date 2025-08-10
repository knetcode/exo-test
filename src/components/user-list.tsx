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
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500 text-sm">Error: {userList.error.message}</p>
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
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/users/create">Create User</Link>
        </Button>
      </div>
      {userList.data ? <UserDataTable data={userListData ?? []} /> : <div>No users found</div>}
    </div>
  );
}
