import { NextResponse } from "next/server";
import { createBuildQuote } from "@/lib/notion";
import {
  getBrandBySlug,
  boatModels,
  hullColors,
  equipmentOptions,
  trailers,
} from "@/lib/data";

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
      motorLabel,
      deliveryType,
      deliveryAddress,
      totalPrice,
      stripeSessionId,
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

    // Resolve human-readable names from IDs
    const brand = getBrandBySlug(brandSlug);
    const model = boatModels.find((m) => m.id === modelId);
    const color = hullColors.find((c) => c.id === hullColorId);
    const equipmentNames = (selectedEquipment || [])
      .map((id: string) => equipmentOptions.find((e) => e.id === id)?.optionName)
      .filter(Boolean)
      .join(", ");
    const trailer = trailerId ? trailers.find((t) => t.id === trailerId) : null;

    // Generate a build order ID for tracking
    const buildOrderId = `SB-${Date.now()}`;

    // Push to Notion
    try {
      await createBuildQuote({
        customerName: customerName.trim(),
        email: customerEmail.trim(),
        phone: customerPhone?.trim() || undefined,
        brand: brand?.name || brandSlug,
        model: model?.modelName || modelId,
        hullColor: color?.colorName || hullColorId,
        equipment: equipmentNames || "None",
        motor: motorLabel || motorOption || "None",
        trailer: trailer?.trailerName || "None",
        deliveryType: deliveryType === "delivery" ? "Delivery" : "Pickup",
        estimatedTotal: totalPrice || 0,
        depositStatus: "Unpaid",
        stripeSessionId: stripeSessionId || "",
      });
      console.log("Build quote saved to Notion:", buildOrderId);
    } catch (notionError) {
      console.error("Failed to save to Notion:", notionError);
      // Don't fail the request if Notion is down
    }

    return NextResponse.json(
      {
        success: true,
        message: "Build request submitted successfully.",
        buildOrderId,
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
