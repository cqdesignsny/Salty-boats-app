import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { getInventoryItem, inventoryItems, boatModels } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { DepositButton } from "@/components/inventory/deposit-button";
import { Anchor, Tag, Truck, Shield, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ itemId: string }>;
}

export async function generateStaticParams() {
  return inventoryItems.map((item) => ({
    itemId: item.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { itemId } = await params;
  const item = getInventoryItem(itemId);
  if (!item) return { title: "Not Found" };

  return {
    title: `${item.title} — Salty Boats Inventory`,
    description: item.description,
  };
}

export default async function InventoryDetailPage({ params }: Props) {
  const { itemId } = await params;
  const item = getInventoryItem(itemId);
  if (!item) notFound();

  const model = boatModels.find((m) => m.id === item.boatModelId);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1 text-sm text-ocean hover:text-ocean/80 font-medium mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-80 sm:h-[28rem] rounded-2xl overflow-hidden border border-slate-200">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {!item.isSold && (
              <div className="absolute top-4 right-4">
                <span className="bg-sea-green text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-lg">
                  Available
                </span>
              </div>
            )}
            {item.isSold && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-red-600 text-white text-2xl font-bold px-6 py-3 rounded-xl -rotate-12">
                  SOLD
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="mb-1">
              <span className="text-xs text-ocean font-semibold uppercase tracking-wider">
                {item.year} · {item.condition === "new" ? "New" : "Pre-Owned"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              {item.title}
            </h1>

            <p className="text-slate-600 mb-6 leading-relaxed">
              {item.description}
            </p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <Tag className="w-5 h-5 text-ocean mb-1.5" />
                <p className="text-xs text-slate-500">Hull Color</p>
                <p className="font-semibold text-navy text-sm">
                  {item.hullColor}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <Anchor className="w-5 h-5 text-ocean mb-1.5" />
                <p className="text-xs text-slate-500">Motor</p>
                <p className="font-semibold text-navy text-sm">
                  {item.motorIncluded === "None"
                    ? "Not included"
                    : item.motorIncluded}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <Truck className="w-5 h-5 text-ocean mb-1.5" />
                <p className="text-xs text-slate-500">Trailer</p>
                <p className="font-semibold text-navy text-sm">
                  {item.trailerIncluded === "None"
                    ? "Not included"
                    : item.trailerIncluded}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <Shield className="w-5 h-5 text-ocean mb-1.5" />
                <p className="text-xs text-slate-500">Hull Warranty</p>
                <p className="font-semibold text-navy text-sm">
                  {model?.specs.hullWarrantyYears ?? 10} Years
                </p>
              </div>
            </div>

            {/* Model specs */}
            {model && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
                <h3 className="font-bold text-navy text-sm mb-3">
                  Boat Specifications
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-slate-500">Length</span>
                  <span className="text-navy font-medium">
                    {model.specs.length}
                  </span>
                  <span className="text-slate-500">Beam</span>
                  <span className="text-navy font-medium">
                    {model.specs.beam}
                  </span>
                  <span className="text-slate-500">Max HP</span>
                  <span className="text-navy font-medium">
                    {model.specs.maxHP}
                  </span>
                  <span className="text-slate-500">Weight</span>
                  <span className="text-navy font-medium">
                    {model.specs.boatWeightApprox}
                  </span>
                  <span className="text-slate-500">Draft</span>
                  <span className="text-navy font-medium">
                    {model.specs.draft}
                  </span>
                  <span className="text-slate-500">Max Persons</span>
                  <span className="text-navy font-medium">
                    {model.specs.maxPersonsOrWeight}
                  </span>
                </div>
              </div>
            )}

            {/* Price + Deposit */}
            <div className="bg-white rounded-xl border-2 border-navy p-6">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-slate-500 font-medium">Price</span>
                <span className="text-4xl font-bold text-navy">
                  {formatPrice(item.price)}
                </span>
              </div>

              {!item.isSold ? (
                <>
                  <DepositButton itemId={item.id} itemTitle={item.title} />
                  <p className="text-xs text-slate-400 text-center mt-3">
                    Reserve with a $500 refundable deposit. Our team will
                    contact you to arrange payment and pickup/delivery.
                  </p>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="text-red-600 font-semibold">
                    This boat has been sold.
                  </p>
                  <Link href="/inventory" className="text-ocean text-sm">
                    Browse other available boats
                  </Link>
                </div>
              )}
            </div>

            {/* Financing */}
            <div className="mt-4 text-center">
              <a
                href="https://gateway.appone.net/onlineapp/Oldsaltmarine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ocean hover:underline"
              >
                Need financing? Apply now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
