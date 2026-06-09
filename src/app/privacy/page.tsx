import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Cerid AI",
  description:
    "How Cerid AI handles data: the self-hosted app keeps your knowledge local, billing is processed by Stripe, and telemetry is opt-in.",
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

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Effective {EFFECTIVE}</p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Cerid AI is a privacy-first, self-hosted knowledge companion. Our guiding principle is simple:
        your knowledge stays on your infrastructure, and we collect as little as possible. This policy
        explains what data is involved across the self-hosted app, this website, and billing.
      </p>

      <div className="mt-10 space-y-10">
        <Section title="The self-hosted app">
          <p>
            Cerid AI runs on your own machine or servers. Your documents, embeddings, knowledge graph,
            memory, and metadata are stored locally (ChromaDB, Neo4j, Redis) and never sent to us. When
            you run a query, only the relevant context you choose is sent to the LLM provider you
            configure (or nothing leaves your network at all if you run a local model via Ollama).
          </p>
          <p>
            Cerid AI does not receive, store, or have access to the contents of your knowledge base.
            You control your data, your model provider keys (encrypted at rest on your install), and
            your retention settings.
          </p>
        </Section>

        <Section title="This website (cerid.ai)">
          <p>
            The marketing site collects minimal information needed to operate it. We use Sentry for
            error monitoring; it may record technical diagnostics (e.g., error traces, browser/runtime
            details) to keep the site reliable. We do not sell personal data.
          </p>
        </Section>

        <Section title="Billing &amp; payments">
          <p>
            Payments for Cerid Pro are processed by <strong>Stripe</strong>. When you subscribe, Stripe
            collects and processes your payment details (card information, billing contact, and email)
            under{" "}
            <Link
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Stripe&apos;s Privacy Policy
            </Link>
            . We do not see or store your full card details. We receive limited billing metadata from
            Stripe (such as your email, subscription status, and the last four digits of your card) to
            manage your subscription and issue your license key.
          </p>
          <p>
            Your Cerid Pro license key embeds only a one-way fingerprint of your email (for support and
            audit) plus the tier and expiry — it does not contain your email or payment details in
            readable form.
          </p>
        </Section>

        <Section title="Third parties we rely on">
          <p>
            We keep third parties to a minimum: <strong>Stripe</strong> (payments), our hosting/CDN
            provider for this website, and <strong>Sentry</strong> (error monitoring). For the
            self-hosted app, any LLM provider you connect (e.g., via OpenRouter, or a local model) is
            chosen and controlled by you under that provider&apos;s terms.
          </p>
        </Section>

        <Section title="Data retention &amp; your rights">
          <p>
            Knowledge-base data lives on your install and is retained per your own configuration; you
            can export or delete it at any time. For billing data held by Stripe and limited metadata we
            receive, you may request access, correction, or deletion by contacting us. We retain billing
            records as required for tax and accounting purposes.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy as the product evolves. Material changes will be reflected by an
            updated effective date above.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about privacy? Email{" "}
            <a href="mailto:privacy@cerid.ai" className="text-primary hover:underline">
              privacy@cerid.ai
            </a>
            . See also our{" "}
            <Link href="/security" className="text-primary hover:underline">
              Security
            </Link>{" "}
            page for how the app protects your data.
          </p>
        </Section>
      </div>
    </main>
  )
}
