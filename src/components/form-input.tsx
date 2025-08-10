import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister, FieldValues } from "react-hook-form";
import { Label } from "./ui/label";

type Props<T extends FieldValues> = {
  label: string;
  placeholder?: string;
  type: string;
  defaultValue?: string;
  error?: FieldError;
  register: ReturnType<UseFormRegister<T>>;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export function FormInput<T extends FieldValues>({
  label,
  placeholder,
  type,
  defaultValue,
  error,
  register,
  disabled = false,
  onBlur,
}: Readonly<Props<T>>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={label} className="text-sm font-medium text-teal-500">
        {label}
      </Label>
      <Input
        type={type}
        {...register}
        placeholder={placeholder ?? ""}
        defaultValue={defaultValue}
        disabled={disabled}
        onBlur={onBlur}
        className="border-border/50 focus:border-teal-500 focus:ring-teal-500"
      />
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
}
