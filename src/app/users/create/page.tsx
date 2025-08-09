"use client";

import { userFormSchema, UserFormSchema } from "@/db/users/schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/trpc";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const createUser = useMutation(trpc.users.create.mutationOptions());

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
          router.push("/users");
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-start justify-start">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input className="max-w-80 border-2 border-slate-300" {...register("firstName")} placeholder="First Name" />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input className="max-w-80 border-2 border-slate-300" {...register("lastName")} placeholder="Last Name" />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="idNumber">ID Number</label>
          <input
            className="max-w-80 border-2 border-slate-300"
            {...register("idNumber")}
            placeholder="ID Number"
            onBlur={(e) => onIdBlur(e)}
          />
          {errors.idNumber && <p>{errors.idNumber.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type="date" className="max-w-80 border-2 border-slate-300" {...register("dateOfBirth")} />
          {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="occupation">Occupation</label>
          <input className="max-w-80 border-2 border-slate-300" {...register("occupation")} placeholder="Occupation" />
          {errors.occupation && <p>{errors.occupation.message}</p>}
        </div>
        <button type="submit" disabled={createUser.isPending}>
          {createUser.isPending ? "Creating..." : "Submit"}
        </button>
      </form>
      {createUser.isError && <p>{createUser.error.message}</p>}
    </div>
  );
}
