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

// TEMPORARY: Seed videos into CMS — remove after use
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action !== "seed-videos") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const videos = [
    {
      name: "How to Choose Your University Major from Over 5000 Options!",
      slug: "how-to-choose-university-major",
      description: "Confused about which university major to pick? In this video, we break down the process of choosing the right specialization from among more than 5,000 options available worldwide. Perfect for students planning to study abroad.",
      "youtube-url": "https://www.youtube.com/watch?v=UV5B51SAt10",
      category: "Guidance",
    },
    {
      name: "Study Abroad Tips – Quick Insight",
      slug: "study-abroad-tips-short-1",
      description: "A quick tip for students planning to study abroad. Follow UniStation for more guidance on international education.",
      "youtube-url": "https://www.youtube.com/shorts/54kLL3iKWDM",
      category: "Tips",
    },
    {
      name: "University Life – Quick Insight",
      slug: "university-life-short-1",
      description: "A glimpse into university life for international students. More content coming soon on the UniStation channel.",
      "youtube-url": "https://www.youtube.com/shorts/9op99vXgE4I",
      category: "Student Life",
    },
    {
      name: "Study Abroad – Student Perspective",
      slug: "student-perspective-short-1",
      description: "Hear from students who have gone through the study abroad journey with UniStation's guidance and support.",
      "youtube-url": "https://www.youtube.com/shorts/JccluO-ayZs",
      category: "Student Life",
    },
    {
      name: "UniStation – Quick Update",
      slug: "unistation-update-short-1",
      description: "A quick update from UniStation about our services and latest opportunities for students looking to study abroad.",
      "youtube-url": "https://www.youtube.com/shorts/hrSojoMqJzU",
      category: "Updates",
    },
    {
      name: "Education Insight – Quick Tip",
      slug: "education-insight-short-1",
      description: "A helpful insight about international education and university admissions from the UniStation team.",
      "youtube-url": "https://www.youtube.com/shorts/jRX6vG2rQPE",
      category: "Tips",
    },
  ];

  const results: { name: string; success: boolean; id?: string; error?: string }[] = [];

  for (const video of videos) {
    try {
      const res = await fetch(
        `https://api.webflow.com/v2/collections/${VIDEO_COLLECTION}/items`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            fieldData: video,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        results.push({ name: video.name, success: true, id: data.id });
      } else {
        const errText = await res.text();
        results.push({ name: video.name, success: false, error: `${res.status}: ${errText}` });
      }
    } catch (e: unknown) {
      results.push({ name: video.name, success: false, error: (e as Error).message });
    }
  }

  return NextResponse.json({ seeded: results });
}