import { EASE, gsap, scoped } from "./motion";

type IntroOptions = {
  reduced: boolean;
  /** Called while the counter runs, so the page can't scroll under the loader. */
  lock: () => void;
  unlock: () => void;
};

/**
 * Preloader counter → panel wipes up → aurora fades in, halo grows, hero name
 * rises, portrait un-blurs, bottom row fades up. Safe to call again ("Replay intro").
 */
export function playIntro(root: HTMLElement, { reduced, lock, unlock }: IntroOptions) {
  const { q, qa } = scoped(root);
  const pre = q("pre"), cnt = q("cnt"), bar = q("preBar");
  const portrait = q("portraitIn"), halo = q("haloIn"), aurora = q("auroraIn");
  if (!pre || !cnt || !bar || !portrait || !halo || !aurora) return;
  const lines = qa("[data-in]"), fades = qa("[data-fadein]");

  gsap.killTweensOf([pre, bar, portrait, halo, aurora, ...lines, ...fades]);

  if (reduced) {
    gsap.set(pre, { yPercent: -100, visibility: "hidden" });
    gsap.set(lines, { yPercent: 0 });
    gsap.set(fades, { opacity: 1, clearProps: "transform" });
    gsap.set(portrait, { opacity: 1, yPercent: 0, filter: "none" });
    gsap.set(halo, { opacity: 1, scale: 1 });
    gsap.set(aurora, { opacity: 1 });
    unlock();
    return;
  }

  gsap.set(pre, { yPercent: 0, visibility: "visible" });
  gsap.set(bar, { scaleX: 0 });
  gsap.set(lines, { yPercent: 110 });
  gsap.set(fades, { opacity: 0, y: 16 });
  gsap.set(portrait, { opacity: 0, yPercent: 8, filter: "blur(10px)" });
  gsap.set(halo, { opacity: 0, scale: 0.6 });
  gsap.set(aurora, { opacity: 0 });
  cnt.textContent = "000";
  lock();

  const counter = { v: 0 };
  const tl = gsap.timeline();
  tl.to(counter, {
    v: 1,
    duration: 1.5,
    ease: "power2.out", // easeOutCubic
    onUpdate: () => {
      cnt.textContent = String(Math.round(counter.v * 100)).padStart(3, "0");
      bar.style.transform = `scaleX(${counter.v})`;
    },
  });
  tl.addLabel("done");
  tl.call(unlock, undefined, "done");
  tl.to(pre, { yPercent: -100, duration: 0.9, ease: EASE.wipe }, "done+=0.15");
  tl.set(pre, { visibility: "hidden" });
  tl.to(lines, { yPercent: 0, duration: 1.1, ease: EASE.rise, stagger: 0.11 }, "done+=0.6");
  tl.to(aurora, { opacity: 1, duration: 2, ease: "none" }, "done+=0.3");
  tl.to(halo, { opacity: 1, scale: 1, duration: 1.8, ease: EASE.reveal }, "done+=0.5");
  tl.to(portrait, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 1.6, ease: EASE.reveal, clearProps: "filter" }, "done+=0.65");
  tl.to(fades, { opacity: 1, y: 0, duration: 0.8, ease: EASE.reveal, stagger: 0.09, clearProps: "transform" }, "done+=1");
  return tl;
}
