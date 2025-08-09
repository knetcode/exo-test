"use client";

import { UserFormSchema } from "@/db/users/schema";
import { useTRPC } from "@/trpc/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { use } from "react";
import Link from "next/link";

export default function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const trpc = useTRPC();
  const userById = useQuery(trpc.users.getById.queryOptions(id));
  const updateUser = useMutation(trpc.users.update.mutationOptions());

  const { register, handleSubmit } = useForm<UserFormSchema>({
    defaultValues: {
      firstName: userById.data?.firstName,
      lastName: userById.data?.lastName,
      idNumber: userById.data?.idNumber,
      dateOfBirth: userById.data?.dateOfBirth,
      occupation: userById.data?.occupation,
    },
  });

  function onSubmit(data: UserFormSchema) {
    updateUser.mutate(
      {
        id,
        ...data,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      },
      {
        onSuccess: () => {
          userById.refetch();
        },
      }
    );
  }

  if (userById.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User {id}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-start justify-start">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            className="max-w-80 border-2 border-slate-300"
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            defaultValue={userById.data?.firstName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="max-w-80 border-2 border-slate-300"
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            defaultValue={userById.data?.lastName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="idNumber">ID Number</label>
          <input
            className="max-w-80 border-2 border-slate-300"
            type="text"
            {...register("idNumber")}
            placeholder="ID Number"
            defaultValue={userById.data?.idNumber}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            className="max-w-80 border-2 border-slate-300"
            type="date"
            {...register("dateOfBirth")}
            placeholder="Date of Birth"
            defaultValue={userById.data?.dateOfBirth}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="occupation">Occupation</label>
          <input
            className="max-w-80 border-2 border-slate-300"
            type="text"
            {...register("occupation")}
            placeholder="Occupation"
            defaultValue={userById.data?.occupation}
          />
        </div>
        <button type="submit" disabled={updateUser.isPending}>
          {updateUser.isPending ? "Updating..." : "Submit"}
        </button>
      </form>
      <Link href="/users">Back to users</Link>
    </div>
  );
}
