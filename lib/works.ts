/**
 * Inner pages data: the full project list for /works.
 * Case-study bodies live in lib/cases/<slug>.ts and are re-exported here.
 */

import { CASES } from "./cases";

export type { CaseStudy } from "./cases";
export { CASES };

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

export const pad2 = (n: number) => String(n).padStart(2, "0");

const RAW: [string, string, string, string, Category][] = [
  ["smartgate", "SmartGate", "Multi-office attendance sync for DGHS", "/img/projects/smartgate/overview-dark-4x3.webp", "Featured"],
  ["price-comparison", "Prixise", "Price comparison & affiliate platform", "/img/projects/price-comparison/home-4x3.webp", "Featured"],
  ["social-commerce", "Social Commerce", "SaaS for Bangladeshi social sellers", "/img/projects/social-commerce/inbox-to-order-4x3.webp", "Featured"],
  ["gatewise", "Gatewise", "Access control console for Dahua devices", "/img/projects/gatewise/overview-4x3.webp", "Featured"],
  ["veloura", "Veloura", "Headless e-commerce platform on Vendure", "/img/projects/veloura/hero-womenswear-4x3.webp", "Featured"],
  ["pulse-hr", "PulseHR", "Multi-tenant workforce management platform", "/img/projects/pulse-hr/live-attendance-4x3.webp", "Featured"],
  ["holy-quran", "Holy Quran", "Multilingual, multi-domain Quran app", "/img/projects/holy-quran/quran-vn-home-4x3.webp", "More"],
  ["islamic-blog", "Islamic Blog", "Multi-site blogging platform for Islamic scholars", "/img/projects/islamic-blog/abubakarzakaria-home-4x3.webp", "More"],
  ["quran-radio", "Quran Radio", "Mobile app for Quranic recitations", "/img/projects/quran-radio/welcome-4x3.webp", "More"],
];

export const WORKS: Work[] = RAW.map(([slug, title, sub, img, category], i) => ({
  slug,
  title,
  sub,
  img,
  category,
  i,
  n: pad2(i + 1),
}));

export const WORK_FILTERS: ("All" | Category)[] = ["All", "Featured", "More"];

export const workBySlug = (slug: string) => WORKS.find((w) => w.slug === slug);

/** Curtain label for an inner route. */
export function routeLabel(pathname: string) {
  if (pathname === "/works") return "Works";
  if (pathname === "/contact") return "Contact";
  const m = pathname.match(/^\/works\/([^/]+)$/);
  if (m) return workBySlug(m[1])?.title ?? "404";
  return "404";
}
