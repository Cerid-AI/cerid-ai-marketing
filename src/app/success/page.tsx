// Copyright (c) 2026 Cerid AI. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

// Post-checkout page: verifies the Stripe session completed, then mints and shows
// the customer's Ed25519 license key to paste into their self-hosted Cerid app.

import Link from "next/link";

import { generateLicenseKey } from "@/lib/license";
import { verifiedProCheckoutEmail } from "@/lib/stripe";

import { LicenseKeyDisplay } from "./license-key-display";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let licenseKey = "";
  let email = "";
  let error = "";

  if (!sessionId) {
    error = "Missing checkout session.";
  } else {
    try {
      // Only mint when the session is a genuinely completed purchase of a Pro
      // price (verified server-side) — not any arbitrary completed session.
      email = (await verifiedProCheckoutEmail(sessionId)) ?? "";
      if (email) {
        licenseKey = generateLicenseKey(email, "pro", 365);
      } else {
        error =
          "We couldn't verify a completed Pro checkout for this session. " +
          "If you just paid, refresh in a moment, or contact support@cerid.ai.";
      }
    } catch (e) {
      console.error("Success page verification failed:", e);
      error = "We couldn't verify your checkout. Contact support@cerid.ai.";
    }
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-20">
      {licenseKey ? (
        <>
          <h1 className="text-3xl font-semibold">You&apos;re on Cerid Pro 🎉</h1>
          <p className="text-muted-foreground">
            Here&apos;s your license key{email ? ` for ${email}` : ""}. In your Cerid app, open{" "}
            <span className="font-medium">Settings → Pro</span> and paste it to unlock Pro.
            Keep it somewhere safe — you can always re-open this page from your receipt.
          </p>
          <LicenseKeyDisplay licenseKey={licenseKey} />
          <p className="text-sm text-muted-foreground">
            Manage or cancel your subscription anytime at{" "}
            <Link href="/billing" className="font-medium underline">
              cerid.ai/billing
            </Link>
            .
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold">Almost there</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link href="/pricing" className="text-sm underline">
            Back to pricing
          </Link>
        </>
      )}
    </main>
  );
}
