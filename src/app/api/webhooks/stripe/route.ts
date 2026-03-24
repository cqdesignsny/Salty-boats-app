import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { updateBuildQuoteDeposit } from "@/lib/notion";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature." },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      console.log("Payment completed:", {
        sessionId: session.id,
        orderType: metadata.order_type,
        buildOrderId: metadata.build_order_id,
        amountTotal: session.amount_total,
        customerEmail: session.customer_details?.email,
      });

      // Update deposit status in Notion
      if (metadata.order_type === "build") {
        try {
          await updateBuildQuoteDeposit(session.id, "Paid");
          console.log("Notion deposit status updated to Paid:", session.id);
        } catch (notionError) {
          console.error("Failed to update Notion deposit status:", notionError);
        }
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
