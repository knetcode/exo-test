import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { FieldError } from "react-hook-form";
import { Loading } from "./loading";

type Props = {
  defaultOccupationId?: string;
  setOccupationId: (value: string) => void;
  error?: FieldError;
};

export function OccupationField({ defaultOccupationId, setOccupationId, error }: Readonly<Props>) {
  const trpc = useTRPC();
  const occupationList = useQuery(trpc.occupations.list.queryOptions());

  if (occupationList.isLoading) {
    return <Loading size="sm" text="Loading occupations..." />;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-teal-500" htmlFor="occupation">
        Occupation
      </label>
      <Select defaultValue={defaultOccupationId} onValueChange={setOccupationId}>
        <SelectTrigger className="w-full border-border/50 focus:border-teal-500 focus:ring-teal-500">
          <SelectValue placeholder="Select an occupation" />
        </SelectTrigger>
        <SelectContent defaultValue={defaultOccupationId}>
          {occupationList.data?.map((occupation) => (
            <SelectItem key={occupation.id} value={occupation.id}>
              {occupation.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
}
