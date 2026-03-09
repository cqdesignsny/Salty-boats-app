import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { brands, getModelsByBrand, getBrandBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { params: Promise<{ brandSlug: string }> };

export async function generateStaticParams() {
  return brands.map((b) => ({ brandSlug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: Props) {
  const { brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  if (!brand) notFound();

  const models = getModelsByBrand(brandSlug);

  return (
    <>
      {/* Brand Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={brand.heroImageUrl}
            alt={brand.name}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            {brand.isPackageBrand && (
              <span className="inline-block bg-ocean text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                All-In Package
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{brand.name}</h1>
            <p className="text-xl text-ocean font-medium mb-4">{brand.tagline}</p>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {brand.description}
            </p>
            <Link href={`/build-your-boat?brand=${brandSlug}`}>
              <Button size="lg">
                Build Your {brand.name.split(" ")[0]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Boat Models Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy mb-4">
              {brand.name} Models
            </h2>
            <p className="text-slate-600 text-lg">
              {models.length} model{models.length !== 1 ? "s" : ""} available
              {brand.isPackageBrand
                ? " — each comes as a complete, ready-to-fish package."
                : " — fully customizable with your choice of equipment, motor, and trailer."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <Card key={model.id} className="group flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={model.imageUrl}
                    alt={model.modelName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {model.modelName}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-2">
                    {model.description}
                  </p>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="bg-slate-50 rounded px-2 py-1.5">
                      <span className="text-slate-500">Length</span>
                      <span className="block font-semibold text-navy">{model.specs.length}</span>
                    </div>
                    <div className="bg-slate-50 rounded px-2 py-1.5">
                      <span className="text-slate-500">Max HP</span>
                      <span className="block font-semibold text-navy">{model.specs.maxHP} HP</span>
                    </div>
                    <div className="bg-slate-50 rounded px-2 py-1.5">
                      <span className="text-slate-500">Beam</span>
                      <span className="block font-semibold text-navy">{model.specs.beam}</span>
                    </div>
                    <div className="bg-slate-50 rounded px-2 py-1.5">
                      <span className="text-slate-500">Draft</span>
                      <span className="block font-semibold text-navy">{model.specs.draft}</span>
                    </div>
                  </div>

                  {brand.isPackageBrand && brand.slug !== "salty-skiffs" && (
                    <div className="mb-4 space-y-1">
                      {["Motor included", "Trailer included", "Colors included"].map((f) => (
                        <div key={f} className="flex items-center gap-1.5 text-xs text-sea-green">
                          <Check className="w-3.5 h-3.5" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500">
                        {brand.isPackageBrand && brand.slug !== "salty-skiffs" ? "Package" : "Starting at"}
                      </span>
                      <span className="block text-2xl font-bold text-navy">
                        {formatPrice(model.basePrice)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/brands/${brandSlug}/${model.slug}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                      <Link href={`/build-your-boat?brand=${brandSlug}`}>
                        <Button size="sm">
                          Build
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
            Can&apos;t decide? Let us help.
          </h2>
          <p className="text-slate-600 mb-6">
            Contact our team and we&apos;ll help you find the perfect boat for your
            fishing style and budget.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
            <Link href={`/build-your-boat?brand=${brandSlug}`}>
              <Button>
                Start Building
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
