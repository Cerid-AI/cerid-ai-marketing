// Copyright (c) 2026 Cerid AI. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

// Stable entry point for subscription management. Issues a true HTTP 307 to the
// Stripe-hosted Customer Portal login page (instant, no interstitial). The portal
// login URL is a PUBLIC shareable link (not a secret), shipped as a default and
// overridable via STRIPE_PORTAL_URL. Customers enter their email on Stripe's page
// and get a secure link — no secret key or customer lookup runs here.

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_PORTAL_URL = "https://billing.stripe.com/p/login/bJe7sNgt4552czy8hO2wU00";

export function GET() {
  const portalUrl = process.env.STRIPE_PORTAL_URL?.trim() || DEFAULT_PORTAL_URL;
  return NextResponse.redirect(portalUrl, 307);
}
