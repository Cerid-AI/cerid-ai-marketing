// Copyright (c) 2026 Cerid AI. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

// Creates a Stripe Checkout Session for the Pro subscription and returns its URL.
// Two plans map to two live prices; defaults to monthly. 14-day trial applied.

import { NextResponse } from "next/server";

import { getStripe, siteUrl } from "@/lib/stripe";

export const runtime = "nodejs";

const PRICE_ENV: Record<string, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_ID_PRO_MONTHLY,
  annual: process.env.STRIPE_PRICE_ID_PRO_ANNUAL,
};

export async function POST(req: Request) {
  let plan = "monthly";
  try {
    const body = (await req.json()) as { plan?: string };
    if (body.plan === "annual" || body.plan === "monthly") plan = body.plan;
  } catch {
    // empty/invalid body → default monthly
  }

  const priceId = PRICE_ENV[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Pricing is not configured." }, { status: 503 });
  }

  // Server-configured base URL — NEVER the request Origin header (an attacker
  // could steer the post-payment redirect, leaking the session_id off-site).
  const base = siteUrl();
  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: { trial_period_days: 14 },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      custom_text: {
        submit: {
          message:
            "Private, self-hosted AI. Your 14-day trial starts now — cancel anytime from Settings → Pro.",
        },
      },
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/pricing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe checkout session create failed:", e);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
