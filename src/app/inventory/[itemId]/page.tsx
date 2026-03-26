import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { getInventoryItem, inventoryItems, boatModels } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/image-gallery";
import { DepositButton } from "@/components/inventory/deposit-button";
import {
  Anchor,
  Tag,
  Truck,
  Shield,
  ChevronLeft,
  MapPin,
  Hash,
  CheckCircle,
  Wrench,
} from "lucide-react";
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
  const isOnSale = item.originalPrice && item.originalPrice > item.price;

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
          {/* Left column — Image + Features */}
          <div className="space-y-6">
          {item.galleryImages.length > 1 ? (
            <ImageGallery images={item.galleryImages} alt={item.title} />
          ) : (
            <div className="relative h-80 sm:h-[28rem] rounded-2xl overflow-hidden border border-slate-200">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Standard Features — under image */}
          {item.standardFeatures && item.standardFeatures.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-sea-green" />
                <h3 className="font-bold text-navy text-lg">Standard Features</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.standardFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle className="w-4 h-4 text-sea-green flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dealer Options — under features */}
          {item.dealerOptions && item.dealerOptions.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-ocean" />
                <h3 className="font-bold text-navy text-lg">Dealer Added Options</h3>
              </div>
              <ul className="space-y-2">
                {item.dealerOptions.map((option) => (
                  <li
                    key={option}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle className="w-4 h-4 text-ocean flex-shrink-0 mt-0.5" />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>

          {/* Details — right column */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs text-ocean font-semibold uppercase tracking-wider">
                {item.year} · {item.condition === "new" ? "New" : "Pre-Owned"}
              </span>
              {item.stockNumber && (
                <span className="text-xs text-slate-400">
                  Stock # {item.stockNumber}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              {item.title}
            </h1>

            <p className="text-slate-600 mb-6 leading-relaxed">
              {item.description}
            </p>

            {/* Price + Deposit */}
            <div className="bg-white rounded-xl border-2 border-navy p-6 mb-6">
              {isOnSale ? (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      On Sale
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(item.originalPrice!)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl font-bold text-navy">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-sm text-sea-green font-semibold mt-1">
                    Save {formatPrice(item.originalPrice! - item.price)}
                    {item.saleEnds && ` — sale ends ${item.saleEnds}`}
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-slate-500 font-medium">Price</span>
                  <span className="text-4xl font-bold text-navy">
                    {formatPrice(item.price)}
                  </span>
                </div>
              )}

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
            <div className="mb-6 text-center">
              <a
                href="https://gateway.appone.net/onlineapp/Oldsaltmarine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-navy text-white font-semibold rounded-full hover:bg-navy/90 transition-colors text-sm"
              >
                Need financing? Apply now
              </a>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <Tag className="w-5 h-5 text-ocean mb-1.5" />
                <p className="text-xs text-slate-500">Hull Color</p>
                <p className="font-semibold text-navy text-sm">
                  {item.hullColor}
                  {item.trimColor && (
                    <span className="text-slate-400 font-normal"> / {item.trimColor} trim</span>
                  )}
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
              {item.location ? (
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <MapPin className="w-5 h-5 text-ocean mb-1.5" />
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-semibold text-navy text-sm">
                    {item.location}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <Shield className="w-5 h-5 text-ocean mb-1.5" />
                  <p className="text-xs text-slate-500">Hull Warranty</p>
                  <p className="font-semibold text-navy text-sm">
                    {model?.specs.hullWarrantyYears ?? 10} Years
                  </p>
                </div>
              )}
            </div>

            {/* Overview table */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
              <h3 className="font-bold text-navy text-sm mb-3">Overview</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <span className="text-slate-500">Condition</span>
                <span className="text-navy font-medium capitalize">{item.condition}</span>
                <span className="text-slate-500">Availability</span>
                <span className="text-navy font-medium">{item.isSold ? "Sold" : "In Stock"}</span>
                <span className="text-slate-500">Primary Color</span>
                <span className="text-navy font-medium">{item.hullColor}</span>
                {item.trimColor && (
                  <>
                    <span className="text-slate-500">Trim Color</span>
                    <span className="text-navy font-medium">{item.trimColor}</span>
                  </>
                )}
                {item.stockNumber && (
                  <>
                    <span className="text-slate-500">Stock #</span>
                    <span className="text-navy font-medium">{item.stockNumber}</span>
                  </>
                )}
                {item.vin && (
                  <>
                    <span className="text-slate-500">VIN</span>
                    <span className="text-navy font-medium font-mono text-xs">{item.vin}</span>
                  </>
                )}
                {item.location && (
                  <>
                    <span className="text-slate-500">Location</span>
                    <span className="text-navy font-medium">{item.location}</span>
                  </>
                )}
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
                  <span className="text-navy font-medium">{model.specs.length}</span>
                  <span className="text-slate-500">Beam</span>
                  <span className="text-navy font-medium">{model.specs.beam}</span>
                  <span className="text-slate-500">Max HP</span>
                  <span className="text-navy font-medium">{model.specs.maxHP}</span>
                  <span className="text-slate-500">Weight</span>
                  <span className="text-navy font-medium">{model.specs.boatWeightApprox}</span>
                  <span className="text-slate-500">Draft</span>
                  <span className="text-navy font-medium">{model.specs.draft}</span>
                  <span className="text-slate-500">Max Persons</span>
                  <span className="text-navy font-medium">{model.specs.maxPersonsOrWeight}</span>
                  <span className="text-slate-500">Hull Warranty</span>
                  <span className="text-navy font-medium">{model.specs.hullWarrantyYears} Years</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-xs text-slate-400 leading-relaxed max-w-3xl">
          <p>
            <em>
              Disclaimer: While we attempt to ensure the display of current and accurate
              data, this listing may not reflect the most recent transactions or may reflect
              occasional data entry errors. All inventory listed is subject to availability
              and prior sale. Please consult dealership personnel for details. Prices may not
              include dealer preparation, transportation, taxes, or other applicable charges.
              Photographs may be representative only and may vary somewhat from the items
              offered for sale.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}
