"use client";

import { Button } from "@/components/ui/button";
import { File, Download, Trash2, Eye } from "lucide-react";
import { useTRPC } from "@/trpc/trpc";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loading } from "./loading";

type Props = {
  doc: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    size: number;
    contentType: string;
    key: string;
    url: string;
  };
};

export function DocumentItem({ doc }: Readonly<Props>) {
  const trpc = useTRPC();
  const deleteMutation = useMutation(trpc.documents.delete.mutationOptions());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  async function handleDelete(id: string) {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!documentToDelete) return;

    try {
      await deleteMutation.mutateAsync(documentToDelete);
      toast.success("Document deleted successfully!");
      queryClient.invalidateQueries(trpc.documents.list.queryOptions());
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    } catch (error) {
      toast.error(`Delete failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  function handleDownload(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  if (deleteMutation.isPending) return <Loading text="Deleting document..." />;

  return (
    <>
      <div
        key={doc.id}
        className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex md:items-center items-start justify-between md:flex-row flex-col">
          <div className="flex items-center gap-2 sm:gap-3">
            <File className="h-6 w-6 sm:h-8 sm:w-8 text-teal-500" />
            <div>
              <p className="font-medium text-foreground">{doc.name}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatFileSize(doc.size)} • {doc.contentType}
              </p>
              <p className="text-xs text-muted-foreground">Uploaded {new Date(doc.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-4 sm:mt-4 md:mt-0 md:justify-end justify-between w-full">
            <Link href={`/documents/${doc.id}`}>
              <Button variant="default" size="sm" className="flex items-center space-x-1 bg-teal-500 hover:bg-teal-600">
                <Eye className="h-4 w-4" />
                View
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDownload(doc.url, doc.name)}
              className="flex items-center space-x-1 border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(doc.id)}
              className="flex items-center space-x-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" size="sm" className="flex items-center space-x-1" asChild>
              <AlertDialogAction onClick={confirmDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                <span>Delete Document</span>
              </AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
