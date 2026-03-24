"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  function goTo(index: number) {
    setCurrent(index);
  }

  function prev() {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }

  function next() {
    setCurrent((c) => (c + 1) % images.length);
  }

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 group">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              i === current ? "opacity-100" : "opacity-0"
            )}
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ))}

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => goTo(i)}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                i === current
                  ? "border-ocean ring-1 ring-ocean"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
