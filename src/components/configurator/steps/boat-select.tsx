"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { getModelsByBrand } from "@/lib/data";
import { Check } from "lucide-react";
import type { Brand } from "@/types/database";

interface BoatSelectProps {
  brand: Brand;
  selected: string | null;
  onSelect: (modelId: string) => void;
}

export function BoatSelect({ brand, selected, onSelect }: BoatSelectProps) {
  const models = getModelsByBrand(brand.slug);

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">
        Choose Your {brand.name}
      </h2>
      <p className="text-slate-500 mb-8">
        Select the model that fits your needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onSelect(model.id)}
            className={cn(
              "relative rounded-xl overflow-hidden border-2 transition-all duration-200 text-left cursor-pointer",
              selected === model.id
                ? "border-ocean shadow-lg shadow-ocean/20 ring-2 ring-ocean/30"
                : "border-slate-200 hover:border-ocean/50 hover:shadow-md"
            )}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={model.imageUrl}
                alt={model.modelName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {selected === model.id && (
                <div className="absolute top-3 left-3 w-6 h-6 bg-ocean rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-navy">{model.modelName}</h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span>{model.specs.length}</span>
                <span>Max {model.specs.maxHP} HP</span>
              </div>
              <div className="mt-3">
                <span className="text-xs text-slate-500">
                  {brand.isPackageBrand ? "Package" : "Starting at"}
                </span>
                <span className="block text-xl font-bold text-navy">
                  {formatPrice(model.basePrice)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
