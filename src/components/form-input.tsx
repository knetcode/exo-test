import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  placeholder: string;
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
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Input
        type={type}
        {...register}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
