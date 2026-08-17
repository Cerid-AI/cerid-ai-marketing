import Link from "next/link"

/**
 * Demo player with 90s / 30s toggle via CSS :checked.
 * No client JS required — works even when dev hydration is blocked.
 */
export function DemoVideo({
  defaultCut = "90s",
  className = "",
  showBlurb = true,
}: {
  defaultCut?: "90s" | "30s"
  className?: string
  showBlurb?: boolean
}) {
  const prefer30 = defaultCut === "30s"

  return (
    <div className={`demo-player relative ${className}`}>
      <style>{`
        .demo-player > input { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .demo-player .pane-90, .demo-player .pane-30 { display: none; }
        .demo-player:has(#demo-cut-90:checked) .pane-90 { display: block; }
        .demo-player:has(#demo-cut-30:checked) .pane-30 { display: block; }
        .demo-player:has(#demo-cut-90:checked) label[for="demo-cut-90"],
        .demo-player:has(#demo-cut-30:checked) label[for="demo-cut-30"] {
          border-color: color-mix(in oklab, var(--brand) 50%, transparent);
          background: color-mix(in oklab, var(--brand) 15%, transparent);
          color: var(--brand);
          font-weight: 600;
        }
      `}</style>

      <input
        type="radio"
        name="demo-cut"
        id="demo-cut-90"
        defaultChecked={!prefer30}
      />
      <input
        type="radio"
        name="demo-cut"
        id="demo-cut-30"
        defaultChecked={prefer30}
      />

      <div
        className="mb-4 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Demo length"
      >
        <label
          htmlFor="demo-cut-90"
          role="tab"
          className="cursor-pointer rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground"
        >
          90s tour
        </label>
        <label
          htmlFor="demo-cut-30"
          role="tab"
          className="cursor-pointer rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground"
        >
          30s sizzle
        </label>
      </div>

      <div className="pane-90">
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-black shadow-2xl">
          <video
            src="/cerid-90s-demo.mp4"
            controls
            playsInline
            preload="metadata"
            poster="/demo-poster.jpg"
            className="h-auto w-full"
          >
            <track kind="captions" />
          </video>
        </div>
        {showBlurb && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Verified answers, Constellation explore &amp; drill-down, wiki, TrustScore,
            and key features — captured from the live product.
          </p>
        )}
      </div>

      <div className="pane-30">
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-black shadow-2xl">
          <video
            src="/cerid-30s-demo.mp4"
            controls
            playsInline
            preload="metadata"
            poster="/demo-poster.jpg"
            className="h-auto w-full"
          >
            <track kind="captions" />
          </video>
        </div>
        {showBlurb && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Claim verification &amp; refutation, map explore, local sources — short cut
            for social and quick scans.
          </p>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Self-hosted. Knowledge stores stay local. Source-available under FSL-1.1-ALv2.{" "}
        <Link
          href="https://github.com/Cerid-AI/cerid-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Get Core free
        </Link>
      </p>
    </div>
  )
}
