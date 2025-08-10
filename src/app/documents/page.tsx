import { DocumentList } from "@/components/document-list";
import { DocumentUploader } from "@/components/document-uploader";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-teal-500 text-center mb-4">PDF Uploader</h1>
      <DocumentUploader />
      <DocumentList />
    </div>
  );
}
