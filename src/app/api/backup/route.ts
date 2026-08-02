import { NextResponse } from "next/server";
import client from "@/lib/turso";

/**
 * Manual backup trigger endpoint.
 * Call with: curl -H "x-admin-password: unistation2024" /api/backup
 * In production, set up a cron job (e.g., Vercel Cron) to call this daily.
 */
export async function GET(request: Request) {
  const adminPassword = request.headers.get("x-admin-password");
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const backup: Record<string, any[]> = {};
    const tables = ["blog_posts", "videos", "team_members", "reviews", "subscribers", "site_config"];

    for (const table of tables) {
      const result = await client.execute(`SELECT * FROM ${table}`);
      backup[table] = result.rows;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    
    return new NextResponse(JSON.stringify(backup, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="unistation-backup-${timestamp}.json"`,
      },
    });
  } catch (error) {
    console.error("Backup failed:", error);
    return NextResponse.json({ error: "Backup failed" }, { status: 500 });
  }
}
