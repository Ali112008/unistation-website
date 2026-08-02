import { NextResponse } from "next/server";
import cloudinary, { getPublicId } from "@/lib/cloudinary";

/** Upload an image to Cloudinary */
export async function POST(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== 'unistation2024') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "unistation";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64 data URI
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataUri,
        { folder, transformation: [{ quality: "auto", fetch_format: "auto" }] },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** Delete an image from Cloudinary by URL */
export async function DELETE(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== 'unistation2024') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");
    if (!imageUrl || !imageUrl.includes("cloudinary.com")) {
      return NextResponse.json({ success: true }); // not a cloudinary image, nothing to do
    }

    const publicId = getPublicId(imageUrl);
    if (!publicId) {
      return NextResponse.json({ success: true });
    }

    await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ success: true, deleted: publicId });
  } catch (error: any) {
    console.error("Delete image error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
