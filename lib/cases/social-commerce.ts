import type { CaseStudy } from "./types";

export const socialCommerce: CaseStudy = {
  role: "Full-stack developer",
  org: "Personal",
  platform: "Web, 2026",
  stack:
    "Next.js, TypeScript, React, Express, PostgreSQL, Drizzle ORM, Redis, BullMQ, Tailwind CSS, Zod, Turborepo",
  tags: ["Web", "SaaS", "Multi-tenant", "Next.js", "TypeScript", "Express", "PostgreSQL", "Redis", "BullMQ"],
  summary:
    "Social Commerce is a multi-tenant SaaS for Facebook, WhatsApp, and Instagram sellers in Bangladesh. Shop owners turn inbox sales into orders, invoices, payments, and deliveries — with Bangla documents, local wallets, and courier-ready workflows — without needing a website or ERP.",
  objective:
    "Build Social Commerce so Bangladeshi Facebook, WhatsApp, and Instagram sellers can run one connected workflow — message → order → invoice → shipment → payment → delivery — without Shopify, without an ERP, and without a website. The work covers multi-tenant SaaS isolation, dual operator audiences (platform staff vs shop owners), JWT + BFF auth with RBAC, plan-aware billing, and a commerce domain designed for Bangla invoices, bKash/Nagad/Rocket, and local couriers.",
  tasks: [
    "Product and domain design: MVP scope, business rules, localization (BDT, Asia/Dhaka, +880 phones), and commerce module boundaries",
    "Multi-app Turborepo architecture: API, Platform console, Tenant dashboard, Landing, Worker, and Scheduler",
    "Express API with JWT auth (access + refresh), session rotation, Zod validation, OpenAPI/Scalar docs, and server-side tenant isolation",
    "Next.js BFF pattern — httpOnly cookies on the app origin; tokens never exposed to browser JS",
    "Platform layer: tenants, plans, subscriptions, billing events, feature flags, onboarding, and operator IAM",
    "Tenant IAM and organization primitives (company, branch, department, designation) as the shared foundation for commerce",
    "Shared-database multi-tenancy strategy with tenant_id scoping and plan-enforcement hooks",
    "Background architecture: Redis + BullMQ worker/scheduler so the API stays thin; commerce MVP specs for customers, products, orders, invoices, and payments",
  ],
  features: [
    ["Multi-tenant SaaS", "Platform billing separate from shop invoices and payments, with plan tiers and limit enforcement."],
    ["Dual-audience auth", "Platform operators vs tenant users, with computed RBAC and server-side tenant isolation."],
    ["BFF sessions", "Server-first Next.js BFF with httpOnly cookies — tokens never exposed to browser JS."],
    ["Inbox → order", "Owner-first MVP: customer → order (Facebook/WhatsApp/Instagram/phone/walk-in) → invoice → payment."],
    ["BD localization", "Bangla/English documents, BDT amounts, Dhaka timezone, and E.164 +880 phones."],
    ["Local payments", "Paid / due / partial / COD across cash, bKash, Nagad, Rocket, and bank."],
  ],
  arch: [
    [
      "Platform console",
      "Tenants · billing",
      "SaaS operators manage tenants, plans, subscriptions, billing events, feature flags and onboarding.",
    ],
    [
      "Dashboard",
      "One shop",
      "Shop owners run customers, products, orders, invoices and payments for a single tenant.",
    ],
    [
      "Landing",
      "Marketing",
      "Public marketing site with no tenant login — separate from the authenticated apps.",
    ],
    [
      "Express API",
      "JWT · RBAC · BFF",
      "Security boundary for identity, sessions, tenants, roles and permissions. Next.js apps are BFF + UI only.",
    ],
    [
      "PostgreSQL",
      "Shared DB",
      "Shared-database multi-tenancy with tenant_id scoping; platform billing tables stay apart from shop invoices.",
    ],
    [
      "Redis · BullMQ",
      "Worker · jobs",
      "Long-running work — courier sync, messaging, reports — runs out-of-band so HTTP stays thin.",
    ],
  ],
  archCaption:
    "Express is the source of truth for identity, sessions, tenants, roles, and permissions. Next.js apps are BFF + UI only. Platform billing tables stay separate from shop invoices and payments. Background work is enqueued to Redis/BullMQ so HTTP stays thin. MVP sales path: order from a Facebook/WhatsApp/Instagram message (manual entry, sourceChannel), link customer and products, issue a Bangla/English invoice, record cash or wallet payment (including COD), then complete delivery.",
  gallery: [
    "overview",
    "bangla-invoice",
    "payments",
    "deliveries",
    "platform-tenants",
  ].map((n) => `/img/projects/social-commerce/${n}-16x10.webp`),
};
