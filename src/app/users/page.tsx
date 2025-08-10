"use client";

import { UserDataTable } from "@/components/user-data-table";
import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { maskId } from "@/utils/id-mask";

export default function ListUsersPage() {
  const trpc = useTRPC();
  const userList = useQuery(trpc.users.list.queryOptions());
  const occupationList = useQuery(trpc.occupations.list.queryOptions());

  if (userList.isLoading) return <div>Loading...</div>;

  const userListData = userList.data?.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    idNumber: maskId(user.idNumber),
    dateOfBirth: user.dateOfBirth,
    occupation: occupationList.data?.find((occupation) => occupation.id === user.occupationId)?.name ?? "",
    id: user.id,
  }));

  return (
    <div>
      <div className="flex justify-between my-4 items-center">
        <h1>User list</h1>
        <Button asChild>
          <Link href="/users/create">Create User</Link>
        </Button>
      </div>
      {userList.data ? <UserDataTable data={userListData ?? []} /> : <div>No users found</div>}
    </div>
  );
}
