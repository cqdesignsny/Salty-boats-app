"use client";

import { useState, useRef } from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Printer, Download } from "lucide-react";
import type { BoatModel, HullColor, EquipmentOption, Trailer, Brand } from "@/types/database";

interface ReviewSubmitProps {
  brand: Brand;
  model: BoatModel;
  color: HullColor;
  colorPrice: number;
  equipment: EquipmentOption[];
  equipmentTotal: number;
  trailer: Trailer | null;
  trailerPrice: number;
  motorOption: "select" | "own" | null;
  motorInstallFee: number;
  deliveryType: "pickup" | "delivery" | null;
  deliveryAddress: string;
  totalPrice: number;
  isPackageBrand: boolean;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSetName: (name: string) => void;
  onSetEmail: (email: string) => void;
  onSetPhone: (phone: string) => void;
}

export function ReviewSubmit({
  brand,
  model,
  color,
  colorPrice,
  equipment,
  equipmentTotal,
  trailer,
  trailerPrice,
  motorOption,
  motorInstallFee,
  deliveryType,
  deliveryAddress,
  totalPrice,
  isPackageBrand,
  customerName,
  customerEmail,
  customerPhone,
  onSetName,
  onSetEmail,
  onSetPhone,
}: ReviewSubmitProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    const equipmentLines = equipment
      .map((e) => `<tr><td style="padding:4px 8px">${e.optionName}</td><td style="padding:4px 8px;text-align:right">${formatPrice(e.price)}</td></tr>`)
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Salty Boats — Build Quote</title>
        <style>
          body { font-family: Arial, sans-serif; color: #0c1b3a; max-width: 700px; margin: 0 auto; padding: 40px 24px; }
          h1 { font-size: 22px; margin-bottom: 4px; }
          .subtitle { color: #64748b; font-size: 14px; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
          th { text-align: left; padding: 8px; background: #f1f5f9; font-size: 13px; color: #64748b; border-bottom: 1px solid #e2e8f0; }
          td { padding: 8px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
          .total-row td { border-top: 2px solid #0c1b3a; font-weight: bold; font-size: 18px; padding-top: 12px; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <h1>Salty Boats — Build Quote</h1>
        <p class="subtitle">${brand.name} ${model.modelName} &bull; ${new Date().toLocaleDateString()}</p>
        <table>
          <thead><tr><th>Item</th><th style="text-align:right">Price</th></tr></thead>
          <tbody>
            <tr><td style="padding:4px 8px">${model.modelName} (${isPackageBrand ? "Package" : "Base"})</td><td style="padding:4px 8px;text-align:right">${formatPrice(model.basePrice)}</td></tr>
            <tr><td style="padding:4px 8px">Hull Color — ${color.colorName}</td><td style="padding:4px 8px;text-align:right">${colorPrice > 0 ? formatPrice(colorPrice) : "Included"}</td></tr>
            ${equipmentLines}
            ${trailer ? `<tr><td style="padding:4px 8px">${trailer.trailerName}</td><td style="padding:4px 8px;text-align:right">${formatPrice(trailer.price)}</td></tr>` : ""}
            ${motorOption ? `<tr><td style="padding:4px 8px">Motor — ${motorOption === "own" ? "Customer Supplied" : "Contact for options"}</td><td style="padding:4px 8px;text-align:right">${motorInstallFee > 0 ? formatPrice(motorInstallFee) + " install" : "—"}</td></tr>` : ""}
            <tr><td style="padding:4px 8px">Delivery</td><td style="padding:4px 8px;text-align:right">${deliveryType === "pickup" ? "Pickup at Salty Boats" : "Delivery"}</td></tr>
            ${deliveryType === "delivery" && deliveryAddress ? `<tr><td style="padding:4px 8px;color:#64748b" colspan="2">${deliveryAddress}</td></tr>` : ""}
          </tbody>
          <tbody>
            <tr class="total-row"><td>Estimated Total</td><td style="text-align:right">${formatPrice(totalPrice)}</td></tr>
          </tbody>
        </table>
        <p style="font-size:13px;color:#64748b;">$500 deposit required to start your build.</p>
        <div class="footer">
          <p>Salty Boats &bull; 900 Industrial Drive, Wildwood, FL 34785</p>
          <p>(352) 748-1161 &bull; sales@saltyboats.com</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  }

  async function handleSubmit() {
    if (!customerName.trim() || !customerEmail.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/build-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          brandSlug: brand.slug,
          modelId: model.id,
          hullColorId: color.id,
          selectedEquipment: equipment.map((e) => e.id),
          trailerId: trailer?.id ?? null,
          motorOption,
          deliveryType,
          deliveryAddress,
          totalPrice,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-sea-green" />
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4">
          Build Request Submitted!
        </h2>
        <p className="text-slate-600 max-w-md mx-auto mb-2">
          Thank you, {customerName}! Your build request for the{" "}
          <strong>{model.modelName}</strong> has been submitted.
        </p>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Our team will contact you at {customerEmail} to discuss next steps and
          collect the $500 deposit to start your build.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-2">Review Your Build</h2>
      <p className="text-slate-500 mb-8">
        Review your selections and provide your contact info to submit.
      </p>

      {/* Build Review */}
      <div className="bg-slate-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Brand</span>
            <p className="font-semibold text-navy">{brand.name}</p>
          </div>
          <div>
            <span className="text-slate-500">Model</span>
            <p className="font-semibold text-navy">{model.modelName}</p>
          </div>
          <div>
            <span className="text-slate-500">
              {isPackageBrand ? "Package Price" : "Base Price"}
            </span>
            <p className="font-semibold text-navy">
              {formatPrice(model.basePrice)}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Hull Color</span>
            <p className="font-semibold text-navy">
              {color.colorName}
              {colorPrice > 0 && (
                <span className="text-ocean text-xs ml-1">
                  +{formatPrice(colorPrice)}
                </span>
              )}
            </p>
          </div>

          {!isPackageBrand && equipment.length > 0 && (
            <div className="sm:col-span-2">
              <span className="text-slate-500">Equipment</span>
              <div className="mt-1 space-y-1">
                {equipment.map((e) => (
                  <p key={e.id} className="font-medium text-navy text-xs">
                    {e.optionName} — {formatPrice(e.price)}
                  </p>
                ))}
              </div>
            </div>
          )}

          {trailer && (
            <div>
              <span className="text-slate-500">Trailer</span>
              <p className="font-semibold text-navy">
                {trailer.trailerName} — {formatPrice(trailer.price)}
              </p>
            </div>
          )}

          {motorOption && (
            <div>
              <span className="text-slate-500">Motor</span>
              <p className="font-semibold text-navy">
                {motorOption === "own"
                  ? "Customer Supplied"
                  : "Contact for options"}
                {motorInstallFee > 0 && (
                  <span className="text-ocean text-xs ml-1">
                    +{formatPrice(motorInstallFee)} install
                  </span>
                )}
              </p>
            </div>
          )}

          <div>
            <span className="text-slate-500">Delivery</span>
            <p className="font-semibold text-navy">
              {deliveryType === "pickup" ? "Pickup at Salty Boats" : "Delivery"}
            </p>
            {deliveryType === "delivery" && deliveryAddress && (
              <p className="text-xs text-slate-500 mt-0.5">{deliveryAddress}</p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 mt-4 pt-4">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold text-navy">Total</span>
            <span className="text-3xl font-bold text-navy">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <p className="text-xs text-slate-400 text-right mt-1">
            $500 deposit to start your build
          </p>
        </div>

        {/* Print / Download */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex-1"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Quote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Save as PDF
          </Button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-navy">Your Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => onSetName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">
              Email *
            </label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(e) => onSetEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Phone (optional)
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => onSetPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        <Button
          size="lg"
          className="w-full mt-4"
          onClick={handleSubmit}
          disabled={loading || !customerName.trim() || !customerEmail.trim()}
        >
          {loading ? "Submitting..." : "Submit Build Request"}
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
