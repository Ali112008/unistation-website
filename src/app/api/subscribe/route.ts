import { NextResponse } from "next/server";
import client from "@/lib/turso";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Save to Turso for persistence
    try {
      await client.execute({
        sql: `INSERT OR IGNORE INTO subscribers (email, subscribed_at) VALUES (?, ?)`,
        args: [normalized, new Date().toISOString()],
      });
    } catch (err) {
      console.error(`[Newsletter] DB save failed:`, err);
      // If it's a duplicate, that's fine
    }

    console.log(`[Newsletter] New subscriber: ${normalized}`);

    return NextResponse.json(
      { message: "Subscribed successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
