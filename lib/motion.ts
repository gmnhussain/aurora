import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let ready = false;

/** Named GSAP easings used across the site. */
export const EASE = {
  /** cubic-bezier(.2,.7,.2,1): reveals */
  reveal: "reveal",
  /** cubic-bezier(.2,.8,.2,1): hero name rise */
  rise: "rise",
  /** cubic-bezier(.76,0,.24,1): wipes and curtains */
  wipe: "wipe",
  /** cubic-bezier(.65,0,.35,1): hairlines drawing in */
  draw: "draw",
} as const;

export function initGsap() {
  if (ready) return;
  ready = true;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create(EASE.reveal, ".2,.7,.2,1");
  CustomEase.create(EASE.rise, ".2,.8,.2,1");
  CustomEase.create(EASE.wipe, ".76,0,.24,1");
  CustomEase.create(EASE.draw, ".65,0,.35,1");
}

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export function scoped(root: ParentNode) {
  return {
    q: <T extends HTMLElement = HTMLElement>(k: string) => root.querySelector<T>(`[data-k="${k}"]`),
    qa: <T extends HTMLElement = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel)),
  };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isPhone = () => window.matchMedia("(max-width: 720px)").matches;

export { gsap, ScrollTrigger };
