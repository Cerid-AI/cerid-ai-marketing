"use client";

// Starts a Stripe Checkout for the Pro subscription and redirects to it.

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function SubscribeButton({
  plan,
  className,
  children,
}: {
  plan: "monthly" | "annual";
  className: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? "Could not start checkout.");
    } catch {
      setError("Could not start checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={start}
        disabled={loading}
        className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium shadow-sm transition-all disabled:opacity-60 ${className}`}
      >
        {loading ? "Starting…" : children}
        {!loading && <ArrowRight className="h-3.5 w-3.5" />}
      </button>
      {error && <p className="mt-2 text-center text-xs text-destructive">{error}</p>}
    </>
  );
}
