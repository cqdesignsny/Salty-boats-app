"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { getTrailersForModel } from "@/lib/data";
import { Check, PackageCheck } from "lucide-react";

interface TrailerSelectProps {
  modelId: string;
  selected: string | null;
  onSelect: (trailerId: string | null) => void;
  isPackageBrand?: boolean;
}

export function TrailerSelect({ modelId, selected, onSelect, isPackageBrand }: TrailerSelectProps) {
  const availableTrailers = getTrailersForModel(modelId);

  // Package brand — display-only trailer (included in package)
  if (isPackageBrand) {
    const trailer = availableTrailers[0];

    return (
      <div>
        <h2 className="text-2xl font-bold text-navy mb-2">Your Trailer</h2>
        <p className="text-slate-500 mb-8">
          Your package includes a trailer — no extra cost.
        </p>

        {trailer ? (
          <div className="rounded-xl border-2 border-ocean bg-ocean/5 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-ocean/20 flex items-center justify-center flex-shrink-0">
                <PackageCheck className="w-5 h-5 text-ocean" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-navy text-lg">
                    {trailer.trailerName}
                  </h4>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-sm">
                      {formatPrice(trailer.price)}
                    </span>
                    <span className="block text-sea-green font-bold text-lg">
                      FREE
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {trailer.description}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-sea-green/10 text-sea-green px-3 py-1 rounded-full text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Included in package
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-slate-200 p-6 text-center text-slate-500">
            Trailer information coming soon.
          </div>
        )}

        <div className="bg-sea-green/10 rounded-xl p-4 border border-sea-green/20 mt-6">
          <p className="text-sm text-navy">
            <span className="font-semibold">Great value:</span> Your trailer is included in the all-in package price. No additional trailer cost needed.
          </p>
        </div>
      </div>
    );
  }

  // Stumpnocker — selectable trailer (existing behavior)
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Select a Trailer</h2>
      <p className="text-slate-500 mb-8">
        Choose a trailer for your boat, or skip if you have your own.
      </p>

      <div className="space-y-4">
        {/* No trailer option */}
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "w-full rounded-xl border-2 p-4 transition-all duration-200 text-left cursor-pointer",
            selected === null
              ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
              : "border-slate-200 hover:border-ocean/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                selected === null ? "border-ocean bg-ocean" : "border-slate-300"
              )}
            >
              {selected === null && <Check className="w-3 h-3 text-white" />}
            </div>
            <div>
              <h4 className="font-semibold text-navy text-sm">
                No trailer needed
              </h4>
              <p className="text-xs text-slate-500">
                I have my own trailer or will arrange my own.
              </p>
            </div>
          </div>
        </button>

        {availableTrailers.map((trailer) => (
          <button
            key={trailer.id}
            onClick={() => onSelect(trailer.id)}
            className={cn(
              "w-full rounded-xl border-2 p-4 transition-all duration-200 text-left cursor-pointer",
              selected === trailer.id
                ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
                : "border-slate-200 hover:border-ocean/50"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                  selected === trailer.id
                    ? "border-ocean bg-ocean"
                    : "border-slate-300"
                )}
              >
                {selected === trailer.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-navy text-sm">
                    {trailer.trailerName}
                  </h4>
                  <span className="text-ocean font-bold">
                    {formatPrice(trailer.price)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {trailer.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
