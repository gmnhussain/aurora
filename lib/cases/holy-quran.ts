import type { CaseStudy } from "./types";

export const holyQuran: CaseStudy = {
  live: "https://www.quranulkarim.com",
  role: "Frontend (+ APIs)",
  org: "Deeni Info Tech",
  platform: "Web, 2021",
  stack: "Next.js, React, Laravel, MySQL",
  tags: ["Web", "Multilingual", "JavaScript", "React", "Next.js", "PHP", "Laravel", "MySQL"],
  summary:
    "A shared-codebase Quran web app: one Next.js frontend and a Laravel API power language-specific sites across multiple domains, with content and metadata from a single MySQL database.",
  objective:
    "Deliver a single product that could scale to multiple languages and domains without forking the codebase—one Next.js app and one Laravel API, configured per locale, optimized for high-traffic public reading pages.",
  tasks: [
    "R&D for reader features, search, bookmarks, and UI preferences",
    "Frontend development of the shared Next.js app and domain → locale config",
    "Laravel REST API work for language-specific content and metadata",
    "Performance, accessibility, and SEO work on public content pages",
    "Bug hunting and production fixes across language sites",
  ],
  features: [
    ["Multi-domain frontend", "Shared Next.js app deployed to multiple language domains via config."],
    ["Locale APIs", "Laravel REST APIs for language-specific Quran content and metadata."],
    ["Reader tools", "Chapter search, bookmarks, pins, and last-read tracking."],
    ["UI preferences", "Reader preferences persisted in localStorage."],
    ["Public SEO", "Performance, accessibility, and SEO optimizations for reading pages."],
    ["Related apps", "Companion mobile products: Quran Tube and Quran Radio."],
  ],
  arch: [
    [
      "Language domains",
      "BN · VI · KH · KR",
      "quranulkarim.com, quran.vn, qurankh.com and quran.kr — each mapped to a locale via domain config.",
    ],
    [
      "Shared Next.js app",
      "Domain → locale",
      "One frontend codebase; domain config selects locale and drives language-specific UX.",
    ],
    [
      "Laravel REST API",
      "Content + metadata",
      "Serves language-specific Quran content and metadata to every domain from one API.",
    ],
    [
      "MySQL",
      "Single database",
      "Stores Quran content and metadata for all language sites in one database.",
    ],
  ],
  archCaption:
    "Domain config selects the locale; the same frontend talks to one API and database for language-specific Quran data.",
  gallery: [
    "quranulkarim-reader",
    "quranulkarim-home",
    "quranulkarim-reader-settings",
    "quran-kr-reader",
    "quran-kr-topics",
  ].map((n) => `/img/projects/holy-quran/${n}-16x10.webp`),
};
