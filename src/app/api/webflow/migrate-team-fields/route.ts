import { NextResponse } from "next/server";

const WEBFLOW_API_TOKEN = "91068beafa44f0f4442c67a2c75b94f472be033015abdd7a82fa6bdec225d1b2";
const TEAM_COLLECTION = "68fd63e9503df62b019b5c9e";

const FIELDS_TO_ADD = [
  { name: "qualifications", displayName: "Qualifications", type: "RichText" as const, helpText: "Academic qualifications and degrees" },
  { name: "languages", displayName: "Languages", type: "RichText" as const, helpText: "Languages spoken" },
  { name: "hobbies", displayName: "Hobbies", type: "RichText" as const, helpText: "Personal hobbies and interests" },
];

const TEAM_DATA: Record<string, { qualifications: string; languages: string; hobbies: string }> = {
  "bassel-fayad": {
    qualifications: "MBA in International Business Development\nBA in Business Administration",
    languages: "Arabic (Native), English (Fluent), Turkish (Conversational)",
    hobbies: "Traveling, reading about global education trends, networking with university professionals",
  },
  "ahmed-mansour": {
    qualifications: "BSc in Business Administration\nCertified Project Management Professional (PMP)",
    languages: "Arabic (Native), English (Fluent)",
    hobbies: "Chess, technology, fitness, exploring new cultures",
  },
  "layla-karim": {
    qualifications: "MA in Educational Counseling\nBA in Psychology\nCertified Academic Advisor (CAA)",
    languages: "Arabic (Native), English (Fluent), French (Intermediate)",
    hobbies: "Reading, creative writing, mentoring students, attending education conferences",
  },
  "omar-haddad": {
    qualifications: "MA in Applied Linguistics\nCELTA Certified\nBA in English Language and Literature",
    languages: "Arabic (Native), English (Fluent), German (Intermediate), Turkish (Basic)",
    hobbies: "Language learning, podcasting, football, cooking international cuisine",
  },
};

async function webflowFetch(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
      "Content-Type": "application/json",
      accept: "application/json",
      ...options.headers,
    },
  });
}

export async function POST() {
  if (!WEBFLOW_API_TOKEN) {
    return NextResponse.json({ error: "WEBFLOW_API_TOKEN not configured" }, { status: 500 });
  }

  const results: Record<string, unknown> = {};

  try {
    // Step 1: Get current collection fields
    const schemaRes = await webflowFetch(
      `https://api.webflow.com/v2/collections/${TEAM_COLLECTION}`
    );
    if (!schemaRes.ok) {
      return NextResponse.json({ error: `Failed to get collection: ${schemaRes.status}` }, { status: 500 });
    }
    const schema = await schemaRes.json();
    const existingFields = new Set((schema.fields || []).map((f: { slug: string }) => f.slug));

    // Step 2: Add missing fields
    const addedFields: string[] = [];
    for (const field of FIELDS_TO_ADD) {
      if (existingFields.has(field.name)) {
        addedFields.push(`${field.name} (already exists)`);
        continue;
      }

      const addRes = await webflowFetch(
        `https://api.webflow.com/v2/collections/${TEAM_COLLECTION}/fields`,
        {
          method: "POST",
          body: JSON.stringify(field),
        }
      );

      if (addRes.ok) {
        addedFields.push(`${field.name} (added)`);
      } else {
        const errText = await addRes.text();
        addedFields.push(`${field.name} (error: ${errText})`);
      }
    }
    results.fields = addedFields;

    // Step 3: Get all team items
    const itemsRes = await webflowFetch(
      `https://api.webflow.com/v2/collections/${TEAM_COLLECTION}/items`
    );
    if (!itemsRes.ok) {
      return NextResponse.json({ error: `Failed to get items: ${itemsRes.status}` }, { status: 500 });
    }
    const itemsData = await itemsRes.json();
    const items = itemsData.items || [];

    // Step 4: Update each team member with data
    const updated: string[] = [];
    const skipped: string[] = [];

    for (const item of items) {
      const fd = item.fieldData as Record<string, unknown>;
      const slug = (fd["slug"] as string) || "";
      const data = TEAM_DATA[slug];

      if (!data) {
        skipped.push(`${fd["name"] || slug} (no data mapped)`);
        continue;
      }

      // Webflow v2 RichText fields accept plain strings on update
      const updateRes = await webflowFetch(
        `https://api.webflow.com/v2/collections/${TEAM_COLLECTION}/items/${item.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            fieldData: {
              qualifications: data.qualifications,
              languages: data.languages,
              hobbies: data.hobbies,
            },
          }),
        }
      );

      if (updateRes.ok) {
        updated.push(fd["name"] || slug);
      } else {
        const errText = await updateRes.text();
        skipped.push(`${fd["name"] || slug} (update error: ${errText})`);
      }
    }

    results.updatedMembers = updated;
    results.skippedMembers = skipped;

    // Step 5: Publish items
    try {
      const pubRes = await webflowFetch(
        `https://api.webflow.com/v2/collections/${TEAM_COLLECTION}/items/publish`,
        { method: "POST", body: JSON.stringify({ itemIds: items.map((i: { id: string }) => i.id) }) }
      );
      results.published = pubRes.ok;
    } catch {
      results.published = false;
    }

    return NextResponse.json({ success: true, ...results });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}