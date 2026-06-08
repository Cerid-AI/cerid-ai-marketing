// Copyright (c) 2026 Cerid AI. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

// Ed25519 license-key issuer (server-only). Mints offline-verifiable keys that
// the self-hosted Cerid app validates with the embedded PUBLIC key. The PRIVATE
// signing key lives only in this server's env (CERID_LICENSE_PRIVATE_KEY).
//
// The signed payload bytes are byte-identical to what the Python verifier
// expects (src/mcp/utils/license.py): struct.pack(">HBBI", expiry_day,
// tier_byte, version=0x02, email_fp). A key minted here verifies there unchanged.

import crypto from "node:crypto";

const TIER_BYTES: Record<string, number> = { pro: 0x01, enterprise: 0x02 };
const VERSION = 0x02; // 0x02 = Ed25519 (0x01 was the retired HMAC scheme)
const SECONDS_PER_DAY = 86400;
const B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; // RFC 4648
// PKCS#8 DER prefix for an Ed25519 private key; the 32-byte raw seed follows.
// Lets us build a KeyObject from a raw base64 seed with no extra dependency.
const PKCS8_ED25519_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex");

/** RFC 4648 base32, uppercase, padding stripped (matches the Python decoder). */
function b32encode(data: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of data) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32_ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

function privateKeyFromRawSeed(b64seed: string): crypto.KeyObject {
  const seed = Buffer.from(b64seed, "base64");
  if (seed.length !== 32) {
    throw new Error("CERID_LICENSE_PRIVATE_KEY must be a base64-encoded 32-byte Ed25519 seed");
  }
  return crypto.createPrivateKey({
    key: Buffer.concat([PKCS8_ED25519_PREFIX, seed]),
    format: "der",
    type: "pkcs8",
  });
}

export type Tier = "pro" | "enterprise";

/**
 * Generate a signed, offline-verifiable license key.
 *
 * @param email Purchaser email — only a 4-byte sha256 fingerprint is embedded.
 * @param tier "pro" (default) or "enterprise".
 * @param daysValid Days until expiry; 0 = perpetual. Embedded in the signed payload.
 * @returns `CERID-PRO-` + base32 groups of 4.
 */
export function generateLicenseKey(email: string, tier: Tier = "pro", daysValid = 365): string {
  const privB64 = process.env.CERID_LICENSE_PRIVATE_KEY;
  if (!privB64) throw new Error("CERID_LICENSE_PRIVATE_KEY is not set");
  const tierByte = TIER_BYTES[tier];
  if (tierByte === undefined) throw new Error(`Unknown tier '${tier}'`);
  if (daysValid < 0) throw new Error("daysValid must be >= 0 (0 = perpetual)");

  const expiryDay =
    daysValid === 0 ? 0 : Math.floor(Date.now() / 1000 / SECONDS_PER_DAY) + daysValid;
  if (expiryDay > 0xffff) throw new Error("daysValid too large: expiry exceeds the representable range");

  const emailFp = crypto.createHash("sha256").update(email.toLowerCase()).digest().subarray(0, 4);
  const payload = Buffer.alloc(8); // struct.pack(">HBBI", ...)
  payload.writeUInt16BE(expiryDay, 0);
  payload.writeUInt8(tierByte, 2);
  payload.writeUInt8(VERSION, 3);
  emailFp.copy(payload, 4); // sha256(email)[:4] big-endian — identical to packing the uint32 BE

  const sig = crypto.sign(null, payload, privateKeyFromRawSeed(privB64)); // 64 bytes
  const body = b32encode(Buffer.concat([payload, sig]));
  const groups = body.match(/.{1,4}/g)!.join("-");
  return `CERID-PRO-${groups}`;
}
