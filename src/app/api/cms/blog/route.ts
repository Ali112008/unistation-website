import { NextResponse } from "next/server";
import client from "@/lib/turso";

/** GET all blog posts */
export async function GET() {
  try {
    const result = await client.execute("SELECT * FROM blog_posts ORDER BY created_on DESC");
    const blogs = result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      featured: Boolean(row.featured),
      coverImage: row.cover_image,
      tags: row.tags,
      createdOn: row.created_on,
      updatedOn: row.updated_on,
    }));
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET /api/cms/blog error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** POST - create new blog post */
export async function POST(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await client.execute({
      sql: `INSERT INTO blog_posts (id, slug, title, excerpt, content, author, featured, cover_image, tags, created_on, updated_on)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        body.slug || body.title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-').slice(0, 200),
        body.title || '',
        body.excerpt || '',
        body.content || '',
        body.author || 'UniStation Team',
        body.featured ? 1 : 0,
        body.coverImage || '',
        body.tags || '',
        now,
        now,
      ],
    });

    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error("POST /api/cms/blog error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** PUT - update a blog post */
export async function PUT(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const now = new Date().toISOString();
    await client.execute({
      sql: `UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, author=?, featured=?, cover_image=?, tags=?, updated_on=? WHERE id=?`,
      args: [
        body.title || '',
        body.slug || '',
        body.excerpt || '',
        body.content || '',
        body.author || 'UniStation Team',
        body.featured ? 1 : 0,
        body.coverImage || '',
        body.tags || '',
        now,
        body.id,
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/cms/blog error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** DELETE - remove a blog post */
export async function DELETE(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await client.execute({ sql: "DELETE FROM blog_posts WHERE id = ?", args: [id] });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/cms/blog error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
