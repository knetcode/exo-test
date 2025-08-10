import { DocumentList } from "@/components/document-list";
import { DocumentUploader } from "@/components/document-uploader";

export default function DocumentsPage() {
  return (
    <div>
      <h1>Document Management</h1>
      <DocumentUploader />
      <DocumentList />
    </div>
  );
}
