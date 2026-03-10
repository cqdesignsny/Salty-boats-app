import Link from "next/link";
import { ArrowRight, Paintbrush, Hammer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional gel coat repair, custom fiberglass work, and motor installation & rigging from Salty Boats in Florida.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-ocean font-semibold text-sm uppercase tracking-widest mb-4">
              Our Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Expert Boat Services
            </h1>
            <p className="text-white/70 text-lg">
              Beyond building boats, we offer professional gel coat repair,
              custom fiberglass fabrication, and motor installation &amp; rigging services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-ocean/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 bg-ocean/10 rounded-2xl flex items-center justify-center mb-4">
                  <Paintbrush className="w-7 h-7 text-ocean" />
                </div>
                <h2 className="text-2xl font-bold text-navy">
                  Gel Coat Repair
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Chips, cracks, scratches, and oxidation happen. Our gel coat
                  specialists can restore your hull to factory-fresh condition.
                  We match colors precisely and apply professional-grade gel coat
                  that lasts.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Chip and crack repair",
                    "Scratch removal and buffing",
                    "Oxidation restoration",
                    "Color matching",
                    "Full hull refinishing",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 bg-ocean rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button>
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ocean/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 bg-ocean/10 rounded-2xl flex items-center justify-center mb-4">
                  <Hammer className="w-7 h-7 text-ocean" />
                </div>
                <h2 className="text-2xl font-bold text-navy">
                  Custom Fiberglass
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Need something custom? Our fiberglass shop can build hatches,
                  seat boxes, consoles, and other custom components. If it&apos;s
                  fiberglass, we can make it.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Custom hatches and lids",
                    "Seat boxes and storage",
                    "Console fabrication",
                    "Transom and structural repair",
                    "Custom molds and one-offs",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 bg-ocean rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button>
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ocean/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 bg-ocean/10 rounded-2xl flex items-center justify-center mb-4">
                  <Wrench className="w-7 h-7 text-ocean" />
                </div>
                <h2 className="text-2xl font-bold text-navy">
                  Motor Installation &amp; Rigging
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Bring us your motor and we&apos;ll handle the rest. Our team
                  professionally installs and rigs outboard motors on your boat,
                  ensuring everything is set up right and ready for the water.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Outboard motor installation",
                    "Full rigging and setup",
                    "Fuel system hookup",
                    "Controls and steering installation",
                    "Test run and inspection",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 bg-ocean rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button>
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
