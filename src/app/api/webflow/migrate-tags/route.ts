import { NextResponse } from "next/server";

const WEBFLOW_API_TOKEN = "91068beafa44f0f4442c67a2c75b94f472be033015abdd7a82fa6bdec225d1b2";
const BLOG_COLLECTION = "6a51d3b689432b9105b65065";
const VIDEO_COLLECTION = "6a51d3c85a1355ad6711662d";

/**
 * One-time migration: adds a "tags" PlainText field to
 * the Blogs and Videos Webflow CMS collections.
 *
 * The client can then type comma-separated tags in the CMS
 * (e.g. "spain, europe, visa") and the frontend LibrarySection
 * will filter content accordingly.
 */

async function addTagsField(collectionId: string, collectionName: string) {
  const res = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/fields`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        displayName: "Tags",
        name: "tags",
        slug: "tags",
        type: "PlainText",
        helpText:
          "Comma-separated tags for filtering (e.g. spain, europe, visa). Used by the website to show content on relevant pages.",
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error(
      `Failed to add tags field to ${collectionName}: ${res.status} ${errText}`
    );
    return { success: false, error: `${res.status}: ${errText}` };
  }

  const data = await res.json();
  console.log(`Added tags field to ${collectionName}:`, data.id);
  return { success: true, fieldId: data.id };
}

export async function GET() {
  if (!WEBFLOW_API_TOKEN) {
    return NextResponse.json(
      { error: "WEBFLOW_API_TOKEN not configured" },
      { status: 500 }
    );
  }

  const results: Record<string, unknown> = {};

  // Add tags field to Blogs
  results.blogs = await addTagsField(BLOG_COLLECTION, "Blogs");

  // Add tags field to Videos
  results.videos = await addTagsField(VIDEO_COLLECTION, "Videos");

  return NextResponse.json({
    status: "completed",
    message:
      "Tags field added to both collections. The client can now add comma-separated tags in the CMS.",
    availableTags: {
      countries: [
        "spain", "germany", "turkey", "uk", "usa", "canada", "australia",
        "new-zealand", "italy", "finland", "czech-republic", "hungary",
        "poland", "malta", "cyprus", "georgia", "russia", "romania",
        "malaysia", "china", "ireland",
      ],
      languages: [
        "english", "german", "spanish", "turkish", "ielts", "toefl",
        "testdaf", "dsh", "goethe",
      ],
      exams: ["sat", "ucat", "gre", "gmat", "ib", "ap"],
      topics: [
        "visa", "scholarship", "application", "university", "medicine",
        "engineering", "business", "early-bird",
      ],
    },
    results,
  });
}