"use client";

import { Button } from "@/components/ui/button";
import { File, Download, Trash2, Eye } from "lucide-react";
import { useTRPC } from "@/trpc/trpc";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export function DocumentList() {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const documentList = useQuery(trpc.documents.list.queryOptions());
  const deleteMutation = useMutation(trpc.documents.delete.mutationOptions());

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success("Document deleted successfully!");
        queryClient.invalidateQueries(trpc.documents.list.queryOptions());
      } catch (error) {
        toast.error(`Delete failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      {documentList.data && documentList.data.length > 0 && (
        <div>
          {documentList.data?.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <File className="h-8 w-8 " />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm ">
                    {formatFileSize(doc.size)} • {doc.contentType}
                  </p>
                  <p className="text-xs ">Uploaded {new Date(doc.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/documents/${doc.id}`}>
                  <Button variant="default" size="sm" className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(doc.url, doc.name)}
                  className="flex items-center space-x-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(doc.id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
