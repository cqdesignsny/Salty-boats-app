import { NextResponse } from "next/server";
import { getStripe, DEPOSIT_AMOUNT } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderType, itemId, itemTitle, buildOrderId, buildSummary, customerEmail, customerName, customerPhone } = body;

    if (!orderType || !["inventory", "build"].includes(orderType)) {
      return NextResponse.json(
        { error: "Invalid order type." },
        { status: 400 }
      );
    }

    const lineItemName =
      orderType === "inventory"
        ? `Deposit: ${itemTitle || "Inventory Boat"}`
        : `Build Deposit: ${buildSummary || "Custom Boat Build"}`;

    const metadata: Record<string, string> = {
      order_type: orderType,
    };

    if (orderType === "inventory" && itemId) {
      metadata.item_id = itemId;
    }
    if (orderType === "build" && buildOrderId) {
      metadata.build_order_id = buildOrderId;
    }
    if (customerName) metadata.customer_name = customerName;
    if (customerPhone) metadata.customer_phone = customerPhone;

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: lineItemName,
              description:
                "Refundable $500 deposit to reserve your boat. Our team will contact you to arrange full payment and delivery.",
            },
            unit_amount: DEPOSIT_AMOUNT,
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${orderType === "inventory" ? `/inventory/${itemId}` : "/build-your-boat"}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
