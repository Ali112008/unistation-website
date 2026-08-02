import { NextResponse } from "next/server";
import client from "@/lib/turso";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "blogs";

  try {
    if (type === "team") {
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
    }

    if (type === "reviews") {
      const result = await client.execute("SELECT * FROM reviews ORDER BY created_on DESC");
      const reviews = result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        text: row.text,
        rating: Number(row.rating) || 5,
        source: row.source || "Google",
        university: row.university,
        photo: row.photo,
        createdOn: row.created_on,
      }));
      return NextResponse.json({ reviews });
    }

    if (type === "videos") {
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
      }));
      return NextResponse.json({ videos });
    }

    // Default: blogs
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
    console.error(`Turso query error for type "${type}":`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}