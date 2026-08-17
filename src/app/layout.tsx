import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cerid AI — Private AI Knowledge Companion",
  description:
    "Self-hosted AI knowledge companion: claim verification, Constellation map, accumulating wiki, disclosed TrustScore. Free Core. Source-available FSL.",
  metadataBase: new URL("https://cerid.ai"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Cerid AI — Private AI Knowledge Companion",
    description:
      "Verified answers. Navigable knowledge map. Wiki that accumulates. Knowledge stores stay on your machine.",
    url: "https://cerid.ai",
    siteName: "Cerid AI",
    type: "website",
    images: [
      {
        url: "/demo-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Cerid product demo — Constellation knowledge map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cerid AI — Private AI Knowledge Companion",
    description:
      "Self-hosted AI with claim verification, Constellation map, wiki, and TrustScore. Free Core · FSL source-available.",
    images: ["/demo-poster.jpg"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Cerid AI",
      url: "https://cerid.ai",
      logo: "https://cerid.ai/cerid-logo.svg",
      description:
        "Self-hosted, privacy-first AI knowledge companion with claim verification and a live knowledge map.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Cerid AI",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows (WSL2)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Private AI knowledge companion: hybrid retrieval, per-claim verification, Constellation map, accumulating wiki, disclosed TrustScore. Free Core.",
      url: "https://cerid.ai",
      downloadUrl: "https://github.com/Cerid-AI/cerid-ai",
    },
    {
      "@type": "VideoObject",
      name: "Cerid AI product tour (90s)",
      description:
        "Live product sizzle: claim verification, Constellation explore, wiki, TrustScore, and local sources.",
      thumbnailUrl: "https://cerid.ai/demo-poster.jpg",
      contentUrl: "https://cerid.ai/cerid-90s-demo.mp4",
      uploadDate: "2026-08-16",
      duration: "PT1M30S",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="vignette" aria-hidden="true" />
        <Navbar />
        <main className="relative z-[2] min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
