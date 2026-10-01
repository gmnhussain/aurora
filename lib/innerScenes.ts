import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";
import { EASE, ScrollTrigger, clamp, gsap, initGsap, prefersReducedMotion } from "./motion";

/**
 * Reveal primitives for the inner pages (works, case study, contact, 404).
 * Call inside a gsap.context so a single revert() tears everything down.
 */

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const all = <T extends HTMLElement = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Fade up 36px once 10% visible, delayed by the attribute (ms). */
export function revealUp(root: ParentNode, reduced: boolean) {
  if (reduced) return;
  all(root, "[data-reveal]").forEach((el) => {
    gsap.set(el, { opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: () => `top+=${el.offsetHeight * 0.1} bottom`,
      once: true,
      onEnter: () =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: (Number(el.dataset.reveal) || 0) / 1000,
            ease: EASE.reveal,
            clearProps: "opacity,transform",
          },
        ),
    });
  });
}

/** Letters rise out of their word masks once the block is 20% visible. */
export function revealChars(root: ParentNode, reduced: boolean) {
  if (reduced) return;
  all(root, "[data-chars]").forEach((el) => {
    const chars = el.querySelectorAll("[data-ch]");
    gsap.set(chars, { yPercent: 105 });
    ScrollTrigger.create({
      trigger: el,
      start: () => `top+=${el.offsetHeight * 0.2} bottom`,
      once: true,
      onEnter: () => gsap.to(chars, { yPercent: 0, duration: 0.95, stagger: 0.026, ease: EASE.rise }),
    });
  });
}

/** 1px rules draw in from the left. */
export function revealDraw(root: ParentNode, reduced: boolean) {
  all(root, "[data-draw]").forEach((el) => {
    if (reduced) return void gsap.set(el, { scaleX: 1 });
    gsap.set(el, { scaleX: 0, transformOrigin: "0 50%" });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      once: true,
      onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.4, ease: EASE.draw }),
    });
  });
}

/** Image wipes up from the bottom; its img settles from 1.3 to 1. */
export function revealClip(root: ParentNode, reduced: boolean) {
  if (reduced) return;
  all(root, "[data-clip]").forEach((el) => {
    const img = el.querySelector("img");
    gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
    ScrollTrigger.create({
      trigger: el,
      start: () => `top+=${el.offsetHeight * 0.1} bottom`,
      once: true,
      onEnter: () => {
        gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE.wipe, clearProps: "clipPath" });
        if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.6, ease: EASE.reveal, clearProps: "transform" });
      },
    });
  });
}

/** [data-par] layers drift ±6% by how far their box sits from the viewport centre. */
export function parallax(root: ParentNode, reduced: boolean) {
  if (reduced) return;
  all(root, "[data-par]").forEach((el) => {
    const box = el.parentElement;
    if (!box) return;
    const set = () => {
      const r = box.getBoundingClientRect(), H = window.innerHeight;
      const c = (r.top + r.height / 2 - H / 2) / H;
      el.style.transform = `translateY(${clamp(c, -1, 1) * -6}%)`;
    };
    ScrollTrigger.create({ trigger: box, start: "top bottom", end: "bottom top", onUpdate: set, onRefresh: set });
  });
}

/** Everything above, in one go. */
export function revealAll(root: ParentNode, reduced: boolean) {
  revealChars(root, reduced);
  revealDraw(root, reduced);
  revealClip(root, reduced);
  revealUp(root, reduced);
  parallax(root, reduced);
}

/**
 * Builds scroll scenes for a page section inside a gsap.context scoped to
 * `ref`, rebuilt when `deps` change. `build` may return a cleanup.
 */
export function useScenes(
  ref: RefObject<HTMLElement | null>,
  build: (root: HTMLElement, reduced: boolean) => void | (() => void),
  deps: DependencyList = [],
) {
  useIsoLayoutEffect(() => {
    initGsap();
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => build(root, prefersReducedMotion()), root);
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
    return () => {
      alive = false;
      ctx.revert();
    };
  }, deps);
}
