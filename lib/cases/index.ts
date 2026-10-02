import type { CaseStudy } from "./types";
import { gatewise } from "./gatewise";
import { holyQuran } from "./holy-quran";
import { islamicBlog } from "./islamic-blog";
import { priceComparison } from "./price-comparison";
import { pulseHr } from "./pulse-hr";
import { quranRadio } from "./quran-radio";
import { smartgate } from "./smartgate";
import { socialCommerce } from "./social-commerce";
import { veloura } from "./veloura";

export type { CaseStudy } from "./types";

/** Case studies keyed by work slug. Add a file under lib/cases/ per project. */
export const CASES: Record<string, CaseStudy> = {
  smartgate,
  "price-comparison": priceComparison,
  "social-commerce": socialCommerce,
  gatewise,
  veloura,
  "pulse-hr": pulseHr,
  "holy-quran": holyQuran,
  "islamic-blog": islamicBlog,
  "quran-radio": quranRadio,
};
