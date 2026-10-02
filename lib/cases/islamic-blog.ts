import type { CaseStudy } from "./types";

export const islamicBlog: CaseStudy = {
  live: "https://www.monzureelahi.com",
  role: "Frontend",
  org: "Deeni Info Tech",
  platform: "Web, 2022",
  stack: "Next.js, React, Material UI, YouTube API",
  tags: ["Web", "Next.js", "React", "Material UI", "YouTube API", "Static"],
  summary:
    "A scalable multi-site blogging platform that gives Islamic scholars and Da'wah organizations personal websites to share articles and YouTube lectures — one shared Next.js codebase with theme variants, deployed per scholar.",
  objective:
    "Give Islamic scholars and Da'wah organizations dedicated public sites from one shared Next.js codebase — reusable components, theme variants, and YouTube lecture feeds — without building a separate app for every scholar.",
  tasks: [
    "Front-end development of scholar and Da'wah organization sites in Next.js",
    "Shared components, theming, and layout/section variants per site",
    "UI for articles, research content, and lecture/video pages",
    "YouTube Data API integration for lecture feeds",
    "Static content structure with redeploy workflows (no traditional backend)",
  ],
  features: [
    ["Shared codebase", "One Next.js app with theme and layout variants per scholar."],
    ["Articles & research", "Public-facing content sections for scholar and Da'wah sites."],
    ["YouTube lectures", "YouTube Data API feeds for lecture lists and video pages."],
    ["Responsive SEO", "Mobile-responsive UI and SEO optimization."],
    ["Multi-deploy", "Multiple live scholar domains from one architecture."],
  ],
  arch: [
    [
      "Shared Next.js codebase",
      "Components · themes · variants",
      "Reusable layouts, sections and theme variants that each scholar site configures.",
    ],
    [
      "Scholar domains",
      "Theme / config",
      "Site A.com … Site N.com — each deployment branded via config without forking the app.",
    ],
    [
      "YouTube Data API",
      "Lectures & video feeds",
      "Lecture lists and video pages pull from YouTube so content stays current without a CMS backend.",
    ],
  ],
  archCaption:
    "One frontend architecture, many scholar domains — each site gets its own branding while reusing layout, content sections, and the YouTube integration.",
  gallery: [
    "monzureelahi-home",
    "abdullahjahangir-home",
    "muhammadsaifullah-home",
    "monzureelahi-lectures",
    "abubakarzakaria-lectures",
    "abubakarzakaria-video",
  ].map((n) => `/img/projects/islamic-blog/${n}-16x10.webp`),
};
