import Link from "next/link";
import { CheckCircle, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deposit Confirmed",
  description: "Your $500 deposit has been received. Our team will contact you shortly.",
};

export default function ConfirmationPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
      <div className="text-center px-4 max-w-lg">
        <div className="w-20 h-20 bg-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-sea-green" />
        </div>

        <h1 className="text-3xl font-bold text-navy mb-4">
          Deposit Received!
        </h1>

        <p className="text-slate-600 mb-2">
          Your <span className="font-semibold text-navy">$500 deposit</span>{" "}
          has been successfully processed. Your boat is now reserved.
        </p>

        <p className="text-slate-500 text-sm mb-8">
          Our team at Salty Boats will contact you within 1-2 business days to
          discuss next steps, arrange full payment, and coordinate
          pickup/delivery.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 text-left">
          <h3 className="font-bold text-navy text-sm mb-3">What happens next?</h3>
          <ol className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ocean text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>
                You&apos;ll receive an email confirmation from Stripe with your
                receipt.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ocean text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>
                Our team will review your order and contact you to discuss
                remaining balance and timeline.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ocean text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>
                Once the full payment is arranged, we&apos;ll prepare your boat
                for pickup or delivery.
              </span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button>
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
