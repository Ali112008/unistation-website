import { NextResponse } from "next/server";

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN!;
const BLOG_COLLECTION = "6a51d3b689432b9105b65065";
const VIDEO_COLLECTION = "6a51d3c85a1355ad6711662d";
const TEAM_COLLECTION = "68fd63e9503df62b019b5c9e";

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
    tags?: string;
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

  if (type === "team") {
    const items = await fetchWebflowItems(TEAM_COLLECTION);
    const team = items.map((item) => {
      const fd = item.fieldData as Record<string, unknown>;
      const photo = fd["profile-picture"] as { url: string; alt: string | null } | undefined;

      // Extract plain text from Webflow rich text or use as-is
      const extractText = (val: unknown): string => {
        if (!val) return "";
        if (typeof val === "string") return val;
        if (typeof val === "object" && val !== null && "children" in (val as object)) {
          const rt = val as { children: Array<{ children: Array<{ text: string }> }>; type: string };
          return rt.children
            ?.map((block) => block.children?.map((c) => c.text).join("") || "")
            .join("\n") || "";
        }
        return String(val);
      };

      return {
        id: item.id,
        name: (fd["name"] as string) || "",
        slug: (fd["slug"] as string) || "",
        role: (fd["job-title"] as string) || "",
        bio: (fd["bio"] as string) || (fd["bio-summary"] as string) || "",
        image: photo?.url || "",
        email: (fd["email"] as string) || "",
        phone: (fd["phone-number"] as string) || "",
        twitter: (fd["twitter-link"] as string) || "",
        facebook: (fd["facebook-link"] as string) || "",
        qualifications: extractText(fd["qualifications"]),
        languages: extractText(fd["languages"]),
        hobbies: extractText(fd["hobbies"]),
      };
    });
    return NextResponse.json({ team });
  }

  if (type === "videos") {
    const items = await fetchWebflowItems(VIDEO_COLLECTION);
    const videos = items.map((item) => ({
      id: item.id,
      title: item.fieldData.name || item.fieldData.title || "",
      description: item.fieldData.description || item.fieldData.excerpt || "",
      youtubeUrl: item.fieldData["youtube-url"] || "",
      thumbnail: item.fieldData.thumbnail?.url || "",
      category: item.fieldData.category || "",
      tags: item.fieldData.tags || "",
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
      tags: item.fieldData.tags || "",
      createdOn: item.createdOn,
      updatedOn: item.updatedOn,
    }))
    .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());

  return NextResponse.json({ blogs });
}