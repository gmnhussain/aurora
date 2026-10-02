import type { CaseStudy } from "./types";

export const priceComparison: CaseStudy = {
  role: "Full-stack developer",
  org: "Personal",
  platform: "Web, 2026",
  stack:
    "Next.js, TypeScript, React, Express, PostgreSQL, Drizzle ORM, Redis, BullMQ, Turborepo, Tailwind CSS, Zod, OpenAPI",
  tags: ["Web", "Price comparison", "Affiliate", "Next.js", "TypeScript", "Express", "PostgreSQL", "Redis", "BullMQ"],
  summary:
    "Prixise is a single-publisher price-comparison and affiliate site. Shoppers discover products, compare verified retailer offers, and click out to buy — while background workers ingest feeds, match products across stores, track price history, and surface deals.",
  objective:
    "Build Prixise so shoppers can find a product once, see every tracked retailer offer with freshness and verification rules, and leave through affiliate links to complete the purchase. The platform is deliberately not a store: no inventory, checkout, or fulfillment — commission comes from click-out attribution. The hard problem is heterogeneous feeds: normalize them, match the same product reliably (GTIN/MPN/style before fuzzy names), keep offers fresh, and send shoppers to the right affiliate URL.",
  tasks: [
    "Product requirements and architecture as a single-publisher catalog (not multi-tenant SaaS)",
    "Turborepo monorepo: public web, admin console, Express API, BullMQ worker, and scheduler",
    "Domain model for products, offers, retailers, brands, categories, price history, and affiliate entities",
    "Feed-oriented ingestion design: adapters for CSV/XML/JSON/API and affiliate-network feeds",
    "Product matching workflow prioritized by identifiers (GTIN → UPC/EAN → MPN → style → brand/model)",
    "Background job pipeline for import, normalize, match, price history, deal detection, and alerts",
    "Affiliate redirect path (/go/offer/:id) with click tracking for commission attribution",
    "Public UX scope: search, product comparison, deals, brands/stores, My List, price-drop alerts, and guides",
  ],
  features: [
    ["Offer comparison", "Multi-retailer offers with lowest verified price and a full offer table per product."],
    ["Feed ingestion", "BullMQ workers parse CSV/XML/JSON/API feeds off the request path."],
    ["Identifier matching", "GTIN → UPC/EAN → MPN → style before fuzzy brand/model names."],
    ["Price history", "Timestamps, history, verified price drops, and deal surfaces."],
    ["Affiliate click-out", "Tracked /go/offer/:id redirects for commission attribution."],
    ["Browse & alerts", "Category/brand/store browse, My List, price-drop alerts, and editorial guides."],
  ],
  arch: [
    [
      "Public web",
      "Next.js · shoppers",
      "Search, product pages, deals and guides. Shoppers compare offers and leave via tracked affiliate redirects.",
    ],
    [
      "Admin console",
      "Operators",
      "Catalog, feeds, matching review and operator workflows for keeping the single-publisher catalog clean.",
    ],
    [
      "Express API",
      "Zod · OpenAPI",
      "Security and business boundary. Web and admin are UI clients only; all writes go through the API.",
    ],
    [
      "PostgreSQL",
      "Catalog",
      "Products, offers, retailers, brands, categories, price history and affiliate entities.",
    ],
    [
      "Redis · BullMQ",
      "Worker jobs",
      "Queues import, normalize, match, price-history, deal detection and alert jobs.",
    ],
    [
      "Feeds · Affiliate",
      "CSV/API · click-out",
      "Retailer and network feeds land as jobs; shoppers exit through tracked affiliate URLs.",
    ],
  ],
  archCaption:
    "Retailer and network feeds land as jobs on Redis/BullMQ. The worker normalizes rows, runs identifier-first matching, writes products and offers to PostgreSQL, and updates price history. The Express API is the security and business boundary; web and admin are UI clients only. Shoppers compare offers on the product page and leave via tracked affiliate redirects.",
  gallery: [
    "product-comparison",
    "verified-deals",
    "price-alerts",
    "admin-feed-ingestion",
    "admin-matching-review",
  ].map((n) => `/img/projects/price-comparison/${n}-16x10.webp`),
};
