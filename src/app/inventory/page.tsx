import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { getAvailableInventory } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Anchor, Tag, Truck } from "lucide-react";
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
            {inventory.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/inventory/${item.id}`}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-ocean/30 transition-all duration-200"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-sea-green text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                        Available
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-20" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs bg-black/40 px-2 py-0.5 rounded">
                        {item.year} · {item.condition === "new" ? "New" : "Used"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-navy text-lg leading-tight mb-2 group-hover:text-ocean transition-colors">
                      {item.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                      {item.hullColor && (
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Hull: {item.hullColor}</span>
                        </div>
                      )}
                      {item.motorIncluded !== "None" && (
                        <div className="flex items-center gap-1.5">
                          <Anchor className="w-3.5 h-3.5" />
                          <span>{item.motorIncluded}</span>
                        </div>
                      )}
                      {item.trailerIncluded !== "None" && (
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5" />
                          <span>{item.trailerIncluded}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                      <span className="text-2xl font-bold text-navy">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-xs text-ocean font-semibold">
                        $500 to reserve →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
            <Button variant="outline">Apply for Financing</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
