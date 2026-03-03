"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { brands } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Brands",
    href: "#",
    children: brands.map((b) => ({
      label: b.name,
      href: `/brands/${b.slug}`,
      description: b.tagline,
    })),
  },
  { label: "Inventory", href: "/inventory" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Build Your Boat", href: "/build-your-boat" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  return (
    <header className="bg-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/salty-boats-logo-white.svg"
              alt="Salty Boats"
              width={180}
              height={54}
              priority
              className="h-[50px] lg:h-[60px] w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setBrandsOpen(true)}
                  onMouseLeave={() => setBrandsOpen(false)}
                >
                  <button className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1">
                    {link.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", brandsOpen && "rotate-180")} />
                  </button>
                  {brandsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          onClick={() => setBrandsOpen(false)}
                        >
                          <span className="font-semibold text-sm">{child.label}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors",
                    link.label === "Build Your Boat" &&
                      "bg-ocean text-white hover:bg-ocean-dark ml-2"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              if (mobileOpen) setBrandsOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-navy-dark">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="w-full text-left px-4 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between"
                    onClick={() => setBrandsOpen(!brandsOpen)}
                  >
                    {link.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", brandsOpen && "rotate-180")} />
                  </button>
                  {brandsOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          onClick={() => {
                            setMobileOpen(false);
                            setBrandsOpen(false);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors",
                    link.label === "Build Your Boat" &&
                      "bg-ocean text-white hover:bg-ocean-dark text-center mt-4"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
