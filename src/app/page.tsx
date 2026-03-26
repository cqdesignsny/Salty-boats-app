import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Anchor, Wrench, Shield, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WaterCanvas } from "@/components/ui/water-canvas";
import { brands, boatModels } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salty Boats | Florida Skiffs & Bay Boats — Wildwood, FL",
  description:
    "Build your dream fishing boat or shop in-stock inventory at Salty Boats. Three brands — Stumpnocker, Palmetto Bay, and Salty Skiffs. Custom builds, all-in packages, and expert service in Wildwood, Florida.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <Image
          src="/salty-boats-hero.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <WaterCanvas />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-ocean font-semibold text-sm uppercase tracking-widest mb-4">
              Florida&apos;s Factory-Direct Boat Builder
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Built for the Water.
              <br />
              <span className="text-ocean">Built for You.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl">
              Three brands of quality skiffs and bay boats — from fully
              customizable builds to ready-to-fish packages. Handcrafted in
              Florida with a 10-year hull warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#brands">
                <Button size="lg">
                  Choose Your Boat
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/inventory">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Shop Inventory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Cards */}
      <section id="brands" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our Brands
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Three distinct lines to fit every angler — from custom
              shallow-water skiffs to complete ready-to-fish packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => {
              const brandModels = boatModels.filter(
                (m) => m.brandSlug === brand.slug && m.isActive
              );
              const lowestPrice = Math.min(
                ...brandModels.map((m) => m.basePrice)
              );

              return (
                <Link key={brand.id} href={`/brands/${brand.slug}`} className="block">
                  <Card className="group h-full">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={brand.heroImageUrl}
                        alt={brand.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-block bg-ocean text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                          {brand.isPackageBrand
                            ? "ALL-IN PACKAGE"
                            : "CUSTOM BUILD"}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-navy mb-1">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-ocean font-medium mb-3">
                        {brand.tagline}
                      </p>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {brand.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          Starting at{" "}
                          <span className="text-navy font-bold text-lg">
                            {formatPrice(lowestPrice)}
                          </span>
                        </span>
                        <span className="text-ocean font-semibold text-sm group-hover:text-ocean-dark transition-colors flex items-center gap-1">
                          Explore
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Getting your dream boat is simple. Build it your way or pick one
              ready to go.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Anchor,
                title: "Choose Your Brand",
                desc: "Pick from Stumpnocker, Palmetto Bay, or Salty Skiffs based on your fishing style.",
              },
              {
                icon: Wrench,
                title: "Configure Your Build",
                desc: "Select your hull color, equipment, motor, and trailer. Or choose an all-in package.",
              },
              {
                icon: Shield,
                title: "Secure with Deposit",
                desc: "Lock in your build with a $500 deposit. We'll start building your boat.",
              },
              {
                icon: Waves,
                title: "Hit the Water",
                desc: "Pick up at our location or we'll deliver. You're ready to fish.",
              },
            ].map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-ocean/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-ocean" />
                </div>
                <span className="text-xs font-bold text-ocean uppercase tracking-widest">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-bold text-navy mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
            Flexible Financing Available
          </h2>
          <p className="text-slate-500 text-lg mb-6 max-w-2xl mx-auto">
            Get on the water sooner with competitive marine financing.
            Quick approvals and flexible terms.
          </p>
          <a
            href="https://gateway.appone.net/onlineapp/Oldsaltmarine"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg">
              Apply for Financing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Your Custom Boat?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Use our boat configurator to customize your perfect skiff, or browse
            our in-stock inventory for boats ready to go today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/build-your-boat">
              <Button size="lg">
                Start Building
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
