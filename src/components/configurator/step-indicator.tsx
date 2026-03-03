"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: readonly string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  i < currentStep && "bg-ocean text-white",
                  i === currentStep && "bg-navy text-white ring-4 ring-ocean/20",
                  i > currentStep && "bg-slate-200 text-slate-400"
                )}
              >
                {i < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden lg:inline",
                  i <= currentStep ? "text-navy" : "text-slate-400"
                )}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-2",
                  i < currentStep ? "bg-ocean" : "bg-slate-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-navy">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-slate-500">{steps[currentStep]}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-ocean rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
