"use client"

import { useState, useEffect } from "react"
import { Bot, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { AGENTS } from "@/lib/content"

export function AgentCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % AGENTS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + AGENTS.length) % AGENTS.length)
  const next = () => setCurrent((c) => (c + 1) % AGENTS.length)
  const agent = AGENTS[current]

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="gold-line mx-auto w-16 mb-4" />
        <h2 className="text-3xl font-bold tracking-tight">9 AI Agents</h2>
        <p className="mt-2 text-muted-foreground">Specialized intelligence for every task.</p>
      </div>

      {/* Main carousel card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-brand/5">
        {/* Header bar with gold accent */}
        <div className="flex items-center justify-between border-b divider-gold px-8 py-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15">
              <Bot className={`h-5 w-5 ${agent.color}`} />
            </div>
            <div>
              <span className="text-lg font-bold">{agent.name}</span>
              <span className="ml-2 text-sm text-muted-foreground">Agent</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-brand" />
            {current + 1} / {AGENTS.length}
          </div>
        </div>

        {/* Description */}
        <div className="px-8 py-6 min-h-[100px] flex items-center">
          <p className="text-base leading-relaxed text-muted-foreground">{agent.desc}</p>
        </div>

        {/* Navigation bar */}
        <div className="flex items-center justify-between border-t border-border/50 px-6 py-3 bg-muted/20">
          <button onClick={prev} className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" aria-label="Previous agent">
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {AGENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-brand" : "w-2 bg-muted-foreground/25 hover:bg-muted-foreground/40"}`}
                aria-label={`Agent ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={next} className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" aria-label="Next agent">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
