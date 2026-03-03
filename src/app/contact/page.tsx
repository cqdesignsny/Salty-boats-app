import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Salty Boats team. Questions about our boats, services, or ready to schedule a visit? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-ocean font-semibold text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-white/70 text-lg">
              Have a question about our boats? Want to schedule a visit? We&apos;d
              love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Reach Out
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-ocean/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">Email</p>
                      <a
                        href="mailto:sales@saltyboats.com"
                        className="text-ocean hover:text-ocean-dark transition-colors"
                      >
                        sales@saltyboats.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-ocean/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">Phone</p>
                      <a
                        href="tel:+13527481161"
                        className="text-ocean hover:text-ocean-dark transition-colors"
                      >
                        (352) 748-1161
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-ocean/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">
                        Location
                      </p>
                      <p className="text-slate-600">900 Industrial Drive, Wildwood, FL 34785</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
