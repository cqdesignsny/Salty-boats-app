import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const BUILD_QUOTES_DB = process.env.NOTION_BUILD_QUOTES_DB!;
const CONTACT_LEADS_DB = process.env.NOTION_CONTACT_LEADS_DB!;

// ─── Build Quote → Notion ───────────────────────────────────────────────────

interface BuildQuoteData {
  customerName: string;
  email: string;
  phone?: string;
  brand: string;
  model: string;
  hullColor: string;
  equipment: string;
  motor: string;
  trailer: string;
  deliveryType: "Pickup" | "Delivery";
  estimatedTotal: number;
  depositStatus?: "Unpaid" | "Paid" | "Refunded";
  stripeSessionId?: string;
}

export async function createBuildQuote(data: BuildQuoteData) {
  return notion.pages.create({
    parent: { database_id: BUILD_QUOTES_DB },
    properties: {
      "Customer Name": { title: [{ text: { content: data.customerName } }] },
      Email: { email: data.email },
      Phone: { phone_number: data.phone || null },
      Brand: { select: { name: data.brand } },
      Model: { rich_text: [{ text: { content: data.model } }] },
      "Hull Color": { rich_text: [{ text: { content: data.hullColor } }] },
      Equipment: { rich_text: [{ text: { content: data.equipment } }] },
      Motor: { rich_text: [{ text: { content: data.motor } }] },
      Trailer: { rich_text: [{ text: { content: data.trailer } }] },
      "Delivery Type": { select: { name: data.deliveryType } },
      "Estimated Total": { number: data.estimatedTotal },
      "Deposit Status": {
        select: { name: data.depositStatus || "Unpaid" },
      },
      "Stripe Session ID": {
        rich_text: [
          { text: { content: data.stripeSessionId || "" } },
        ],
      },
    },
  });
}

// Update deposit status after Stripe payment
export async function updateBuildQuoteDeposit(
  stripeSessionId: string,
  status: "Paid" | "Refunded"
) {
  // Search for the page with this Stripe session ID using the search API
  const response = await notion.search({
    query: stripeSessionId,
    filter: { property: "object", value: "page" },
  });

  // Find the matching page in our build quotes database
  const page = response.results.find(
    (r) =>
      "parent" in r &&
      r.parent &&
      "database_id" in r.parent &&
      r.parent.database_id.replace(/-/g, "") === BUILD_QUOTES_DB.replace(/-/g, "")
  );

  if (page) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Deposit Status": { select: { name: status } },
      },
    });
  }
}

// ─── Contact Lead → Notion ──────────────────────────────────────────────────

interface ContactLeadData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: "Contact Form" | "Quote Request" | "Phone Call" | "Other";
}

export async function createContactLead(data: ContactLeadData) {
  return notion.pages.create({
    parent: { database_id: CONTACT_LEADS_DB },
    properties: {
      Name: { title: [{ text: { content: data.name } }] },
      Email: { email: data.email },
      Phone: { phone_number: data.phone || null },
      Message: { rich_text: [{ text: { content: data.message } }] },
      Source: { select: { name: data.source || "Contact Form" } },
      Status: { select: { name: "New" } },
    },
  });
}
