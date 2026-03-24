"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { getEquipmentForModel } from "@/lib/data";
import { Check, AlertCircle } from "lucide-react";

interface EquipmentSelectProps {
  modelId: string;
  selected: string[];
  onToggle: (equipmentId: string) => void;
}

export function EquipmentSelect({ modelId, selected, onToggle }: EquipmentSelectProps) {
  const equipment = getEquipmentForModel(modelId);

  // Group by category
  const categories = ["electrical", "trolling-motor", "plumbing", "seating", "additional-options"] as const;
  const categoryLabels: Record<string, string> = {
    electrical: "Electrical",
    "trolling-motor": "Trolling Motor",
    plumbing: "Plumbing",
    seating: "Seating",
    "additional-options": "Additional Options",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Optional Equipment</h2>
      <p className="text-slate-500 mb-8">
        Select any optional equipment for your build. All items are optional.
      </p>

      <div className="space-y-8">
        {categories.map((category) => {
          const items = equipment.filter((e) => e.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4">
                {categoryLabels[category]}
              </h3>
              <div className="space-y-3">
                {items.map((item) => {
                  const isSelected = selected.includes(item.id);
                  const hasDependency = item.requiresOptionId && !selected.includes(item.requiresOptionId);

                  return (
                    <button
                      key={item.id}
                      onClick={() => !hasDependency && onToggle(item.id)}
                      disabled={!!hasDependency}
                      className={cn(
                        "w-full rounded-xl border-2 p-4 transition-all duration-200 text-left flex items-start gap-4",
                        isSelected
                          ? "border-ocean bg-ocean/5"
                          : hasDependency
                          ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                          : "border-slate-200 hover:border-ocean/50 cursor-pointer"
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                          isSelected
                            ? "border-ocean bg-ocean"
                            : "border-slate-300"
                        )}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-semibold text-navy text-sm">
                            {item.optionName}
                          </h4>
                          <span className="text-ocean font-bold text-sm whitespace-nowrap">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-1">
                            {item.description}
                          </p>
                        )}
                        {hasDependency && (
                          <div className="flex items-center gap-1 mt-1.5 text-xs text-amber-600">
                            <AlertCircle className="w-3 h-3" />
                            Requires switch panel
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
