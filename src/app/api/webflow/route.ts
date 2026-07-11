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

// TEMPORARY: Remove after running once
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action !== "sync-team-bios" && action !== "fix-bassel") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  // Team bios scraped from original site JSON-LD
  const teamData: Record<string, { bio: string; "bio-summary": string; "job-title": string }> = {
    "Bassel Fayad": {
      "job-title": "General Director",
      "bio-summary": "With a vision to redefine the study abroad experience, Basel brings a modern approach to academic consulting. Known for his leadership and strategic mindset, he ensures every student journey with Uni Station is guided by clarity, innovation, and trust.",
      "bio": "<p>With a vision to redefine the study abroad experience, Basel brings a modern approach to academic consulting. Known for his leadership and strategic mindset, he ensures every student journey with Uni Station is guided by clarity, innovation, and trust. His passion lies in building bridges between ambition and opportunity.</p>",
    },
    "Ahmed Mansour": {
      "job-title": "Operations Manager & Team Lead",
      "bio-summary": "Ahmed combines precision with empathy. As the backbone of the operations team, he ensures every application, consultation, and process runs smoothly.",
      "bio": "<p>Ahmed combines precision with empathy. As the backbone of the operations team, he ensures every application, consultation, and process runs smoothly. His ability to connect with students and staff alike makes him the perfect link between vision and execution.</p>",
    },
    "Layla Karim": {
      "job-title": "Academic Advisor",
      "bio-summary": "Layla specializes in guiding students through complex admission pathways. With over eight years in academic counseling, she has helped countless students gain entry to top universities worldwide.",
      "bio": "<p>Layla specializes in guiding students through complex admission pathways. With over eight years in academic counseling, she has helped countless students gain entry to top universities worldwide. Her approach blends structure with inspiration, empowering students to aim higher. Layla stays constantly updated on admission requirements, scholarship opportunities, and program changes across universities in multiple countries, ensuring her students always receive the most current and relevant advice.</p>",
    },
    "Omar Haddad": {
      "job-title": "Language Program Coordinator",
      "bio-summary": "Omar oversees UniStation language preparation programs, ensuring students master English, German, Turkish, or Spanish before their journey abroad.",
      "bio": "<p>Omar oversees UniStation language preparation programs, ensuring students master English, German, Turkish, or Spanish before their journey abroad. His background in linguistics and education technology brings a modern, engaging edge to traditional language learning. Omar has designed curricula that combine proven teaching methodologies with digital tools, creating an interactive learning experience that prepares students not just for exams, but for real academic environments.</p>",
    },
  };

  // Fetch current team items
  const items = await fetchWebflowItems(TEAM_COLLECTION);
  const results: { name: string; success: boolean; error?: string; raw?: unknown }[] = [];

  for (const item of items) {
    const fd = item.fieldData as Record<string, unknown>;
    const name = (fd["name"] as string) || "";
    const data = teamData[name];

    // If action is fix-bassel, only process Bassel
    if (action === "fix-bassel" && !name.includes("Bassel")) continue;

    if (!data) {
      results.push({ name, success: false, error: "No data found for this member" });
      continue;
    }

    try {
      const patchRes = await fetch(
        `https://api.webflow.com/v2/collections/${TEAM_COLLECTION}/items/${item.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            fieldData: {
              "job-title": data["job-title"],
              "bio-summary": data["bio-summary"],
              bio: data["bio"],
            },
          }),
        }
      );

      const raw = await patchRes.json();

      if (!patchRes.ok) {
        results.push({ name, success: false, error: `API ${patchRes.status}`, raw });
      } else {
        results.push({ name, success: true, raw });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({ name, success: false, error: message });
    }
  }

  // Publish the changes
  try {
    const siteId = "68fd63e9503df62b019b5c75";
    const targetIds = items
      .filter((i) => {
        const fd = i.fieldData as Record<string, unknown>;
        const name = (fd["name"] as string) || "";
        return action === "fix-bassel" ? name.includes("Bassel") : !!teamData[name];
      })
      .map((i) => i.id);

    // Try v2 collection-level publish with ids field
    const pubRes = await fetch(
      `https://api.webflow.com/v2/sites/${siteId}/collections/${TEAM_COLLECTION}/items/publish`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ ids: targetIds }),
      }
    );
    const pubData = await pubRes.json();
    results.push({ name: "PUBLISH", success: pubRes.ok, raw: pubData } as never);
  } catch {
    results.push({ name: "PUBLISH", success: false, error: "Failed to publish" });
  }

  return NextResponse.json({ results });
}