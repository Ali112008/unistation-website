import { NextResponse } from "next/server";

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN!;
const BLOG_COLLECTION = "6a51d3b689432b9105b65065";
const VIDEO_COLLECTION = "6a51d3c85a1355ad6711662d";

interface WebflowImage {
  fileId: string;
  url: string;
  alt: string | null;
}

interface WebflowItem {
  id: string;
  fieldData: {
    name?: string;
    slug?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    author?: string;
    featured?: boolean;
    "cover-image"?: WebflowImage;
    "thumbnail"?: WebflowImage;
    description?: string;
    "youtube-url"?: string;
    category?: string;
    "created-on"?: string;
    "updated-on"?: string;
  };
  createdOn: string;
  updatedOn: string;
}

async function fetchWebflowItems(collectionId: string): Promise<WebflowItem[]> {
  const res = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items`,
    {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
        accept: "application/json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error(`Webflow API error: ${res.status} ${await res.text()}`);
    return [];
  }

  const data = await res.json();
  return data.items || [];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "blogs";

  if (type === "videos") {
    const items = await fetchWebflowItems(VIDEO_COLLECTION);
    const videos = items.map((item) => ({
      id: item.id,
      title: item.fieldData.name || item.fieldData.title || "",
      description: item.fieldData.description || item.fieldData.excerpt || "",
      youtubeUrl: item.fieldData["youtube-url"] || "",
      thumbnail: item.fieldData.thumbnail?.url || "",
      category: item.fieldData.category || "",
      createdOn: item.createdOn,
    }));
    return NextResponse.json({ videos });
  }

  // Default: blogs
  const items = await fetchWebflowItems(BLOG_COLLECTION);
  const blogs = items
    .map((item) => ({
      id: item.id,
      title: item.fieldData.name || item.fieldData.title || "",
      slug: item.fieldData.slug || "",
      excerpt: item.fieldData.excerpt || "",
      content: item.fieldData.content || "",
      author: item.fieldData.author || "UniStation Team",
      featured: item.fieldData.featured || false,
      coverImage: item.fieldData["cover-image"]?.url || "",
      createdOn: item.createdOn,
      updatedOn: item.updatedOn,
    }))
    .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());

  return NextResponse.json({ blogs });
}