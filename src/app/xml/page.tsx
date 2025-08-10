import { Info } from "lucide-react";
import { XMLList } from "@/components/xml-list";

export default function XMLPage() {
  return (
    <div className="space-y-6">
      <div className="text-md text-muted-foreground text-center underline flex items-center gap-2 justify-center">
        <Info />
        <p>
          Wasn&apos;t too sure what the correct display of the data should be so I just went with my gut feel on how to
          display the data on the UI
        </p>
      </div>
      <h1 className="text-2xl font-semibold text-teal-500 text-center mb-4">XML List</h1>
      <XMLList />
    </div>
  );
}
