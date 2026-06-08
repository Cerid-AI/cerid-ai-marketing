"use client";

// Shows the issued license key with a copy-to-clipboard button.

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function LicenseKeyDisplay({ licenseKey }: { licenseKey: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the key is still selectable on screen
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <code className="block break-all rounded-md border bg-muted px-4 py-3 font-mono text-sm">
        {licenseKey}
      </code>
      <Button onClick={copy} variant="outline" className="self-start gap-2">
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : "Copy key"}
      </Button>
    </div>
  );
}
