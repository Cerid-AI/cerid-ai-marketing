import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Features — Cerid AI",
  description:
    "Constellation map, accumulating wiki, claim verification, TrustScore, hybrid RAG, memory, and 22 source connectors — full feature breakdown.",
}

import { ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AgentCarousel } from "@/components/agent-carousel"
import { DemoVideo } from "@/components/demo-video"
import { CATEGORIES } from "@/lib/content"

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-circuit py-24 border-b divider-gold">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <div className="gold-line w-16 mb-6" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Features
              </h1>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                Every capability, from casual use to enterprise deployment.
                Click any feature card for technical details.
              </p>
              <Link
                href="https://finance.cerid.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg border border-brand/40 bg-brand/10 px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand/20"
              >
                Try Cerid Finance demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex justify-center">
              <img src="/hero-tagline.jpg" alt="Cerid — Your Private AI Knowledge Companion" className="w-full max-w-lg rounded-xl border border-border/30 shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature categories */}
      {CATEGORIES.map((cat) => (
        <section key={cat.title} id={cat.id} className="py-12 border-b border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold tracking-tight">{cat.title}</h2>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-brand border-brand/30">
                {cat.badge}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {cat.features.map((f) => (
                <details key={f.title} className="group/card">
                  <summary className="cursor-pointer list-none">
                    <Card className="border-border bg-card transition-all hover:border-brand/30 hover:shadow-md hover:shadow-brand/5">
                      <CardHeader className="space-y-2 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                              <f.icon className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-sm">{f.title}</CardTitle>
                          </div>
                          <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open/card:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">{f.casual}</p>
                      </CardHeader>
                    </Card>
                  </summary>
                  <div className="mx-4 mb-3 rounded-b-lg border border-t-0 border-border bg-muted/30 px-4 py-3">
                    <p className="text-[11px] leading-relaxed text-muted-foreground/80 font-mono">
                      {f.technical}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Agents carousel */}
      <section className="py-20 bg-circuit border-b divider-gold">
        <div className="mx-auto max-w-4xl px-6">
          <AgentCarousel />
        </div>
      </section>

      {/* Demo + CTA */}
      <section id="demo" className="bg-circuit py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <DemoVideo defaultCut="90s" showBlurb={false} />
            <div className="text-center md:text-left">
              <div className="gold-line mx-auto mb-4 w-16 md:mx-0" />
              <h2 className="text-2xl font-bold">See it in action</h2>
              <p className="mt-3 text-muted-foreground">
                Live product tour: claim verification, Constellation explore &amp; drill-down,
                wiki pages, TrustScore methodology, and local artifact stores.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Clone the repo and run one command. 12 specialist agents, 55 MCP tools,
                22 source connectors — Free Core forever.
              </p>
              <Link
                href="https://github.com/Cerid-AI/cerid-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:bg-brand/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
