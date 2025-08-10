"use client";

import { useTRPC } from "@/trpc/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Loading } from "./loading";

export function DocumentUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const uploadMutation = useMutation(trpc.documents.upload.mutationOptions());

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);

      try {
        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("file", file);

          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Upload failed: ${uploadResponse.statusText}`);
          }

          const uploadResult = await uploadResponse.json();

          if (uploadResult.success) {
            const result = await uploadMutation.mutateAsync(uploadResult.data, {
              onSuccess: () => {
                queryClient.invalidateQueries(trpc.documents.list.queryOptions());
              },
            });
            if (result) {
              toast.success(`File "${file.name}" uploaded successfully!`);
              queryClient.invalidateQueries(trpc.documents.list.queryOptions());
            }
          } else {
            throw new Error(uploadResult.error ?? "Upload failed");
          }
        }
      } catch (error) {
        toast.error(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadMutation, queryClient, trpc.documents.list]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: true,
  });

  return (
    <div className="bg-card border border-border/50 rounded-lg p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-teal-500 bg-teal-500/15" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 mb-4 text-teal-500" />
        {isDragActive ? (
          <p className="text-lg text-teal-600 font-medium">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2 font-medium">
              Drag & drop files here, or click to select a PDF to upload (max 2MB)
            </p>
            <p className="text-sm text-muted-foreground">Supports PDF files up to 2MB in size</p>
          </div>
        )}
        {isUploading && <Loading text="Uploading..." />}
      </div>
    </div>
  );
}
