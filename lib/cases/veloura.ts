import type { CaseStudy } from "./types";

export const veloura: CaseStudy = {
  live: "https://veloura.nazmulhussain.com",
  role: "Full-stack developer",
  org: "Personal",
  platform: "Web, 2026",
  stack: "Next.js, TypeScript, React, GraphQL, Vendure, PostgreSQL, Shadcn UI, Radix UI, Zod",
  tags: ["Web", "E-commerce", "Next.js", "TypeScript", "GraphQL", "Vendure", "PostgreSQL"],
  summary:
    "Veloura is a headless commerce platform built on Vendure with a custom Next.js GraphQL storefront and TypeScript admin plugins. It covers the full shopper journey — search, faceted filters, cart, multi-step checkout, order history, and customer accounts — plus a content-block plugin for configurable storefront sections.",
  objective:
    "Build Veloura to practice real headless commerce: a custom Next.js GraphQL storefront against Vendure, plus TypeScript admin plugins so marketing content can be configured without redeploying the shop for every copy change.",
  tasks: [
    "Headless storefront with Next.js, TypeScript, and GraphQL against Vendure",
    "Catalog UX — search, faceted filters, and product browsing",
    "Cart, multi-step checkout, order history, and customer accounts",
    "Content-block plugin for banners, hero sliders, and announcements",
    "Vendure admin UI extensions in TypeScript for content and merchandising",
  ],
  features: [
    ["Headless storefront", "Next.js + GraphQL against a Vendure commerce backend."],
    ["Catalog UX", "Search, faceted filters, and product browsing."],
    ["Cart & checkout", "Multi-step checkout and order history."],
    ["Customer accounts", "Email verification, profile/address management, and session-based auth."],
    ["Content blocks", "Configurable banners, hero sliders, and announcements."],
    ["Admin extensions", "TypeScript plugins for content and merchandising in Vendure admin."],
  ],
  arch: [
    [
      "Next.js storefront",
      "Shop · account",
      "Shopper-facing GraphQL client for catalog, cart, checkout, order history and customer accounts.",
    ],
    [
      "Vendure admin",
      "+ custom plugins",
      "Operator UI with TypeScript extensions for content blocks and merchandising workflows.",
    ],
    [
      "Vendure server",
      "Commerce API · GraphQL",
      "Headless commerce core — products, orders, customers and custom content-block entities.",
    ],
    [
      "PostgreSQL",
      "Catalog · orders",
      "Persists catalog, orders, customers and plugin entities that power the storefront and admin.",
    ],
  ],
  archCaption:
    "Storefront and admin both talk to Vendure over GraphQL. Custom plugins add content-block entities and admin UI so marketing sections can be configured without redeploying the storefront for every copy change.",
  gallery: [
    "home-hero",
    "hero-menswear",
    "hero-street-collection",
    "shop-catalog",
    "product-detail",
    "blog-and-footer",
  ].map((n) => `/img/projects/veloura/${n}-16x10.webp`),
};
