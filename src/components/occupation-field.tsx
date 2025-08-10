import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTRPC } from "@/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { FieldError } from "react-hook-form";

type Props = {
  defaultOccupationId?: string;
  setOccupationId: (value: string) => void;
  error?: FieldError;
};

export function OccupationField({ defaultOccupationId, setOccupationId, error }: Readonly<Props>) {
  const trpc = useTRPC();
  const occupationList = useQuery(trpc.occupations.list.queryOptions());

  if (occupationList.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="occupation">Occupation</label>
      <Select defaultValue={defaultOccupationId} onValueChange={setOccupationId}>
        <SelectTrigger className="w-full">
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
      {error && <p>{error.message}</p>}
    </div>
  );
}
