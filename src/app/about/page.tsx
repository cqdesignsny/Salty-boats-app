import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Users, MapPin } from "lucide-react";
import { brands } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Salty Boats — Florida's home for quality skiffs and bay boats.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-ocean font-semibold text-sm uppercase tracking-widest mb-4">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Built in Florida.{" "}
              <span className="text-ocean">Built to Last.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Salty Boats is a family-owned boat manufacturer based in Florida.
              We build three distinct brands of skiffs and bay boats — each
              designed with a singular focus: getting you on the water with a
              boat you can trust.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  What started as a passion for fishing and a frustration with
                  overpriced, over-complicated boats turned into something bigger.
                  Salty Boats was born from a simple idea: build honest, quality
                  boats at fair prices.
                </p>
                <p>
                  Every hull we build is hand-laid fiberglass, crafted by skilled
                  technicians who care about their work. We don&apos;t cut corners,
                  and we stand behind every boat with a 10-year hull warranty.
                </p>
                <p>
                  Whether you need a bare-bones tiller skiff you can customize
                  piece by piece, or a complete ready-to-fish package with motor
                  and trailer included, we have a boat for you.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Shield, label: "10-Year", sublabel: "Hull Warranty" },
                { icon: Award, label: "3 Brands", sublabel: "7 Models" },
                { icon: Users, label: "Family", sublabel: "Owned & Operated" },
                { icon: MapPin, label: "Florida", sublabel: "Built" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-50 rounded-2xl p-6 text-center"
                >
                  <item.icon className="w-10 h-10 text-ocean mx-auto mb-3" />
                  <p className="text-2xl font-bold text-navy">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-10 text-center">
            Our Brands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg hover:border-ocean/40 transition-all duration-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={brand.heroImageUrl}
                    alt={brand.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 right-3 bg-ocean text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {brand.isPackageBrand ? "All-In Package" : "Custom Build"}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-ocean font-medium mb-2">{brand.tagline}</p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {brand.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
