"use client";

import { UserFormSchema, userFormSchema } from "@/db/users/schema";
import { useTRPC } from "@/trpc/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form-input";
import { OccupationField } from "@/components/occupation-field";
import { ButtonContainer } from "@/components/button-container";
import { onIdBlur } from "@/utils/on-id-blur";
import { toast } from "sonner";
import { FormContainer } from "@/components/form-container";

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const trpc = useTRPC();
  const userById = useQuery(trpc.users.getById.queryOptions(id));
  const updateUser = useMutation(trpc.users.update.mutationOptions());
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormSchema>({
    defaultValues: {
      firstName: userById.data?.firstName ?? "",
      lastName: userById.data?.lastName ?? "",
      idNumber: userById.data?.idNumber ?? "",
      dateOfBirth: userById.data?.dateOfBirth ?? "",
      occupationId: userById.data?.occupationId ?? "",
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
          toast.success("User updated successfully");
        },
      }
    );
  }

  useEffect(() => {
    if (userById.data) {
      setValue("firstName", userById.data.firstName);
      setValue("lastName", userById.data.lastName);
      setValue("idNumber", userById.data.idNumber);
      setValue("dateOfBirth", userById.data.dateOfBirth);
      setValue("occupationId", userById.data.occupationId);
    }
  }, [userById.data, setValue]);

  if (userById.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-teal-500 text-center mb-4">Edit User</h1>
      <FormContainer>
        <FormInput
          label="First Name"
          placeholder="John"
          type="text"
          defaultValue={userById.data?.firstName}
          error={errors.firstName}
          register={register("firstName")}
        />
        <FormInput
          label="Last Name"
          placeholder="Doe"
          type="text"
          defaultValue={userById.data?.lastName}
          error={errors.lastName}
          register={register("lastName")}
        />
        <FormInput
          label="ID Number"
          placeholder="9104285081088"
          type="text"
          error={errors.idNumber}
          register={register("idNumber")}
          onBlur={(e) => onIdBlur(e, (value) => setValue("dateOfBirth", value))}
        />
        <FormInput
          label="Date of Birth"
          type="date"
          defaultValue={userById.data?.dateOfBirth}
          error={errors.dateOfBirth}
          register={register("dateOfBirth")}
          disabled
        />
        <OccupationField
          defaultOccupationId={userById.data?.occupationId}
          setOccupationId={(value) => setValue("occupationId", value)}
          error={errors.occupationId}
        />
        <ButtonContainer>
          <Button asChild variant="outline">
            <Link href="/users">Back to users</Link>
          </Button>
          <Button type="submit" disabled={updateUser.isPending}>
            {updateUser.isPending ? "Updating..." : "Submit"}
          </Button>
        </ButtonContainer>
      </FormContainer>
      {updateUser.isError && <p className="text-red-500 text-sm">{updateUser.error?.message}</p>}
    </form>
  );
}
