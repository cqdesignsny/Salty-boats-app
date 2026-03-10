"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Check, Wrench } from "lucide-react";

interface InstallationSelectProps {
  installationOption: "yes" | "no" | null;
  onSetOption: (option: "yes" | "no") => void;
  hasMotor: boolean;
}

export function InstallationSelect({
  installationOption,
  onSetOption,
  hasMotor,
}: InstallationSelectProps) {
  // No motor selected — nothing to install
  if (!hasMotor) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-navy mb-2">Installation</h2>
        <p className="text-slate-500 mb-8">
          No motor selected — no installation needed.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-navy">
            Since you&apos;re not purchasing a motor, you can skip this step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Motor Installation</h2>
      <p className="text-slate-500 mb-6">
        Would you like us to install your motor? Installation is {formatPrice(250)}.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => onSetOption("yes")}
          className={cn(
            "w-full rounded-xl border-2 p-5 transition-all duration-200 text-left cursor-pointer",
            installationOption === "yes"
              ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
              : "border-slate-200 hover:border-ocean/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                installationOption === "yes" ? "border-ocean bg-ocean" : "border-slate-300"
              )}
            >
              {installationOption === "yes" && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-navy">
                  Yes, install my motor
                </h4>
                <span className="text-ocean font-bold">
                  +{formatPrice(250)}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Includes fuel tank, fuel line, and propeller — installed and ready to go.
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSetOption("no")}
          className={cn(
            "w-full rounded-xl border-2 p-5 transition-all duration-200 text-left cursor-pointer",
            installationOption === "no"
              ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
              : "border-slate-200 hover:border-ocean/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                installationOption === "no" ? "border-ocean bg-ocean" : "border-slate-300"
              )}
            >
              {installationOption === "no" && <Check className="w-3 h-3 text-white" />}
            </div>
            <div>
              <h4 className="font-semibold text-navy">
                No thanks, I&apos;ll handle installation
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                I&apos;ll install the motor myself or arrange my own installation.
              </p>
            </div>
          </div>
        </button>
      </div>

      {installationOption === "yes" && (
        <div className="bg-ocean/5 rounded-xl p-4 border border-ocean/20 mt-6">
          <div className="flex items-start gap-2">
            <Wrench className="w-4 h-4 text-ocean mt-0.5 flex-shrink-0" />
            <p className="text-sm text-navy">
              <span className="font-semibold">Professional installation:</span> Includes fuel tank, fuel line, and propeller. Your motor will be installed and tested before delivery or pickup.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
