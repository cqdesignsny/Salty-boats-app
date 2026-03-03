import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-4">
              SALTY <span className="text-ocean">BOATS</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Florida&apos;s home for quality skiffs and bay boats. Three brands,
              one commitment to getting you on the water.
            </p>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Our Brands
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/brands/stumpnocker" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  Stumpnocker
                </Link>
              </li>
              <li>
                <Link href="/brands/palmetto-bay" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  Palmetto Bay Boats
                </Link>
              </li>
              <li>
                <Link href="/brands/salty-skiffs" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  Salty Skiffs
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/build-your-boat" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  Build Your Boat
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-ocean transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-ocean flex-shrink-0" />
                <a href="mailto:sales@saltyboats.com" className="hover:text-ocean transition-colors">
                  sales@saltyboats.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-ocean flex-shrink-0" />
                <a href="tel:+13527481161" className="hover:text-ocean transition-colors">
                  (352) 748-1161
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-ocean flex-shrink-0 mt-0.5" />
                <span>900 Industrial Drive, Wildwood, FL 34785</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Salty Boats. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/dealers" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Dealer Locator
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
