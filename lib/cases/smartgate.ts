import type { CaseStudy } from "./types";

export const smartgate: CaseStudy = {
  live: "https://console.dghs.apisolutionsltd.com",
  role: "Full-stack developer",
  org: "API Solutions Ltd.",
  platform: "Web, 2026",
  stack:
    "Next.js, TypeScript, React, FastAPI, PostgreSQL, Dahua NetSDK, APScheduler, JWT, Tailwind CSS, Zod",
  tags: ["Web", "Access control", "GovTech", "Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Dahua NetSDK"],
  summary:
    "SmartGate is a multi-tenant platform for managing Dahua face-scan access controllers across DGHS offices. Operators enroll persons, pull attendance from devices, and push records and faces to the government MIS — with platform and office portals, scheduled jobs, tenant-scoped RBAC, and an optional attendance module (shifts, leave, and reports) when the client needs it.",
  objective:
    "Build SmartGate so DGHS offices running Dahua face terminals could manage people and devices from one place and deliver attendance reliably to the government MIS — with multi-office tenant isolation, dual operator audiences, long-running device jobs (including auto-register devices that dial in), and incremental MIS sync that can resume safely.",
  tasks: [
    "Domain modeling and multi-app architecture from the client brief (FastAPI API + Platform + Dashboard)",
    "Full-stack development of the platform console (all offices) and office dashboard (single-office scope)",
    "FastAPI backend with JWT auth, BFF httpOnly cookies, computed RBAC, and server-side tenant isolation",
    "Dahua NetSDK integration for TCP and auto-register device modes",
    "Person enrollment, face photos, bulk CSV enroll, device-to-device migration, and MoHFW HRIS lookup",
    "Optional office attendance module: daily register, shifts, leave, exceptions/corrections, and reports",
    "Background jobs and APScheduler for export, migrate, and incremental DGHS MIS push (logs + faces)",
    "Production deployment on Ubuntu (systemd API, PM2 Next.js apps, Nginx + HTTPS)",
  ],
  features: [
    ["Multi-office registry", "Multi-office / multi-device registry for Dahua ASI face controllers across DGHS sites."],
    ["Dual-audience auth", "Platform operators vs office users, with office-scoped isolation and computed RBAC."],
    ["Person lifecycle", "Enroll, face capture, bulk CSV enroll, device-to-device migration, and MoHFW HRIS lookup."],
    ["MIS sync", "Live attendance pull and incremental push of records + faces to DGHS MIS with resume state."],
    ["Attendance module", "Optional daily register, shifts, leave, exceptions/corrections, and late/early reports."],
    ["Device jobs", "Scheduled sync, progress states, and parked waiting_device work for auto-register terminals."],
  ],
  arch: [
    [
      "Platform console",
      "All offices · BFF",
      "Cross-office operators manage tenants, jobs and devices. Next.js holds the session and proxies to FastAPI.",
    ],
    [
      "Office dashboard",
      "One office · BFF",
      "Office-scoped UI for attendance, persons and device ops — same BFF pattern, narrower tenant view.",
    ],
    [
      "FastAPI",
      "JWT · NetSDK · jobs",
      "Security boundary for auth, RBAC, tenant isolation, Dahua NetSDK calls and background job orchestration.",
    ],
    [
      "PostgreSQL",
      "Offices · jobs · resume",
      "Stores offices, persons, devices, job progress and per-device MIS resume state for incremental sync.",
    ],
    [
      "Dahua devices",
      "TCP / auto-reg",
      "ASI face controllers reached by TCP dial-out or auto-register dial-in for enroll, migrate and attendance pull.",
    ],
    [
      "DGHS MIS",
      "Records + faces",
      "Multipart push of attendance logs and faces into the government MIS, advancing resume cursors safely.",
    ],
  ],
  archCaption:
    "FastAPI is the security boundary. Frontends are BFF + UI only. Jobs pull attendance from Dahua ASI devices, attach faces, push multipart payloads to DGHS MIS, and advance per-device resume state for incremental sync.",
  gallery: [
    "workforce-analytics",
    "attendance-exceptions",
    "access-log-archive",
    "daily-attendance",
    "office-settings",
    "data-migration",
    "help-guide-dark",
    "sign-in",
  ].map((n) => `/img/projects/smartgate/${n}-16x10.webp`),
};
