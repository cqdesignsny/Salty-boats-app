import Link from "next/link";
import { getAvailableInventory } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { InventoryCard } from "@/components/inventory/inventory-card";
import { Anchor } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory — In-Stock Boats",
  description:
    "Browse our in-stock boats ready for immediate purchase. Reserve yours with a $500 deposit.",
};

export default function InventoryPage() {
  const inventory = getAvailableInventory();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            In-Stock &amp; Ready to Go
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Browse our on-hand inventory. Every boat listed is available for
            immediate pickup or delivery. Reserve yours with a{" "}
            <span className="text-ocean font-semibold">$500 deposit</span>.
          </p>
        </div>
      </section>

      {/* Inventory Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {inventory.length === 0 ? (
          <div className="text-center py-20">
            <Anchor className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-navy mb-2">
              No boats currently in stock
            </h2>
            <p className="text-slate-500 mb-6">
              All inventory has been reserved. Check back soon or build a custom
              boat.
            </p>
            <Link href="/build-your-boat">
              <Button>Build Your Boat</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item) => (
              <InventoryCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Financing CTA */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-8 text-center">
          <h3 className="text-xl font-bold text-navy mb-2">
            Need Financing?
          </h3>
          <p className="text-slate-500 mb-4 max-w-lg mx-auto">
            Apply for marine financing through our partner, Old Salt Marine
            Finance. Quick approvals and competitive rates.
          </p>
          <a
            href="https://gateway.appone.net/onlineapp/Oldsaltmarine"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">Apply for Financing</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
