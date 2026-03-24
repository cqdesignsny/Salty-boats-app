"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  interval?: number;
}

export function ImageCarousel({
  images,
  alt,
  className,
  interval = 4000,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [isPaused, next, interval, images.length]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className={cn("relative overflow-hidden bg-slate-100", className)}>
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden group bg-slate-100", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          fill
          className={cn(
            "object-cover transition-opacity duration-700",
            i === current ? "opacity-100" : "opacity-0"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={i === 0}
        />
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prev();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/45 rounded-full p-1.5 transition-all duration-200 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          next();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/45 rounded-full p-1.5 transition-all duration-200 z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrent(i);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === current
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
