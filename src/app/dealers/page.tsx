import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealer Locator",
  description: "Find a Salty Boats dealer near you.",
};

export default function DealersPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
      <div className="text-center px-4 max-w-lg">
        <div className="w-20 h-20 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-10 h-10 text-ocean" />
        </div>
        <h1 className="text-3xl font-bold text-navy mb-4">Dealer Locator</h1>
        <p className="text-slate-600 mb-8">
          Dealer network information coming soon. Contact us directly for
          purchasing and pricing.
        </p>
        <Link href="/contact">
          <Button>Contact Us</Button>
        </Link>
      </div>
    </div>
  );
}
