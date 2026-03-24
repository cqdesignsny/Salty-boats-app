import { NextResponse } from "next/server";
import { createContactLead } from "@/lib/notion";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Push to Notion
    try {
      await createContactLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || undefined,
        message: message.trim(),
        source: "Contact Form",
      });
      console.log("Contact lead saved to Notion:", email);
      return NextResponse.json({ success: true });
    } catch (notionError: unknown) {
      const errMsg = notionError instanceof Error ? notionError.message : String(notionError);
      console.error("Failed to save contact to Notion:", errMsg);
      return NextResponse.json({ success: true, notionError: errMsg });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
