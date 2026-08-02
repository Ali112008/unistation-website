import { NextResponse } from "next/server";
import client from "@/lib/turso";

/** GET all team members */
export async function GET() {
  try {
    const result = await client.execute("SELECT * FROM team_members ORDER BY created_on DESC");
    const team = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      role: row.role,
      bio: row.bio,
      image: row.image,
      email: row.email,
      phone: row.phone,
      twitter: row.twitter,
      facebook: row.facebook,
      qualifications: row.qualifications,
      languages: row.languages,
      hobbies: row.hobbies,
    }));
    return NextResponse.json({ team });
  } catch (error) {
    console.error("GET /api/cms/team error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** POST - create new team member */
export async function POST(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const slug = body.slug || body.name.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');

    await client.execute({
      sql: `INSERT INTO team_members (id, slug, name, role, bio, image, email, phone, twitter, facebook, qualifications, languages, hobbies, created_on, updated_on)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, slug, body.name || '', body.role || '', body.bio || '', body.image || '', body.email || '', body.phone || '', body.twitter || '', body.facebook || '', body.qualifications || '', body.languages || '', body.hobbies || '', now, now],
    });

    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error("POST /api/cms/team error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** PUT - update team member */
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
      sql: `UPDATE team_members SET name=?, slug=?, role=?, bio=?, image=?, email=?, phone=?, twitter=?, facebook=?, qualifications=?, languages=?, hobbies=?, updated_on=? WHERE id=?`,
      args: [body.name || '', body.slug || '', body.role || '', body.bio || '', body.image || '', body.email || '', body.phone || '', body.twitter || '', body.facebook || '', body.qualifications || '', body.languages || '', body.hobbies || '', now, body.id],
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/cms/team error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** DELETE - remove team member */
export async function DELETE(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await client.execute({ sql: "DELETE FROM team_members WHERE id = ?", args: [id] });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/cms/team error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
