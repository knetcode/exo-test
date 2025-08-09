"use client";

import { userFormSchema, UserFormSchema } from "@/db/users/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/trpc";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateUserPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const createUser = useMutation(trpc.users.create.mutationOptions());
  const occupations = useQuery(trpc.occupations.list.queryOptions());
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  function onIdBlur(e: React.FocusEvent<HTMLInputElement>) {
    const idNumber = e.target.value;

    if (idNumber.length === 13 && /^\d{13}$/.test(idNumber)) {
      const yearDigits = idNumber.substring(0, 2);
      const month = idNumber.substring(2, 4);
      const day = idNumber.substring(4, 6);

      const currentYear = new Date().getFullYear();
      const currentCentury = Math.floor(currentYear / 100) * 100;
      const yearNum = parseInt(yearDigits);

      let fullYear;
      if (yearNum <= 30) {
        fullYear = currentCentury + yearNum;
      } else {
        fullYear = currentCentury - 100 + yearNum;
      }

      const formattedDate = `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

      setValue("dateOfBirth", formattedDate);
    }
  }

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-start justify-start">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <Input {...register("firstName")} placeholder="First Name" />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <Input {...register("lastName")} placeholder="Last Name" />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="idNumber">ID Number</label>
          <Input {...register("idNumber")} placeholder="ID Number" onBlur={(e) => onIdBlur(e)} />
          {errors.idNumber && <p>{errors.idNumber.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <Input type="date" {...register("dateOfBirth")} disabled />
          {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
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
          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? "Creating..." : "Submit"}
          </Button>
        </div>
      </form>
      {createUser.isError && <p>{createUser.error.message}</p>}
    </div>
  );
}
