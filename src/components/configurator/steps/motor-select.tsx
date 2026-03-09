"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";
import { getPackageMotorsForModel } from "@/lib/data";
import type { PackageMotorOption } from "@/lib/data";

interface MotorSelectProps {
  motorOption: "select" | "own" | null;
  onSetOption: (option: "select" | "own") => void;
  isPackageBrand?: boolean;
  modelId?: string | null;
  selectedPackageMotorId?: string | null;
  onSelectPackageMotor?: (motorId: string) => void;
}

export function MotorSelect({
  motorOption,
  onSetOption,
  isPackageBrand,
  modelId,
  selectedPackageMotorId,
  onSelectPackageMotor,
}: MotorSelectProps) {
  // Auto-select single motor for package brands (e.g., 1701 CC with only 90HP)
  useEffect(() => {
    if (isPackageBrand && modelId && !selectedPackageMotorId && onSelectPackageMotor) {
      const motors = getPackageMotorsForModel(modelId);
      if (motors.length === 1) {
        onSelectPackageMotor(motors[0].id);
      }
    }
  }, [isPackageBrand, modelId, selectedPackageMotorId, onSelectPackageMotor]);

  // Package brand motor selection
  if (isPackageBrand && modelId) {
    const motors = getPackageMotorsForModel(modelId);
    const singleMotor = motors.length === 1;
    const isPickYourPower = motors.some((m) => m.motorPrice > 0);

    return (
      <div>
        <h2 className="text-2xl font-bold text-navy mb-2">Motor</h2>
        <p className="text-slate-500 mb-4">
          {singleMotor
            ? "Your package includes the following motor."
            : isPickYourPower
            ? "Pick your power — choose the motor for your skiff."
            : "Choose your motor — included in the package price."}
        </p>

        {isPickYourPower && (
          <p className="text-xs text-slate-400 mb-6 italic">
            All motors include fuel tank, fuel line, propeller — installed and ready to go.
          </p>
        )}

        <div className={cn("space-y-3", isPickYourPower && "max-h-[520px] overflow-y-auto pr-1")}>
          {motors.map((motor) => {
            const isSelected = selectedPackageMotorId === motor.id;

            {/* ── Pick Your Power card (Salty Skiffs — rich detail) ── */}
            if (isPickYourPower) {
              return (
                <button
                  key={motor.id}
                  onClick={() => onSelectPackageMotor?.(motor.id)}
                  className={cn(
                    "w-full rounded-xl border-2 p-4 transition-all duration-200 text-left cursor-pointer",
                    isSelected
                      ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
                      : "border-slate-200 hover:border-ocean/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                        isSelected ? "border-ocean bg-ocean" : "border-slate-300"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-navy text-sm leading-tight">
                          {motor.label}
                        </h4>
                        <span className="text-ocean font-bold text-sm whitespace-nowrap">
                          +{formatPrice(motor.motorPrice)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {motor.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {motor.horsepower} HP
                        {motor.sku && <span> · SKU: {motor.sku}</span>}
                      </p>
                    </div>
                  </div>
                </button>
              );
            }

            {/* ── All-In Package card (Palmetto Bay — compact) ── */}
            return (
              <button
                key={motor.id}
                onClick={() => onSelectPackageMotor?.(motor.id)}
                className={cn(
                  "w-full rounded-xl border-2 p-6 transition-all duration-200 text-left",
                  singleMotor ? "cursor-default" : "cursor-pointer",
                  isSelected
                    ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
                    : "border-slate-200 hover:border-ocean/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      isSelected ? "border-ocean bg-ocean" : "border-slate-300"
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-navy">
                        {motor.label}
                      </h4>
                      <span className="text-ocean font-bold">
                        {formatPrice(motor.packagePrice)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {motor.horsepower} HP — Included in package price
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info box */}
        {isPickYourPower ? (
          <div className="bg-ocean/5 rounded-xl p-4 border border-ocean/20 mt-6">
            <p className="text-sm text-navy">
              <span className="font-semibold">Pick Your Power:</span> Motor price is added to your boat and trailer package. All motors come installed with fuel tank, fuel line, and propeller.
            </p>
          </div>
        ) : (
          <div className="bg-sea-green/10 rounded-xl p-4 border border-sea-green/20 mt-6">
            <p className="text-sm text-navy">
              <span className="font-semibold">All-in package:</span> Motor, trailer, and all equipment included in the price shown. No hidden costs.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Stumpnocker motor selection (existing behavior)
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Motor</h2>
      <p className="text-slate-500 mb-8">
        Choose a motor option. Motors come installed with fuel tank, fuel line,
        and propeller.
      </p>

      <div className="space-y-4">
        <button
          onClick={() => onSetOption("own")}
          className={cn(
            "w-full rounded-xl border-2 p-6 transition-all duration-200 text-left cursor-pointer",
            motorOption === "own"
              ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
              : "border-slate-200 hover:border-ocean/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                motorOption === "own" ? "border-ocean bg-ocean" : "border-slate-300"
              )}
            >
              {motorOption === "own" && <Check className="w-3 h-3 text-white" />}
            </div>
            <div>
              <h4 className="font-semibold text-navy">
                I have my own motor / No motor required
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                I will supply and install my own motor.
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSetOption("select")}
          className={cn(
            "w-full rounded-xl border-2 p-6 transition-all duration-200 text-left cursor-pointer",
            motorOption === "select"
              ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
              : "border-slate-200 hover:border-ocean/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                motorOption === "select" ? "border-ocean bg-ocean" : "border-slate-300"
              )}
            >
              {motorOption === "select" && <Check className="w-3 h-3 text-white" />}
            </div>
            <div>
              <h4 className="font-semibold text-navy">
                I need a motor — contact me with options
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                We carry Yamaha and Suzuki motors. Our team will reach out with
                the best options and pricing for your boat. $85 install fee applies.
              </p>
            </div>
          </div>
        </button>

        {motorOption === "select" && (
          <div className="bg-ocean/5 rounded-xl p-4 border border-ocean/20">
            <p className="text-sm text-navy">
              <span className="font-semibold">Note:</span> We&apos;ll match the
              right motor to your boat and provide exact pricing. Our team will
              contact you after your build request to discuss options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
