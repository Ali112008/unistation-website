import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== "unistation2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const url = formData.get("url") as string | null;

    if (url) {
      // Upload from URL
      const { uploadFromUrl } = await import("@/lib/cloudinary");
      const result = await uploadFromUrl(url, "unistation/reviews");
      return NextResponse.json({ url: result });
    }

    if (file) {
      // Upload from file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadImage(`data:${file.type};base64,${buffer.toString("base64")}`, "unistation/reviews");
      return NextResponse.json({ url: result });
    }

    return NextResponse.json({ error: "No file or URL provided" }, { status: 400 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== "unistation2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    const { deleteImage, getPublicId } = await import("@/lib/cloudinary");
    const publicId = getPublicId(url);
    if (publicId) {
      await deleteImage(publicId);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
