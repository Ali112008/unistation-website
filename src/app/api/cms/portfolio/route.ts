import { NextResponse } from "next/server";
import client from "@/lib/turso";

/** GET all portfolio items */
export async function GET() {
  try {
    const result = await client.execute("SELECT * FROM portfolio ORDER BY sort_order ASC, created_on DESC");
    const items = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      country: row.country,
      curriculum: row.curriculum,
      program: row.program,
      university: row.university,
      destination: row.destination,
      image: row.image,
      featured: Number(row.featured) || 0,
      sortOrder: Number(row.sort_order) || 99,
      createdOn: row.created_on,
      updatedOn: row.updated_on,
    }));
    return NextResponse.json({ portfolio: items });
  } catch (error) {
    console.error("GET /api/cms/portfolio error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** POST - create new portfolio item */
export async function POST(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== "unistation2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await client.execute({
      sql: `INSERT INTO portfolio (id, name, country, curriculum, program, university, destination, image, featured, sort_order, created_on, updated_on)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        body.name || "",
        body.country || "",
        body.curriculum || "",
        body.program || "",
        body.university || "",
        body.destination || "",
        body.image || "",
        body.featured || 0,
        body.sortOrder ?? 99,
        now,
        now,
      ],
    });

    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error("POST /api/cms/portfolio error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** PUT - update a portfolio item */
export async function PUT(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== "unistation2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const now = new Date().toISOString();

    await client.execute({
      sql: `UPDATE portfolio SET name=?, country=?, curriculum=?, program=?, university=?, destination=?, image=?, featured=?, sort_order=?, updated_on=? WHERE id=?`,
      args: [
        body.name || "",
        body.country || "",
        body.curriculum || "",
        body.program || "",
        body.university || "",
        body.destination || "",
        body.image || "",
        body.featured || 0,
        body.sortOrder ?? 99,
        now,
        body.id,
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT /api/cms/portfolio error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** DELETE - remove a portfolio item */
export async function DELETE(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== "unistation2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await client.execute({ sql: "DELETE FROM portfolio WHERE id = ?", args: [id] });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/cms/portfolio error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
