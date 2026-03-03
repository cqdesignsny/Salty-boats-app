"use client";

import { cn } from "@/lib/utils";
import { Check, MapPin, Building2 } from "lucide-react";

interface DeliverySelectProps {
  deliveryType: "pickup" | "delivery" | null;
  deliveryAddress: string;
  onSetType: (type: "pickup" | "delivery") => void;
  onSetAddress: (address: string) => void;
}

export function DeliverySelect({
  deliveryType,
  deliveryAddress,
  onSetType,
  onSetAddress,
}: DeliverySelectProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Delivery Preference</h2>
      <p className="text-slate-500 mb-8">
        How would you like to receive your boat?
      </p>

      <div className="space-y-4">
        <button
          onClick={() => onSetType("pickup")}
          className={cn(
            "w-full rounded-xl border-2 p-6 transition-all duration-200 text-left cursor-pointer",
            deliveryType === "pickup"
              ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
              : "border-slate-200 hover:border-ocean/50"
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                deliveryType === "pickup" ? "border-ocean bg-ocean" : "border-slate-300"
              )}
            >
              {deliveryType === "pickup" && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-ocean" />
                <h4 className="font-semibold text-navy">Pick Up</h4>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Pick up your completed boat at 900 Industrial Drive, Wildwood, FL 34785.
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSetType("delivery")}
          className={cn(
            "w-full rounded-xl border-2 p-6 transition-all duration-200 text-left cursor-pointer",
            deliveryType === "delivery"
              ? "border-ocean bg-ocean/5 ring-2 ring-ocean/30"
              : "border-slate-200 hover:border-ocean/50"
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                deliveryType === "delivery" ? "border-ocean bg-ocean" : "border-slate-300"
              )}
            >
              {deliveryType === "delivery" && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-ocean" />
                <h4 className="font-semibold text-navy">Delivery</h4>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                We&apos;ll deliver your boat to your location. Delivery costs
                will be discussed after your build request.
              </p>
            </div>
          </div>
        </button>

        {deliveryType === "delivery" && (
          <div className="ml-9 mt-2">
            <label className="block text-sm font-semibold text-navy mb-2">
              Delivery Address
            </label>
            <textarea
              rows={3}
              value={deliveryAddress}
              onChange={(e) => onSetAddress(e.target.value)}
              placeholder="Enter your full address (street, city, state, zip)"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors resize-none text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
