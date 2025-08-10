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
import { Loading } from "@/components/loading";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditUserPage({ params }: Readonly<Props>) {
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

  if (userById.isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <Loading text="Loading user..." />
        </div>
      </div>
    );
  }

  if (userById.isError) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="text-center">
            <p className="text-red-400 text-sm">Error: {userById.error?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-teal-500 mb-4 sm:mb-6 md:mb-8">Edit User</h1>
        <p className="text-center text-muted-foreground">Update user information</p>

        <div className="border-t border-border pt-4 sm:pt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-card border border-border/50 rounded-lg p-3 sm:p-4 sm:p-6">
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
                <OccupationField
                  setOccupationId={(value) => setValue("occupationId", value)}
                  error={errors.occupationId}
                  defaultOccupationId={userById.data?.occupationId ?? ""}
                />
                <ButtonContainer>
                  <Button asChild variant="outline">
                    <Link href="/users">Back to users</Link>
                  </Button>
                  <Button
                    variant="default"
                    type="submit"
                    className="flex items-center space-x-1 bg-teal-500 hover:bg-teal-600"
                  >
                    {updateUser.isPending ? "Updating..." : "Update User"}
                  </Button>
                </ButtonContainer>
                {updateUser.isError && <p className="text-red-400 text-sm">{updateUser.error?.message}</p>}
              </FormContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
