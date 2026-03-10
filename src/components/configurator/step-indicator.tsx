"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: readonly string[];
  currentStep: number;
  onGoToStep?: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onGoToStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-center gap-2">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          const canClick = isCompleted && onGoToStep;

          return (
            <div key={step} className="flex items-center">
              <button
                type="button"
                onClick={() => canClick && onGoToStep(i)}
                disabled={!canClick}
                className={cn(
                  "flex items-center gap-2",
                  canClick && "cursor-pointer group"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                    isCompleted && "bg-ocean text-white",
                    isCompleted && canClick && "group-hover:bg-ocean-dark group-hover:ring-2 group-hover:ring-ocean/30",
                    isCurrent && "bg-navy text-white ring-4 ring-ocean/20",
                    !isCompleted && !isCurrent && "bg-slate-200 text-slate-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden lg:inline",
                    i <= currentStep ? "text-navy" : "text-slate-400",
                    canClick && "group-hover:text-ocean"
                  )}
                >
                  {step}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 mx-2",
                    i < currentStep ? "bg-ocean" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          );
        })}
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
