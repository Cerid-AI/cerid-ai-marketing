// Copyright (c) 2026 Cerid AI. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

// Stripe webhook receiver. Verifies the signature, then on a completed checkout
// mints the customer's Ed25519 license key. Primary key delivery is the /success
// page (the buyer sees it immediately); this handler logs the issuance for the
// operator record and is the hook for future email delivery. Idempotent: it only
// derives a key (no external state), so Stripe's at-least-once retries are safe.

import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { generateLicenseKey } from "@/lib/license";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 503 });
  }
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, signature, secret);
  } catch (e) {
    // Bad signature or malformed payload — 400 so Stripe stops retrying.
    console.warn("Stripe webhook verification failed:", e);
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email ?? "";
    if (email) {
      const key = generateLicenseKey(email, "pro", 365);
      console.info("Issued Pro license key for %s (%s…)", email, key.slice(0, 14));
    } else {
      console.warn("checkout.session.completed without an email; no key issued");
    }
  }

  return NextResponse.json({ received: true });
}
