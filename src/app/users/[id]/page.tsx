"use client";

import { UserFormSchema, userFormSchema } from "@/db/users/schema";
import { useTRPC } from "@/trpc/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const trpc = useTRPC();
  const userById = useQuery(trpc.users.getById.queryOptions(id));
  const updateUser = useMutation(trpc.users.update.mutationOptions());
  const occupations = useQuery(trpc.occupations.list.queryOptions());
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    defaultValues: {
      firstName: userById.data?.firstName,
      lastName: userById.data?.lastName,
      idNumber: userById.data?.idNumber,
      dateOfBirth: userById.data?.dateOfBirth,
      occupationId: userById.data?.occupationId,
    },
    resolver: zodResolver(userFormSchema),
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
          queryClient.invalidateQueries(trpc.users.list.queryOptions());
          queryClient.invalidateQueries(trpc.users.getById.queryOptions(id));
          router.push("/users");
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
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="occupation">Occupation</label>
          <select
            className="max-w-80 border-2 border-slate-300"
            {...register("occupationId")}
            defaultValue={userById.data?.occupationId}
          >
            {occupations.data?.map((occupation) => (
              <option key={occupation.id} value={occupation.id}>
                {occupation.name}
              </option>
            ))}
          </select>
          {errors.occupationId && <p>{errors.occupationId.message}</p>}
        </div>
        <button type="submit" disabled={updateUser.isPending}>
          {updateUser.isPending ? "Updating..." : "Submit"}
        </button>
      </form>
      <Link href="/users">Back to users</Link>
    </div>
  );
}
