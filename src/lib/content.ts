/**
 * Centralised content arrays for the marketing site.
 * Import from here instead of defining inline in page files.
 */

import type { LucideIcon } from "lucide-react"
import {
  FileSearch, Users, Wrench,
  Search, Bot, Database, ShieldCheck, Brain, FileText,
  Eye, Layers, Cpu, FolderOpen, Lock,
  Sparkles, Network, RefreshCw, Workflow, SlidersHorizontal, Globe,
} from "lucide-react"

/* ─────────────────────────────────────────
   Homepage — Feature cards (uses iconName string for ExpandableCard)
───────────────────────────────────────── */

export interface Feature {
  iconName: string
  title: string
  summary: string
  detail: string
  link?: { href: string; label: string }
  image: string
}

export const FEATURES: Feature[] = [
  {
    iconName: "ShieldCheck",
    title: "Know where answers come from",
    summary: "Every answer includes inline citations so you can see exactly which document — and which passage — backs up each claim.",
    detail: "Streaming claim verification with inline source attribution. 4-type claim detection (factual, recency, evasion, citation). Click any footnote to see source, confidence, and reasoning. Expert mode uses frontier models for re-verification.",
    link: { href: "/features#verification", label: "See verification flow" },
    image: "/badge-verification.jpg",
  },
  {
    iconName: "Layers",
    title: "Finds the right part of your documents",
    summary: "Ask a question and Cerid pinpoints the most relevant sections across all your files — even when the answer spans multiple documents.",
    detail: "Three RAG modes (Manual, Smart, Custom Smart) with per-chunk retrieval profiles. Hybrid BM25 + vector search. Cross-encoder reranking. Adaptive pipeline adjusts search depth based on question complexity.",
    link: { href: "/features#retrieval", label: "See pipeline details" },
    image: "/badge-rag.jpg",
  },
  {
    iconName: "Bot",
    title: "Works with the AI you choose",
    summary: "Use Claude, GPT, Gemini, Llama, or run a completely free local model with Ollama. Switch anytime — no lock-in.",
    detail: "Smart capability-based routing across OpenRouter providers. Guided Ollama install wizard. 6 of 8 pipeline tasks run locally at $0. Proactive model switching on ignorance detection.",
    link: { href: "/features#models", label: "See model routing" },
    image: "/badge-byom.jpg",
  },
  {
    iconName: "Brain",
    title: "Gets smarter the more you use it",
    summary: "Cerid remembers your preferences, past decisions, and key facts — so follow-up questions get better answers without repeating yourself.",
    detail: "6-type memory salience scoring: empirical facts, decisions, preferences, project context, temporal events, conversational insights. Memory recall auto-injects alongside KB context.",
    image: "/badge-agents.jpg",
  },
  {
    iconName: "Lock",
    title: "Your data never leaves your device",
    summary: "Everything runs on your machine. No cloud uploads, no telemetry by default. Only the query context you choose is sent to the AI model.",
    detail: "Self-hosted Docker stack with ChromaDB, Neo4j, Redis — all on your machine. Optional Fernet encryption at rest. Open source Apache-2.0.",
    image: "/badge-secure.jpg",
  },
  {
    iconName: "FolderOpen",
    title: "Works with files you already have",
    summary: "Point at a folder and Cerid indexes everything — PDFs, Word docs, spreadsheets, code, emails, even zip archives. Over 30 file types supported.",
    detail: "Bulk folder scan with estimation preview. Archive extraction (zip/tar). Automatic junk filtering. SSE progress streaming with pause/resume controls. 30+ file types supported.",
    image: "/badge-architecture.jpg",
  },
]

/* ─────────────────────────────────────────
   Homepage — Persona cards
───────────────────────────────────────── */

export interface Persona {
  icon: LucideIcon
  title: string
  highlight: string
  bullets: string[]
}

export const PERSONAS: Persona[] = [
  {
    icon: FileSearch,
    title: "For people who need to cite sources",
    highlight: "See which documents back up every answer — with page-level citations you can verify in seconds.",
    bullets: [
      "Researchers, journalists, and lawyers who can't afford unsourced claims",
      "Inline footnotes link every statement to the original passage",
      "Cross-reference findings across thousands of files instantly",
    ],
  },
  {
    icon: Users,
    title: "For teams that can't risk data leaving",
    highlight: "Healthcare, legal, and finance teams get AI answers without uploading a single file to the cloud.",
    bullets: [
      "Everything runs on your machine — documents never leave your network",
      "No telemetry by default, no cloud dependency",
      "Fernet-encrypted credentials and full audit logging",
    ],
  },
  {
    icon: Wrench,
    title: "For builders who want full control",
    highlight: "Self-host with Docker. 21 MCP tools, 9 agents, 33 API routers. Bring your own model or run Ollama free.",
    bullets: [
      "Full REST API with 178 endpoints for custom integrations",
      "Visual workflow builder and plugin system",
      "Apache-2.0 licensed — fork it, extend it, ship it",
    ],
  },
]

/* ─────────────────────────────────────────
   Features page — Category cards
───────────────────────────────────────── */

export interface FeatureItem {
  icon: LucideIcon
  title: string
  casual: string
  technical: string
}

export interface FeatureCategory {
  id?: string
  title: string
  badge: string
  features: FeatureItem[]
}

export const CATEGORIES: FeatureCategory[] = [
  {
    id: "retrieval",
    title: "Retrieval & RAG",
    badge: "Core",
    features: [
      {
        icon: Layers,
        title: "Unified RAG Modes",
        casual: "Three retrieval strategies that adapt to your question — manual control, smart auto-detection, or fully customizable weights.",
        technical: "Manual (pass-through), Smart (parallel KB + memory + external recall with source_breakdown), Custom Smart (Pro — per-source weights, memory type filters). Orchestrator wraps the 22-step agent_query pipeline.",
      },
      {
        icon: Search,
        title: "Hybrid Search",
        casual: "Combines keyword matching with AI-powered understanding for more accurate results than either approach alone.",
        technical: "BM25s stemmed keyword index + Snowflake Arctic v1.5 ONNX embeddings (768-dim Matryoshka). Per-chunk retrieval profiles adjust vector/keyword weights adaptively (keyword 70/30 for structured docs, vector 70/30 for prose).",
      },
      {
        icon: Cpu,
        title: "Cross-Encoder Reranking",
        casual: "Results are re-ranked by a specialized AI model that deeply compares each result to your question.",
        technical: "ms-marco-MiniLM-L-6-v2 ONNX cross-encoder. Profile-aware weights (20% CE / 80% original for keyword-strategy docs). Three modes: cross_encoder, llm_rerank, off.",
      },
      {
        icon: RefreshCw,
        title: "Adaptive Pipeline",
        casual: "The system automatically adjusts how hard it searches based on the complexity of your question.",
        technical: "8-stage pipeline: adaptive retrieval gate → query decomposition (max 4 sub-queries) → hybrid search → profile scoring → reranking → MMR diversity (lambda 0.7) → intelligent assembly → semantic cache (int8 quantized HNSW).",
      },
      {
        icon: Globe,
        title: "External Data Sources",
        casual: "Connect Cerid to live web search, APIs, or external databases — answers can pull from sources beyond your local files.",
        technical: "Pluggable external retrieval adapters (web search via Grok, custom REST endpoints). Source-annotated results flow through the same verification pipeline. Enable per-query or via Smart RAG mode's source_breakdown.",
      },
    ],
  },
  {
    id: "verification",
    title: "Verification",
    badge: "Core",
    features: [
      {
        icon: ShieldCheck,
        title: "Real-Time Claim Verification",
        casual: "Every AI response is automatically checked for accuracy. See inline badges showing which claims are confirmed.",
        technical: "4 claim types (factual, recency, evasion, citation). Streaming SSE with per-claim confidence. 4-level verification cascade: KB → external data sources → cross-model (GPT-4o Mini) → web search (Grok). Monte Carlo evaluation harness with 83-claim corpus.",
      },
      {
        icon: Eye,
        title: "Inline Verification UI",
        casual: "Click any footnote marker to see the source, confidence score, and reasoning behind the verification.",
        technical: "ClaimOverlay popovers with source attribution. Footnote superscripts with pointer-events-auto. Expert mode (Grok 4) for re-verification. Per-message verification selection.",
      },
      {
        icon: RefreshCw,
        title: "Self-RAG Validation Loop",
        casual: "Cerid checks its own answers before showing them — retrieving more context if the initial response isn't well grounded.",
        technical: "Self-RAG agent evaluates retrieval relevance and response groundedness at inference time. ISREL/ISSUP/ISUSE grading. Triggers additional retrieval passes (up to 3 iterations) when confidence falls below threshold. Reduces hallucination without requiring a larger model.",
      },
    ],
  },
  {
    id: "memory",
    title: "Memory & Learning",
    badge: "Core",
    features: [
      {
        icon: Brain,
        title: "6-Type Memory Layer",
        casual: "Cerid remembers facts, decisions, preferences, project context, time-sensitive info, and conversation insights.",
        technical: "Salience formula: base_similarity × source_authority × recency_decay × access_boost × type_weight. FSRS-inspired power-law decay for decisions. Memory recall fires alongside KB query in auto-inject with 500ms timeout.",
      },
      {
        icon: Database,
        title: "Session Dedup",
        casual: "The system tracks what it's already shown you, so follow-up questions get fresh context instead of repeating old information.",
        technical: "injectedHistoryRef tracks artifact:chunk pairs per conversation session. Prior-context note tells the LLM what was shown in earlier turns. History resets on conversation change.",
      },
    ],
  },
  {
    id: "models",
    title: "Models & Infrastructure",
    badge: "Core",
    features: [
      {
        icon: Bot,
        title: "Bring Your Own Model",
        casual: "Use any AI model from any provider. Claude, GPT, Gemini, Llama — or run a free local model.",
        technical: "OpenRouter multi-provider routing. Smart capability-based model scoring with three-way routing (manual/recommend/auto). Proactive model switch on ignorance detection.",
      },
      {
        icon: Sparkles,
        title: "Ollama Local LLM",
        casual: "Install a free local AI model with a guided wizard. 6 of 8 pipeline tasks run locally at zero cost.",
        technical: "Guided install wizard with copy-to-clipboard + auto-detect polling. host.docker.internal fallback for Docker↔native. 6/8 stages local (claim extraction, query decomposition, topic extraction, memory resolution, simple verification, reranking). Per-stage circuit breakers.",
      },
      {
        icon: SlidersHorizontal,
        title: "Tiered Inference",
        casual: "Different tasks automatically use the most cost-effective model — complex reasoning goes to frontier models, simple tasks stay local.",
        technical: "3-tier routing: local (Ollama, free) → mid (OpenRouter small models) → frontier (Claude/GPT-4o). Task-capability matrix maps each pipeline stage to a minimum required tier. Tier override available per-query via model_preference flag.",
      },
      {
        icon: Network,
        title: "Resilient Architecture",
        casual: "If any component slows down, the system gracefully adapts rather than failing completely.",
        technical: "Circuit breakers on all Bifrost + Neo4j calls. 5-tier graceful degradation (full → lite → direct → cached → offline). Shared httpx connection pool. Distributed request tracing via X-Request-ID.",
      },
    ],
  },
  {
    id: "import",
    title: "Import & Management",
    badge: "Core",
    features: [
      {
        icon: FolderOpen,
        title: "Bulk Folder Import",
        casual: "Scan an entire folder, preview what will be imported, then confirm. Handles zip files and filters junk automatically.",
        technical: "Preview with estimation (chunks, storage). Archive extraction (zip/tar.gz). Junk filtering (DS_Store, temp files, Office locks, macOS resource forks). SSE progress streaming. Pause/resume/cancel. Batch limit 100.",
      },
      {
        icon: FileText,
        title: "Universal Parsing",
        casual: "PDFs, Word docs, Excel, emails, ebooks, plain text, code — Cerid handles them all.",
        technical: "pdfplumber with table extraction + Markdown serialization. Parsers: PDF, DOCX, XLSX, CSV, TXT, MD, EML, MBOX, EPUB, RTF. OCR/audio/vision via Pro plugins. Per-chunk retrieval profiles computed at ingest time.",
      },
      {
        icon: Lock,
        title: "Multi-KB Namespace",
        casual: "Organize knowledge into separate spaces that don't mix. Each namespace has its own search index.",
        technical: "KB_NAMESPACE env var. collection_name(domain, namespace) with backward-compatible legacy format. BM25 namespaced directory layout. ChromaDB batch writes (5000 max). BM25 LRU eviction at 8 domains.",
      },
    ],
  },
  {
    id: "automation",
    title: "Automation",
    badge: "Pro",
    features: [
      {
        icon: Workflow,
        title: "Visual Workflow Builder",
        casual: "Chain AI steps together with a drag-and-drop canvas. Build multi-step pipelines without writing code.",
        technical: "DAG execution engine with SVG canvas. Kahn's algorithm for cycle detection. 4 built-in templates (research, summarization, Q&A, custom). Nodes: KB query, LLM call, conditional branch, memory read/write. Exportable as JSON workflow definitions.",
      },
    ],
  },
]

/* ─────────────────────────────────────────
   Pricing page — Plans
───────────────────────────────────────── */

export type PlanVariant = "core" | "pro" | "vault"

export interface Plan {
  name: string
  variant: PlanVariant
  tierImage: string
  price: string
  period: string
  description: string
  badge: string | null
  accent: string
  cta: string
  ctaHref: string
  ctaStyle: string
  features: string[]
}

export const PLANS: Plan[] = [
  {
    name: "Cerid Core",
    variant: "core",
    tierImage: "/core-icon.jpg",
    price: "Free",
    period: "forever",
    description: "Smart. Extensible. Private.",
    badge: null,
    accent: "",
    cta: "Get Started",
    ctaHref: "https://github.com/Cerid-AI/cerid-ai",
    ctaStyle: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
    features: [
      "9 AI agents, 21 MCP tools",
      "Unified RAG (Manual + Smart modes)",
      "Hybrid BM25 + vector search",
      "Per-chunk retrieval profiles",
      "Streaming verification (4 claim types)",
      "6-type memory layer with salience scoring",
      "Ollama local LLM ($0 pipeline costs)",
      "Cross-encoder reranking (ONNX)",
      "Bulk folder import with preview",
      "Multi-machine sync via Dropbox",
      "Simple / Advanced UI mode",
      "Community support",
    ],
  },
  {
    name: "Cerid Pro",
    variant: "pro",
    tierImage: "/pro-wordmark.jpg",
    price: "Paid",
    period: "per seat",
    description: "Smart. Secure. Fully Controlled.",
    badge: "Coming Soon",
    accent: "border-brand/40",
    cta: "Start Free → Upgrade in App",
    ctaHref: "https://github.com/Cerid-AI/cerid-ai",
    ctaStyle: "bg-brand text-brand-foreground hover:bg-brand/90",
    features: [
      "Everything in Core",
      "Custom Smart RAG (per-source weights)",
      "OCR, audio transcription, vision plugins",
      "Metamorphic verification (re-verification using different frontier models to cross-check claims)",
      "Advanced analytics dashboard",
      "Semantic deduplication",
      "Visual workflow builder",
    ],
  },
  {
    name: "Cerid Vault",
    variant: "vault",
    tierImage: "/shield-3d.jpg",
    price: "Contact",
    period: "enterprise",
    description: "Secure by Design. Mission Assured.",
    badge: "Enterprise",
    accent: "border-gold",
    cta: "Contact Sales",
    ctaHref: "mailto:vault@cerid.ai",
    ctaStyle: "bg-gold/10 text-gold border border-gold hover:bg-gold/20",
    features: [
      "Everything in Pro",
      "Multi-user JWT auth + tenant isolation",
      "SSO / SAML integration (planned)",
      "Enterprise audit logging",
      "SLA & priority support",
      "Custom deployment assistance",
    ],
  },
]

/* ─────────────────────────────────────────
   Agent carousel — 9 agents (accurate count)
   Note: Decomposer and Assembler are pipeline
   stages within query_agent, not separate agents.
───────────────────────────────────────── */

export interface Agent {
  name: string
  desc: string
  color: string
}

export const AGENTS: Agent[] = [
  {
    name: "Query",
    desc: "Orchestrates multi-domain KB search with hybrid retrieval, query decomposition, context assembly, and reranking.",
    color: "text-brand",
  },
  {
    name: "Self-RAG",
    desc: "Evaluates retrieval relevance and response groundedness — triggering additional retrieval passes when confidence is low.",
    color: "text-brand",
  },
  {
    name: "Triage",
    desc: "Routes incoming files through the ingestion pipeline — parse, classify, chunk, store.",
    color: "text-brand",
  },
  {
    name: "Curator",
    desc: "Audits knowledge quality, recommends improvements, and scores every artifact.",
    color: "text-brand",
  },
  {
    name: "Rectify",
    desc: "Detects duplicates, stale content, orphaned chunks, and auto-fixes integrity issues.",
    color: "text-brand",
  },
  {
    name: "Audit",
    desc: "Tracks costs, latency, query patterns, and generates usage analytics reports.",
    color: "text-gold",
  },
  {
    name: "Maintenance",
    desc: "Runs scheduled health checks, cleanup, and index optimization in the background.",
    color: "text-gold",
  },
  {
    name: "Memory",
    desc: "Extracts facts, decisions, and preferences from conversations with conflict resolution.",
    color: "text-brand",
  },
  {
    name: "Verification",
    desc: "Validates every AI claim against KB, external sources, and cross-model verification.",
    color: "text-brand",
  },
]
