"use client";

import { UserFormSchema, userFormSchema } from "@/db/users/schema";
import { useTRPC } from "@/trpc/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
    watch,
    setValue,
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
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-start justify-start">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <Input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            defaultValue={userById.data?.firstName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <Input type="text" {...register("lastName")} placeholder="Last Name" defaultValue={userById.data?.lastName} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="idNumber">ID Number</label>
          <Input type="text" {...register("idNumber")} placeholder="ID Number" defaultValue={userById.data?.idNumber} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <Input
            type="date"
            {...register("dateOfBirth")}
            placeholder="Date of Birth"
            defaultValue={userById.data?.dateOfBirth}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="occupation">Occupation</label>
          <Select value={watch("occupationId") || ""} onValueChange={(value) => setValue("occupationId", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an occupation" />
            </SelectTrigger>
            <SelectContent>
              {occupations.data?.map((occupation) => (
                <SelectItem key={occupation.id} value={occupation.id}>
                  {occupation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.occupationId && <p>{errors.occupationId.message}</p>}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/users">Back to users</Link>
          </Button>
          <Button type="submit" disabled={updateUser.isPending}>
            {updateUser.isPending ? "Updating..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
