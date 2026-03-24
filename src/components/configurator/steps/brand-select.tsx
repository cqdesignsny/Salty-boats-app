"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { brands } from "@/lib/data";
import { Check } from "lucide-react";

interface BrandSelectProps {
  selected: string | null;
  onSelect: (brandSlug: string) => void;
}

export function BrandSelect({ selected, onSelect }: BrandSelectProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Choose Your Brand</h2>
      <p className="text-slate-500 mb-8">
        Select a brand to start configuring your boat.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => onSelect(brand.slug)}
            className={cn(
              "relative rounded-xl overflow-hidden border-2 transition-all duration-200 text-left cursor-pointer",
              selected === brand.slug
                ? "border-ocean shadow-lg shadow-ocean/20 ring-2 ring-ocean/30"
                : "border-slate-200 hover:border-ocean/50 hover:shadow-md"
            )}
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={brand.heroImageUrl}
                alt={brand.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-3 right-3 bg-ocean text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {brand.isPackageBrand ? "Package" : "Custom Build"}
              </span>
              {selected === brand.slug && (
                <div className="absolute top-3 left-3 w-6 h-6 bg-ocean rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-navy">{brand.name}</h3>
              <p className="text-xs text-ocean font-medium">{brand.tagline}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {brand.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
