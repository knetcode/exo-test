"use client";

import { useTRPC } from "@/trpc/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";

import Link from "next/link";

export default function ListUsersPage() {
  const trpc = useTRPC();
  const userList = useQuery(trpc.users.list.queryOptions());
  const occupationList = useQuery(trpc.occupations.list.queryOptions());

  const deleteUser = useMutation(trpc.users.delete.mutationOptions());

  function onDelete(id: string) {
    deleteUser.mutate(id, {
      onSuccess: () => {
        userList.refetch();
      },
    });
  }

  return (
    <div>
      <h1>Users</h1>
      <Link href="/users/create">Create User</Link>
      {userList.data?.map((user) => (
        <div key={user.id} className="flex flex-col gap-2 border-2 border-slate-300 p-2">
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>ID Number: {user.idNumber}</p>
          <p>Date of Birth: {user.dateOfBirth}</p>
          <p>Occupation: {occupationList.data?.find((occupation) => occupation.id === user.occupationId)?.name}</p>
          <div className="flex gap-2 flex-row">
            <button type="button" onClick={() => onDelete(user.id)} disabled={deleteUser.isPending}>
              {deleteUser.isPending ? "Deleting..." : "Delete"}
            </button>
            <Link href={`/users/${user.id}`}>Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
