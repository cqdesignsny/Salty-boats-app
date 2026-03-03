"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MotorSelectProps {
  motorOption: "select" | "own" | null;
  onSetOption: (option: "select" | "own") => void;
}

export function MotorSelect({ motorOption, onSetOption }: MotorSelectProps) {
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
