import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service — Cerid AI",
  description:
    "The terms governing Cerid Core (open source) and Cerid Pro subscriptions: billing, trial, cancellation, refunds, license, and acceptable use.",
}

const EFFECTIVE = "June 9, 2026"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Effective {EFFECTIVE}</p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        These terms govern your use of Cerid AI software and the Cerid Pro subscription. By installing
        Cerid AI or subscribing to Cerid Pro, you agree to these terms.
      </p>

      <div className="mt-10 space-y-10">
        <Section title="The software">
          <p>
            Cerid Core is open-source software distributed under the Apache-2.0 license; your use of the
            source code is governed by that license. Cerid AI is self-hosted — you run it on your own
            infrastructure and are responsible for your deployment, data, and any model-provider keys
            you configure.
          </p>
        </Section>

        <Section title="Cerid Pro subscription">
          <p>
            Cerid Pro unlocks commercial plugins and advanced features. It is offered at{" "}
            <strong>$15/month</strong> or <strong>$144/year</strong>, with a <strong>14-day free
            trial</strong>. Subscriptions are billed through Stripe and renew automatically at the end
            of each billing period until cancelled. Applicable taxes may apply.
          </p>
          <p>
            Your trial begins when you start it. If you do not cancel before the trial ends, your card
            is charged for the first period. Prices may change with notice; changes apply to the next
            renewal, never retroactively.
          </p>
        </Section>

        <Section title="Cancellation &amp; refunds">
          <p>
            You can cancel anytime from the in-app <strong>Settings → Pro → Manage subscription</strong>{" "}
            link or at{" "}
            <Link href="/billing" className="text-primary hover:underline">
              cerid.ai/billing
            </Link>
            . On cancellation, your Pro access continues through the end of the current paid period and
            then reverts to Core; you are not charged again.
          </p>
          <p>
            Cancelling during the free trial incurs no charge. For charges already made, contact{" "}
            <a href="mailto:support@cerid.ai" className="text-primary hover:underline">
              support@cerid.ai
            </a>{" "}
            — we handle refund requests fairly and in line with applicable consumer-protection law.
          </p>
        </Section>

        <Section title="License keys">
          <p>
            A Cerid Pro subscription grants you a license key to activate Pro features on your
            self-hosted install. License keys are for your own use and may not be resold, shared, or
            redistributed. We may revoke a key for non-payment, fraud, or breach of these terms.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            Don&apos;t use Cerid AI to break the law, infringe others&apos; rights, or attempt to
            circumvent licensing or security controls. You are responsible for the content you ingest
            and the model providers you connect.
          </p>
        </Section>

        <Section title="Disclaimers &amp; liability">
          <p>
            Cerid AI is provided &quot;as is,&quot; without warranties of any kind to the maximum extent
            permitted by law. AI-generated output can be inaccurate — verify important results. To the
            extent permitted by law, Cerid AI&apos;s aggregate liability is limited to the amount you
            paid for Cerid Pro in the 12 months preceding the claim.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these terms as the product evolves. Material changes are reflected by an
            updated effective date above; continued use after a change constitutes acceptance.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions? Email{" "}
            <a href="mailto:support@cerid.ai" className="text-primary hover:underline">
              support@cerid.ai
            </a>
            . See also our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </Section>
      </div>
    </main>
  )
}
