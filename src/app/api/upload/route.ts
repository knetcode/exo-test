import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/utils/minio";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const { url, key } = await uploadFile(file);

    return NextResponse.json({
      success: true,
      data: {
        name: file.name,
        size: file.size,
        contentType: file.type,
        key,
        url,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
