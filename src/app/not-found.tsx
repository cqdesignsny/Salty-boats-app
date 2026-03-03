import Link from "next/link";
import { Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <Anchor className="w-16 h-16 text-ocean mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Looks like this page drifted off course. Let&apos;s get you back to
          familiar waters.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/build-your-boat">
            <Button variant="outline">Build Your Boat</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
