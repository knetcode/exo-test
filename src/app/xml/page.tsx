import { Info } from "lucide-react";
import { XMLList } from "@/components/xml-list";

export default function XMLPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-teal-500 mb-4 sm:mb-6 md:mb-8">XML Data</h1>
        <p className="text-center text-muted-foreground">View and explore XML dataset information</p>
        <div className="border-t border-border pt-4 sm:pt-6">
          <div className="bg-card border border-border/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Info className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" />
              <p>
                Wasn&apos;t too sure what the correct display of the data should be so I just went with my gut feel on
                how to display the data on the UI
              </p>
            </div>
          </div>
          <XMLList />
        </div>
      </div>
    </div>
  );
}
