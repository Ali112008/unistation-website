import { NextResponse } from "next/server";

const WEBFLOW_API_TOKEN = "91068beafa44f0f4442c67a2c75b94f472be033015abdd7a82fa6bdec225d1b2";
const SUBSCRIBERS_COLLECTION = "6a5324390913a4368a5117a1";

// In-memory fallback cache (in case Webflow is temporarily down)
const localCache: string[] = new Set<string>();

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

    if (localCache.has(normalized)) {
      return NextResponse.json(
        { message: "Already subscribed." },
        { status: 200 }
      );
    }

    // Save to Webflow CMS for persistence
    try {
      const res = await fetch(
        `https://api.webflow.com/v2/collections/${SUBSCRIBERS_COLLECTION}/items`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            fieldData: {
              name: normalized,
              slug: normalized.replace(/[@.]/g, "-").slice(0, 250),
              email: normalized,
              "subscribed-on": new Date().toISOString().split("T")[0],
              source: "website-footer",
            },
          }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        // If duplicate (409 or already exists), that's fine
        if (res.status === 409 || errText.includes("already exists") || errText.includes("unique")) {
          console.log(`[Newsletter] Already in CMS: ${normalized}`);
        } else {
          console.error(`[Newsletter] Webflow API error: ${res.status} ${errText}`);
          // Fallback to local only
          localCache.add(normalized);
          return NextResponse.json(
            { message: "Subscribed successfully." },
            { status: 200 }
          );
        }
      }
    } catch (wfErr) {
      console.error(`[Newsletter] Webflow save failed, using local:`, wfErr);
    }

    // Always add to local cache as well
    localCache.add(normalized);

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