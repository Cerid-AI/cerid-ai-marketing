// Copyright (c) 2026 Cerid AI. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

// Server-only Stripe client singleton. STRIPE_SECRET_KEY (sk_live_… in prod) is
// read from the environment and never exposed to the browser.

import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key);
  }
  return client;
}

/** Server-configured canonical site URL — never derived from a request header
 *  (an attacker-controlled Origin must not steer Stripe redirect targets). */
export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://cerid.ai";
}

/** The configured live Pro price IDs (monthly, annual). Empty until configured. */
export function proPriceIds(): string[] {
  return [
    process.env.STRIPE_PRICE_ID_PRO_MONTHLY,
    process.env.STRIPE_PRICE_ID_PRO_ANNUAL,
  ].filter((id): id is string => Boolean(id));
}

/**
 * Confirm a Checkout Session is a genuine, completed purchase of a Pro price,
 * then return the customer email to mint a key for. Returns null otherwise.
 * Guards against minting a license from any arbitrary completed session.
 */
export async function verifiedProCheckoutEmail(sessionId: string): Promise<string | null> {
  const allowed = proPriceIds();
  if (allowed.length === 0) return null;
  const session = await getStripe().checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
  if (session.status !== "complete") return null;
  const purchasedPrice = session.line_items?.data?.[0]?.price?.id;
  if (!purchasedPrice || !allowed.includes(purchasedPrice)) return null;
  return session.customer_details?.email ?? null;
}
