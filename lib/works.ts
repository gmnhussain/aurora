/**
 * Inner pages data: the full project list for /works and the case studies for
 * /works/[slug]. Kept apart from lib/content.ts (the home page's data) on purpose.
 */

const IMG = "https://nazmulhussain.com/img/projects";

export type Category = "Featured" | "More";

export type Work = {
  slug: string;
  title: string;
  sub: string;
  img: string;
  category: Category;
  /** Position in the list, 0-based. */
  i: number;
  /** Position as shown, "01"… */
  n: string;
};

export type CaseStudy = {
  live?: string;
  role: string;
  org: string;
  platform: string;
  stack: string;
  tags: string[];
  summary: string;
  objective: string;
  tasks: string[];
  /** [title, sentence] */
  features: [string, string][];
  /** [title, sub, description]. Descriptions were written for the design; confirm with the owner. */
  arch: [string, string, string][];
  archCaption: string;
  gallery: string[];
};

export const pad2 = (n: number) => String(n).padStart(2, "0");

const RAW: [string, string, string, string, Category][] = [
  ["smartgate", "SmartGate", "Multi-office attendance sync for DGHS", "smartgate/smartgate-02.jpg", "Featured"],
  ["price-comparison", "Prixise", "Price comparison & affiliate platform", "price-comparison/price-comparison-01.jpg", "Featured"],
  ["social-commerce", "Social Commerce", "SaaS for Bangladeshi social sellers", "social-commerce/social-commerce-01.jpg", "Featured"],
  ["gatewise", "Gatewise", "Access control console for Dahua devices", "gatewise/gatewise-02.jpg", "Featured"],
  ["veloura", "Veloura", "Headless e-commerce platform on Vendure", "veloura/veloura-02.jpg", "Featured"],
  ["pulse-hr", "PulseHR", "Multi-tenant workforce management platform", "pulsehr/pulsehr-01.jpg", "Featured"],
  ["holy-quran", "Holy Quran", "Multilingual, multi-domain Quran app", "quran-web/quran-web-01.jpg", "More"],
  ["islamic-blog", "Islamic Blog", "Multi-site blogging platform for Islamic scholars", "islamic-blog/islamic-blog-03.jpg", "More"],
  ["quran-radio", "Quran Radio", "Mobile app for Quranic recitations", "quran-radio/quran-radio-01.jpg", "More"],
];

export const WORKS: Work[] = RAW.map(([slug, title, sub, img, category], i) => ({
  slug,
  title,
  sub,
  img: `${IMG}/${img}`,
  category,
  i,
  n: pad2(i + 1),
}));

export const WORK_FILTERS: ("All" | Category)[] = ["All", "Featured", "More"];

export const CASES: Record<string, CaseStudy> = {
  gatewise: {
    live: "https://gatewise.nazmulhussain.com",
    role: "Full-stack developer",
    org: "API Solutions Ltd.",
    platform: "Web, 2026",
    stack: "Next.js, TypeScript, React, Express, PostgreSQL, Drizzle ORM, Redis, BullMQ, Tailwind CSS, Zod",
    tags: ["Web", "Access control", "Next.js", "TypeScript", "Express", "PostgreSQL", "Redis", "BullMQ"],
    summary:
      "Gatewise is an intelligent access and identity console for Dahua face and door controllers. Operators manage a central person registry and person groups; background jobs sync cards and faces to the right devices with queued imports, migration safety and RBAC.",
    objective:
      "Build a central operator console for Dahua face and access controllers so people are enrolled once, assigned through person groups, and synchronised to the right devices asynchronously — without typing the same person into every terminal.",
    tasks: [
      "Full-stack product: Next.js operator console, Express REST API and a BullMQ device worker",
      "Central person registry with person groups and many-to-many group ↔ device mapping",
      "Desired-state reconciliation (ENSURE / REMOVE) with per-device sync rows and generation guards",
      "Dahua CGI adapter — digest auth, concurrency limits, RecNo capture, face enrol and query-encoding quirks",
      "Queued bulk import (Excel/CSV → zip), dry-run, per-row reports and face photo normalisation",
      "Migration cutover with conflict review, removal dry-run and safe-removal gating",
      "JWT/RBAC operator auth, encrypted device credentials, audit trail and factory-reset lifecycle controls",
      "In-app help and user manual for operators",
    ],
    features: [
      ["Central registry", "Persons, person groups and device registration for Dahua ASI-series controllers."],
      ["Background sync", "BullMQ jobs create, update, remove and face-enrol — with live progress and cancel."],
      ["Bulk onboarding", "Excel or CSV imports with dry-run validation and face enrolment."],
      ["Safe migrations", "Multi-device cutover with attribute-conflict review and deferred removals."],
      ["Operator safety", "RBAC, audit logging, and destructive resets behind challenge confirmation."],
      ["BFF proxy", "The browser only talks to Next.js; scripts reach the API with an API key."],
    ],
    arch: [
      ["Next.js console", "BFF · JWT session", "Operators manage people, groups and devices. The browser only ever talks to Next.js, which holds the JWT session."],
      ["Express API", "REST · RBAC · adapter", "REST endpoints behind role-based access, with audit logging and encrypted device credentials."],
      ["PostgreSQL", "Source of truth", "Holds the desired state — persons, groups, group ↔ device mapping and a sync row per device."],
      ["Redis · BullMQ", "Async device jobs", "Queues create, update, remove and face-enrol jobs, with generation guards so stale work never lands."],
      ["Dahua devices", "Digest CGI", "A throttled Digest CGI client pushes the card first, enrols the face separately and stores RecNo for safe deletes."],
    ],
    archCaption:
      "Operators manage the desired state in PostgreSQL. The worker pushes that state to Dahua controllers through a throttled Digest CGI client — card first, face enrol separately, with RecNo stored for safe deletes.",
    gallery: [3, 4, 5, 6, 7, 8, 9, 10].map((n) => `${IMG}/gatewise/gatewise-${pad2(n)}.jpg`),
  },
};

export const workBySlug = (slug: string) => WORKS.find((w) => w.slug === slug);

/** Curtain label for an inner route. */
export function routeLabel(pathname: string) {
  if (pathname === "/works") return "Works";
  if (pathname === "/contact") return "Contact";
  const m = pathname.match(/^\/works\/([^/]+)$/);
  if (m) return workBySlug(m[1])?.title ?? "404";
  return "404";
}
