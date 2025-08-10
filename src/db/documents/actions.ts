import { db } from "@/db";
import { documentsTable } from "./schema";
import { eq } from "drizzle-orm";
import { uploadFile, deleteFile } from "@/utils/minio";

export async function documentUpload(file: File) {
  try {
    const { url, key } = await uploadFile(file);

    const [document] = await db
      .insert(documentsTable)
      .values({
        name: file.name,
        url,
        key,
        size: file.size,
        contentType: file.type,
      })
      .returning();

    return document;
  } catch (error) {
    console.error("Failed to upload document:", error);
    throw new Error("Failed to upload document");
  }
}

export async function documentUploadMetadata(metadata: {
  name: string;
  size: number;
  contentType: string;
  key: string;
  url: string;
}) {
  try {
    const [document] = await db
      .insert(documentsTable)
      .values({
        name: metadata.name,
        url: metadata.url,
        key: metadata.key,
        size: metadata.size,
        contentType: metadata.contentType,
      })
      .returning();

    return document;
  } catch (error) {
    console.error("Failed to create document record:", error);
    throw new Error("Failed to create document record");
  }
}

export async function documentDelete(id: string) {
  try {
    const document = await documentById(id);
    if (!document) {
      throw new Error("Document not found");
    }

    await deleteFile(document.key);
    await db.delete(documentsTable).where(eq(documentsTable.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to delete document:", error);
    throw new Error("Failed to delete document");
  }
}

export async function documentById(id: string) {
  const [document] = await db.select().from(documentsTable).where(eq(documentsTable.id, id)).limit(1);

  return document;
}

export async function documentFindAll() {
  return await db.select().from(documentsTable).orderBy(documentsTable.createdAt);
}
