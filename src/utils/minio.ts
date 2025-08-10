import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env";

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: env.MINIO_URL,
  credentials: {
    accessKeyId: env.MINIO_USER,
    secretAccessKey: env.MINIO_PASSWORD,
  },
  forcePathStyle: true,
});

const BUCKET_NAME = "documents";

export async function uploadFile(file: File, key?: string): Promise<{ url: string; key: string }> {
  try {
    const fileKey = key ?? `${Date.now()}-${file.name}`;
    const buffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    });

    try {
      await s3Client.send(command);

      const url = `${env.MINIO_URL}/${BUCKET_NAME}/${fileKey}`;

      return { url, key: fileKey };
    } catch (error) {
      console.error("Failed to upload file:", error);
      throw new Error("Failed to upload file");
    }
  } catch (error) {
    console.error("Failed to process file for upload:", error);
    throw new Error("Failed to process file for upload");
  }
}

export async function deleteFile(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("Failed to delete file:", error);
    throw new Error("Failed to delete file");
  }
}
