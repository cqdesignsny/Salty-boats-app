import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Shield, Check, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/image-gallery";
import { brands, boatModels, getModelBySlug, getBrandBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { params: Promise<{ brandSlug: string; modelSlug: string }> };

export async function generateStaticParams() {
  return boatModels
    .filter((m) => m.isActive)
    .map((m) => ({
      brandSlug: m.brandSlug,
      modelSlug: m.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug, modelSlug } = await params;
  const model = getModelBySlug(brandSlug, modelSlug);
  const brand = getBrandBySlug(brandSlug);
  if (!model || !brand) return {};
  const specs = model.specs;
  return {
    title: `${model.modelName} — ${brand.name}`,
    description: `${model.description} ${specs.length} length, ${specs.maxHP} max HP, ${specs.draft} draft. Starting at $${model.basePrice.toLocaleString()}. Available at Salty Boats, Wildwood FL.`,
    openGraph: {
      title: `${brand.name} ${model.modelName} | Salty Boats`,
      description: model.description,
      images: model.imageUrl ? [{ url: model.imageUrl }] : [],
    },
  };
}

export default async function BoatDetailPage({ params }: Props) {
  const { brandSlug, modelSlug } = await params;
  const model = getModelBySlug(brandSlug, modelSlug);
  const brand = getBrandBySlug(brandSlug);
  if (!model || !brand) notFound();

  const specRows = [
    { label: "Length", value: model.specs.length },
    { label: "Beam", value: model.specs.beam },
    { label: "Transom Height", value: model.specs.transomHeight },
    { label: "Weight (approx.)", value: model.specs.boatWeightApprox },
    { label: "Max Persons / Weight", value: model.specs.maxPersonsOrWeight },
    { label: "Max Weight Capacity", value: model.specs.maxWeight },
    { label: "Max Horsepower", value: `${model.specs.maxHP} HP` },
    { label: "Draft", value: model.specs.draft },
    { label: "Hull Warranty", value: `${model.specs.hullWarrantyYears} Years` },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/brands/${brandSlug}`} className="hover:text-navy transition-colors">
              {brand.name}
            </Link>
            <span>/</span>
            <span className="text-navy font-medium">{model.modelName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery
              images={model.galleryImages.length > 0 ? model.galleryImages : [model.imageUrl]}
              alt={model.modelName}
            />
            <Link
              href={`/brands/${brandSlug}`}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy transition-colors mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {brand.name}
            </Link>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                {brand.isPackageBrand && (
                  <span className="inline-block bg-ocean/10 text-ocean text-xs font-semibold px-2.5 py-1 rounded-full mb-2 uppercase tracking-wider">
                    All-In Package
                  </span>
                )}
                <p className="text-sm text-ocean font-medium">{brand.name}</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-navy mt-1">
                  {model.modelName}
                </h1>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <span className="text-sm text-slate-500">
                {brand.isPackageBrand ? "Package Price" : "Starting at"}
              </span>
              <span className="block text-4xl font-bold text-navy">
                {formatPrice(model.basePrice)}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {model.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
                Features
              </h3>
              <div className="space-y-2">
                {model.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-ocean flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href={`/build-your-boat?brand=${brandSlug}&model=${modelSlug}`} className="flex-1">
                <Button size="lg" className="w-full">
                  Build This Boat
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Ask a Question
                </Button>
              </Link>
            </div>

            {/* Financing */}
            <div className="mb-8">
              <a
                href="https://gateway.appone.net/onlineapp/Oldsaltmarine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-navy text-white font-semibold rounded-full hover:bg-navy/90 transition-colors text-sm"
              >
                <DollarSign className="w-4 h-4" />
                Need Financing? Apply Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Warranty badge */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <Shield className="w-10 h-10 text-ocean" />
              <div>
                <p className="font-semibold text-navy text-sm">
                  {model.specs.hullWarrantyYears}-Year Hull Warranty
                </p>
                <p className="text-xs text-slate-500">
                  Every hull is hand-laid fiberglass, built to last.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-navy mb-6">Specifications</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                {specRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                  >
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-500 w-1/2">
                      {row.label}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-navy">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
