"use client";

import { userFormSchema, UserFormSchema } from "@/db/users/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/trpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormInput } from "@/components/form-input";
import { OccupationField } from "@/components/occupation-field";
import { ButtonContainer } from "@/components/button-container";
import { onIdBlur } from "@/utils/on-id-blur";
import { FormContainer } from "@/components/form-container";

export default function CreateUserPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const createUser = useMutation(trpc.users.create.mutationOptions());
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormSchema>({ resolver: zodResolver(userFormSchema) });

  function onSubmit(data: UserFormSchema) {
    createUser.mutate(
      {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(trpc.users.list.queryOptions());
          router.push("/users");
          toast.success("User created successfully");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-teal-500 text-center mb-4">Create User</h1>
      <FormContainer>
        <FormInput
          label="First Name"
          placeholder="John"
          type="text"
          error={errors.firstName}
          register={register("firstName")}
        />
        <FormInput
          label="Last Name"
          placeholder="Doe"
          type="text"
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
          error={errors.dateOfBirth}
          register={register("dateOfBirth")}
          disabled
        />
        <OccupationField setOccupationId={(value) => setValue("occupationId", value)} error={errors.occupationId} />
        <ButtonContainer>
          <Button asChild variant="outline">
            <Link href="/users">Back to users</Link>
          </Button>
          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? "Creating..." : "Submit"}
          </Button>
        </ButtonContainer>
        {createUser.isError && <p className="text-red-500 text-sm">{createUser.error?.message}</p>}
      </FormContainer>
    </form>
  );
}
