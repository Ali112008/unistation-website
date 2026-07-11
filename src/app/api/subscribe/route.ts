import { NextResponse } from "next/server";

// In-memory store for newsletter subscriptions (resets on redeploy).
// TODO: Replace with Webflow CMS, Mailchimp, Brevo, or any email service.
const subscribers: string[] = [];

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

    if (subscribers.includes(normalized)) {
      return NextResponse.json(
        { message: "Already subscribed." },
        { status: 200 }
      );
    }

    subscribers.push(normalized);

    // Log so you can see subscriptions in server console
    console.log(`[Newsletter] New subscriber: ${normalized} (Total: ${subscribers.length})`);

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