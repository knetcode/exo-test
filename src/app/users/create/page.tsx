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
    <div className="max-w-4xl mx-auto">
      <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-teal-500 mb-4 sm:mb-6 md:mb-8">Create User</h1>
        <p className="text-center text-muted-foreground">Add a new user to the system</p>

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
                  defaultOccupationId=""
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
                    {createUser.isPending ? "Creating..." : "Submit"}
                  </Button>
                </ButtonContainer>
                {createUser.isError && <p className="text-red-400 text-sm">{createUser.error?.message}</p>}
              </FormContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
