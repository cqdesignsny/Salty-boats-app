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
    const result = await createContactLead({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      message: message.trim(),
      source: "Contact Form",
    });

    console.log("Contact lead saved to Notion:", email, result.id);
    return NextResponse.json({ success: true, notionPageId: result.id });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Contact form error:", errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
