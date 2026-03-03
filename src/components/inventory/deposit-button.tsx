"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface DepositButtonProps {
  itemId: string;
  itemTitle: string;
}

export function DepositButton({ itemId, itemTitle }: DepositButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDeposit() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "inventory",
          itemId,
          itemTitle,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleDeposit}
      disabled={loading}
    >
      <CreditCard className="w-5 h-5 mr-2" />
      {loading ? "Starting Checkout..." : "Reserve with $500 Deposit"}
    </Button>
  );
}
