"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-sea-green/10 border border-sea-green/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-sea-green" />
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3>
        <p className="text-slate-600">
          Thanks for reaching out. We&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">
          Phone (optional)
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
          placeholder="(555) 123-4567"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors resize-none"
          placeholder="Tell us about the boat you're looking for, or ask any questions..."
        />
      </div>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
