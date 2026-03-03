import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      brandSlug,
      modelId,
      hullColorId,
      selectedEquipment,
      trailerId,
      motorOption,
      deliveryType,
      deliveryAddress,
      totalPrice,
    } = body;

    // Validate required fields
    if (!customerName?.trim() || !customerEmail?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!brandSlug || !modelId || !hullColorId) {
      return NextResponse.json(
        { error: "Brand, model, and color selections are required." },
        { status: 400 }
      );
    }

    // Build the order data
    const orderData = {
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone?.trim() || null,
      brandSlug,
      modelId,
      hullColorId,
      selectedEquipment: selectedEquipment || [],
      trailerId: trailerId || null,
      motorOption: motorOption || null,
      deliveryType: deliveryType || null,
      deliveryAddress: deliveryAddress?.trim() || null,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    // Future: Save to Supabase and send email via Resend
    console.log("Build request received:", orderData.customerEmail, orderData.brandSlug);

    return NextResponse.json(
      {
        success: true,
        message: "Build request submitted successfully.",
        order: orderData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Build request error:", error);
    return NextResponse.json(
      { error: "Failed to process build request." },
      { status: 500 }
    );
  }
}
