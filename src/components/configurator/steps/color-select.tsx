"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { hullColors, getColorPrice } from "@/lib/data";
import { Check } from "lucide-react";

interface ColorSelectProps {
  modelId: string;
  selected: string | null;
  onSelect: (colorId: string) => void;
  isPackageBrand: boolean;
}

export function ColorSelect({ modelId, selected, onSelect, isPackageBrand }: ColorSelectProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Choose Your Hull Color</h2>
      <p className="text-slate-500 mb-8">
        {isPackageBrand
          ? "All colors are included in your package price at no extra charge."
          : "Standard colors (White, Gray) are included. Custom colors have an upcharge."}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {hullColors.map((color) => {
          const price = getColorPrice(modelId, color.id);
          const isSelected = selected === color.id;

          return (
            <button
              key={color.id}
              onClick={() => onSelect(color.id)}
              className={cn(
                "relative rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer text-center",
                isSelected
                  ? "border-ocean shadow-lg shadow-ocean/20 ring-2 ring-ocean/30"
                  : "border-slate-200 hover:border-ocean/50 hover:shadow-md"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-ocean rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-slate-200 shadow-inner"
                style={{ backgroundColor: color.hexCode }}
              />
              <p className="font-semibold text-navy text-sm">{color.colorName}</p>
              <p className="text-xs mt-1">
                {price === 0 ? (
                  <span className="text-sea-green font-medium">
                    {color.isStandard ? "Standard" : "FREE"}
                  </span>
                ) : (
                  <span className="text-ocean font-medium">
                    +{formatPrice(price)}
                  </span>
                )}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
