import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
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
        itemId: metadata.item_id,
        buildOrderId: metadata.build_order_id,
        amountTotal: session.amount_total,
        customerEmail: session.customer_details?.email,
      });

      // TODO: Update order status in Supabase
      // TODO: Send confirmation email via Resend
      // if (metadata.order_type === 'inventory') {
      //   await supabase.from('inventory_orders').update({ deposit_paid: true }).eq('item_id', metadata.item_id);
      // } else if (metadata.order_type === 'build') {
      //   await supabase.from('build_orders').update({ deposit_paid: true, status: 'deposit_paid' }).eq('id', metadata.build_order_id);
      // }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
