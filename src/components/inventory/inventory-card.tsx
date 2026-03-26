"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Tag, Anchor, Truck } from "lucide-react";
import type { InventoryItem } from "@/types/database";

interface InventoryCardProps {
  item: InventoryItem;
}

export function InventoryCard({ item }: InventoryCardProps) {
  const isOnSale = item.originalPrice && item.originalPrice > item.price;
  const images = item.galleryImages.length > 0 ? item.galleryImages : [item.imageUrl];

  return (
    <Link
      href={`/inventory/${item.id}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-ocean/30 transition-all duration-200"
    >
      <div className="relative h-52">
        <ImageCarousel
          images={images}
          alt={item.title}
          className="h-full"
          interval={5000}
        />
        {/* Badges overlay */}
        {isOnSale && (
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
              On Sale
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <span className="bg-sea-green text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
            In Stock
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-20 pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <span className="text-white text-xs bg-black/40 px-2 py-0.5 rounded">
            {item.year} · {item.condition === "new" ? "New" : "Used"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-navy text-lg leading-tight mb-2 group-hover:text-ocean transition-colors">
          {item.title}
        </h3>

        <div className="space-y-1.5 text-xs text-slate-500 mb-4">
          {item.hullColor && (
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Hull: {item.hullColor}</span>
            </div>
          )}
          {item.motorIncluded !== "None" && item.motorIncluded !== "None — Pick Your Power" && (
            <div className="flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5" />
              <span>{item.motorIncluded}</span>
            </div>
          )}
          {item.trailerIncluded !== "None" && item.trailerIncluded !== "Not included in sale price" && (
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>{item.trailerIncluded}</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
          <div>
            {isOnSale && (
              <span className="text-xs text-slate-400 line-through block">
                {formatPrice(item.originalPrice!)}
              </span>
            )}
            <span className="text-2xl font-bold text-navy">
              {formatPrice(item.price)}
            </span>
          </div>
          <span className="text-xs text-ocean font-semibold">
            $500 to reserve →
          </span>
        </div>
      </div>
    </Link>
  );
}
