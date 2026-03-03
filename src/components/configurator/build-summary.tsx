"use client";

import { formatPrice } from "@/lib/utils";
import type { BoatModel, HullColor, EquipmentOption, Trailer } from "@/types/database";

interface BuildSummaryProps {
  brand: { name: string } | null;
  model: BoatModel | null;
  color: HullColor | null;
  colorPrice: number;
  equipment: EquipmentOption[];
  equipmentTotal: number;
  trailer: Trailer | null;
  trailerPrice: number;
  motorInstallFee: number;
  motorOption: "select" | "own" | null;
  deliveryType: "pickup" | "delivery" | null;
  basePrice: number;
  totalPrice: number;
  isPackageBrand: boolean;
}

export function BuildSummary({
  brand,
  model,
  color,
  colorPrice,
  equipment,
  equipmentTotal,
  trailer,
  trailerPrice,
  motorInstallFee,
  motorOption,
  deliveryType,
  basePrice,
  totalPrice,
  isPackageBrand,
}: BuildSummaryProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-36 lg:top-40">
      <h3 className="font-bold text-navy text-lg mb-4">Build Summary</h3>

      <div className="space-y-3 text-sm">
        {brand && (
          <div className="flex justify-between">
            <span className="text-slate-500">Brand</span>
            <span className="font-medium text-navy">{brand.name}</span>
          </div>
        )}

        {model && (
          <div className="flex justify-between">
            <span className="text-slate-500">Model</span>
            <span className="font-medium text-navy">{model.modelName}</span>
          </div>
        )}

        {model && (
          <div className="flex justify-between">
            <span className="text-slate-500">
              {isPackageBrand ? "Package Price" : "Base Price"}
            </span>
            <span className="font-medium text-navy">
              {formatPrice(basePrice)}
            </span>
          </div>
        )}

        {color && (
          <div className="flex justify-between">
            <span className="text-slate-500">Hull Color</span>
            <span className="font-medium text-navy">
              {color.colorName}
              {colorPrice > 0 && (
                <span className="text-ocean ml-1">+{formatPrice(colorPrice)}</span>
              )}
              {colorPrice === 0 && !color.isStandard && isPackageBrand && (
                <span className="text-sea-green ml-1">FREE</span>
              )}
            </span>
          </div>
        )}

        {equipment.length > 0 && (
          <div className="border-t border-slate-100 pt-3">
            <span className="text-slate-500 text-xs uppercase tracking-wider">
              Equipment
            </span>
            {equipment.map((e) => (
              <div key={e.id} className="flex justify-between mt-1.5">
                <span className="text-slate-600 text-xs">{e.optionName}</span>
                <span className="text-navy text-xs font-medium">
                  +{formatPrice(e.price)}
                </span>
              </div>
            ))}
          </div>
        )}

        {trailer && (
          <div className="flex justify-between border-t border-slate-100 pt-3">
            <span className="text-slate-500">Trailer</span>
            <span className="font-medium text-navy">
              +{formatPrice(trailerPrice)}
            </span>
          </div>
        )}

        {motorOption && (
          <div className="flex justify-between">
            <span className="text-slate-500">Motor</span>
            <span className="font-medium text-navy">
              {motorOption === "own"
                ? "Customer Supplied"
                : motorInstallFee > 0
                ? `Install +${formatPrice(motorInstallFee)}`
                : "Included"}
            </span>
          </div>
        )}

        {deliveryType && (
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery</span>
            <span className="font-medium text-navy">
              {deliveryType === "pickup" ? "Pickup" : "Delivery"}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t-2 border-navy mt-4 pt-4">
        <div className="flex justify-between items-baseline">
          <span className="text-slate-700 font-semibold">Total</span>
          <span className="text-2xl font-bold text-navy">
            {formatPrice(totalPrice)}
          </span>
        </div>
        {totalPrice > 0 && (
          <p className="text-xs text-slate-400 mt-1 text-right">
            $500 deposit to reserve
          </p>
        )}
      </div>
    </div>
  );
}
