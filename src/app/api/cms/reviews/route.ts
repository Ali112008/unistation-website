import { NextResponse } from "next/server";
import client from "@/lib/turso";

/** GET all reviews */
export async function GET() {
  try {
    const result = await client.execute("SELECT * FROM reviews ORDER BY created_on DESC");
    const reviews = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      text: row.text,
      rating: Number(row.rating) || 5,
      source: row.source || "Google",
      university: row.university,
      photo: row.photo,
      country: row.country || "",
      program: row.program || "",
      createdOn: row.created_on,
    }));
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("GET /api/cms/reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** POST - create new review */
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
      sql: `INSERT INTO reviews (id, name, text, rating, source, university, photo, country, program, created_on)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        body.name || '',
        body.text || '',
        body.rating || 5,
        body.source || 'Google',
        body.university || '',
        body.photo || '',
        body.country || '',
        body.program || '',
        now,
      ],
    });

    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error("POST /api/cms/reviews error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** PUT - update a review */
export async function PUT(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== 'unistation2024') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await client.execute({
      sql: `UPDATE reviews SET name=?, text=?, rating=?, source=?, university=?, photo=?, country=?, program=? WHERE id=?`,
      args: [body.name || '', body.text || '', body.rating || 5, body.source || 'Google', body.university || '', body.photo || '', body.country || '', body.program || '', body.id],
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/cms/reviews error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** DELETE - remove a review */
export async function DELETE(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== 'unistation2024') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await client.execute({ sql: "DELETE FROM reviews WHERE id = ?", args: [id] });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/cms/reviews error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
