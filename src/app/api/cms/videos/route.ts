import { NextResponse } from "next/server";
import client from "@/lib/turso";

/** GET all videos */
export async function GET() {
  try {
    const result = await client.execute("SELECT * FROM videos ORDER BY created_on DESC");
    const videos = result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      youtubeUrl: row.youtube_url,
      thumbnail: row.thumbnail,
      category: row.category,
      tags: row.tags,
      createdOn: row.created_on,
      updatedOn: row.updated_on,
    }));
    return NextResponse.json({ videos });
  } catch (error) {
    console.error("GET /api/cms/videos error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** POST - create new video */
export async function POST(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== 'unistation2024') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await client.execute({
      sql: `INSERT INTO videos (id, title, description, youtube_url, thumbnail, category, tags, created_on, updated_on)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        body.title || '',
        body.description || '',
        body.youtubeUrl || '',
        body.thumbnail || '',
        body.category || '',
        body.tags || '',
        now,
        now,
      ],
    });

    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error("POST /api/cms/videos error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** PUT - update a video */
export async function PUT(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== 'unistation2024') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const now = new Date().toISOString();
    await client.execute({
      sql: `UPDATE videos SET title=?, description=?, youtube_url=?, thumbnail=?, category=?, tags=?, updated_on=? WHERE id=?`,
      args: [body.title || '', body.description || '', body.youtubeUrl || '', body.thumbnail || '', body.category || '', body.tags || '', now, body.id],
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/cms/videos error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** DELETE - remove a video */
export async function DELETE(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== 'unistation2024') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await client.execute({ sql: "DELETE FROM videos WHERE id = ?", args: [id] });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/cms/videos error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
