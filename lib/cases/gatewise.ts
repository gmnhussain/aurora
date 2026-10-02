import type { CaseStudy } from "./types";

export const gatewise: CaseStudy = {
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
  gallery: [
    "devices",
    "overview-dark",
    "persons",
    "persons-dark",
    "bulk-import",
    "migration",
    "system",
    "help",
    "sign-in",
  ].map((n) => `/img/projects/gatewise/${n}-16x10.webp`),
};
