import type { CaseStudy } from "./types";

export const pulseHr: CaseStudy = {
  live: "https://app.pulsehr.nazmulhussain.com",
  role: "Full-stack developer",
  org: "Personal",
  platform: "Web, 2026",
  stack:
    "Next.js, TypeScript, Shadcn UI, TanStack Query, Express, Drizzle ORM, PostgreSQL, Redis, Turborepo",
  tags: ["Web", "SaaS", "HRM", "Next.js", "TypeScript", "Express", "PostgreSQL", "Redis"],
  summary:
    "PulseHR is a multi-tenant HRM SaaS built to explore real SaaS architecture: JWT auth, tenant isolation, RBAC across an admin dashboard and employee self-service (ESS) portal, an event-driven attendance pipeline, and a platform operator console for tenant lifecycle, plans, billing, and feature flags.",
  objective:
    "Build PulseHR to practice the hard parts of a real SaaS product: isolating tenant data, splitting day-to-day HR work from platform operations, and modeling attendance as an event pipeline instead of a single table. The goal was a complete system I could run, demo, and keep extending.",
  tasks: [
    "Product ideation, domain modeling, and monorepo architecture with Turborepo",
    "Full-stack development of the admin dashboard, ESS portal, and platform console",
    "Express REST API with JWT auth, tenant isolation, and RBAC",
    "Event-driven attendance pipeline (punches → sessions → daily summaries)",
    "Shift and roster scheduling with exception handling and approval workflows",
    "Platform operator flows for tenants, subscription plans, billing, monitoring, and feature flags",
    "OpenAPI documentation for the modular REST API",
  ],
  features: [
    ["Multi-tenant SaaS", "JWT auth, tenant isolation, and role-based access control across apps."],
    ["Admin dashboard", "HR modules, reporting, and complex data tables for operators."],
    ["ESS portal", "Employee self-service for day-to-day HR actions."],
    ["Attendance engine", "Event-driven pipeline from punches to sessions to daily summaries."],
    ["Shifts & rosters", "Scheduling with exception handling and approval workflows."],
    ["Platform console", "Tenant lifecycle, plans, billing, monitoring, and feature flags."],
  ],
  arch: [
    [
      "Next.js app",
      "Admin + ESS",
      "Tenant-facing admin dashboard and employee self-service portal against the shared API.",
    ],
    [
      "Platform console",
      "Operator / SaaS",
      "Operators manage tenant lifecycle, subscription plans, billing, monitoring and feature flags.",
    ],
    [
      "Express API",
      "JWT · RBAC",
      "Security boundary for auth, tenant isolation, RBAC and the modular REST surface (OpenAPI).",
    ],
    [
      "PostgreSQL",
      "Tenants · HR",
      "Stores tenants, HR domain data, punches, sessions and daily attendance summaries.",
    ],
    [
      "Redis",
      "Cache",
      "Caching and supporting services for the API and background work.",
    ],
    [
      "Attendance pipeline",
      "Punches → summaries",
      "Immutable punch events aggregate into sessions, then roll into daily summaries with shift/roster rules.",
    ],
  ],
  archCaption:
    "Immutable punch events are aggregated into sessions, then rolled into daily summaries, with shift/roster rules and approval workflows on top. Express owns JWT auth, tenant isolation and RBAC; Next.js apps are the admin, ESS and platform UIs.",
  gallery: [
    "employee-directory",
    "ess-attendance",
    "remote-attendance-requests",
    "shift-change-requests",
    "geofence-settings",
    "qr-attendance",
    "admin-dashboard",
  ].map((n) => `/img/projects/pulse-hr/${n}-16x10.webp`),
};
