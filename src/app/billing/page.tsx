// Copyright (c) 2026 Cerid AI. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

// Stable entry point for subscription management. Redirects to the Stripe-hosted
// Customer Portal login page. Customers enter their email on Stripe's page and
// receive a secure link — no secret key or customer lookup runs here. The
// self-hosted app and post-checkout page both link to /billing.
//
// The portal login URL is a PUBLIC shareable link (not a secret), so it ships as
// a default here and stays overridable via STRIPE_PORTAL_URL — the redirect works
// even if that env var is unset or mis-scoped. Set the env var to "" to fall back
// to the support-email page.

import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const DEFAULT_PORTAL_URL = "https://billing.stripe.com/p/login/bJe7sNgt4552czy8hO2wU00";

export default function BillingPage() {
  const portalUrl = process.env.STRIPE_PORTAL_URL ?? DEFAULT_PORTAL_URL;
  if (portalUrl) redirect(portalUrl);

  // Fallback when the portal login link isn't configured yet.
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 px-6 py-20">
      <h1 className="text-3xl font-semibold">Manage your subscription</h1>
      <p className="text-muted-foreground">
        The self-service billing portal isn&apos;t available right now. Email{" "}
        <a href="mailto:support@cerid.ai" className="underline">
          support@cerid.ai
        </a>{" "}
        and we&apos;ll update or cancel your subscription for you.
      </p>
      <Link href="/" className="text-sm underline">
        Back to home
      </Link>
    </main>
  );
}
