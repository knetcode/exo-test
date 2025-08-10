import { DocumentList } from "@/components/document-list";
import { DocumentUploader } from "@/components/document-uploader";

export default function DocumentsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-teal-500 mb-4 sm:mb-6 md:mb-8">PDF Uploader</h1>
        <p className="text-center text-muted-foreground">Upload and manage your documents</p>

        <div className="border-t border-border pt-4 sm:pt-6 space-y-4 sm:space-y-6">
          <DocumentUploader />
          <DocumentList />
        </div>
      </div>
    </div>
  );
}
