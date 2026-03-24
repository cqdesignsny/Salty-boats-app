import { NextResponse } from "next/server";
import { createContactLead } from "@/lib/notion";
import { sendContactLeadNotification } from "@/lib/email";

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

    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      message: message.trim(),
    };

    // Push to Notion
    const result = await createContactLead({
      ...trimmedData,
      source: "Contact Form",
    });
    console.log("Contact lead saved to Notion:", email, result.id);

    // Send email notification
    try {
      await sendContactLeadNotification(trimmedData);
      console.log("Contact notification email sent for:", email);
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
    }

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
