import { EASE, ScrollTrigger, clamp, gsap } from "./motion";

/**
 * Scroll-driven parts of a case study: the hero image opening to full bleed,
 * the overview words lighting up, the lit feature / architecture lists with
 * their rolling counters, the pinned architecture pipeline and the pinned
 * horizontal gallery. One update per scroll frame.
 * Call inside a gsap.context.
 */
export function caseScenes(root: HTMLElement, reduced: boolean) {
  const q = <T extends HTMLElement = HTMLElement>(k: string) => root.querySelector<T>(`[data-k="${k}"]`);
  const qa = <T extends HTMLElement = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  const heroClip = q("heroclip"), heroImg = q("heroimg");
  const ov = q("ov"), words = qa("[data-word]");
  const feats = qa('[data-lit="feat"]'), archLit = qa('[data-lit="arch"]');
  const fnum = q("fnum"), ftitle = q("ftitle"), fbar = q("fbar");
  const arch = q("arch"), afill = q("afill"), apkt = q("apkt"), anum = q("anum"), atitle = q("atitle"), adesc = q("adesc");
  const anodes = qa("[data-anode]");
  const gal = q("hgal"), track = q("htrack"), galbar = q("galbar"), galcount = q("galcount"), figs = qa("[data-fig]");

  if (reduced) {
    words.forEach((w) => (w.style.opacity = "1"));
    return;
  }

  // Hero image: un-blurs and fades in on load.
  if (heroImg) {
    gsap.fromTo(
      heroImg,
      { opacity: 0, filter: "blur(12px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1.4, delay: 0.3, ease: EASE.reveal, clearProps: "opacity,filter" },
    );
  }

  /** New text rolls up into its mask. */
  const swap = (el: HTMLElement | null, text: string) => {
    if (!el || el.textContent === text) return;
    el.textContent = text;
    gsap.fromTo(el, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.65, ease: EASE.reveal });
  };

  /** Opacity by distance from the viewport centre; returns the nearest item. */
  const lit = (els: HTMLElement[], H: number) => {
    let best = -1, bd = Infinity;
    els.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (!r.height) return;
      const d = Math.abs(r.top + r.height / 2 - H / 2);
      if (d < bd) {
        bd = d;
        best = i;
      }
      el.style.opacity = String(1 - clamp(d / (H * 0.42)) * 0.82);
    });
    return best;
  };

  const pad2 = (n: number) => String(n).padStart(2, "0");

  const update = () => {
    const H = window.innerHeight, W = document.documentElement.clientWidth;

    // Hero image opens from padded to full-bleed: p = clamp(1 − top / 0.85H).
    if (heroClip && heroImg) {
      const p = clamp(1 - heroClip.getBoundingClientRect().top / (H * 0.85));
      const pad = Math.min(56, Math.max(20, W * 0.05)) * (1 - p);
      heroClip.style.clipPath = `inset(0 ${pad}px round ${8 * (1 - p)}px)`;
      heroImg.style.transform = `scale(${1.2 - 0.2 * p}) translateY(${-p * 3}%)`;
    }

    // Overview words light up through the pinned range.
    if (ov && words.length) {
      const r = ov.getBoundingClientRect();
      const p = clamp((-r.top + H * 0.15) / (r.height - H * 0.85));
      const N = words.length;
      words.forEach((w, i) => (w.style.opacity = String(0.16 + 0.84 * clamp(p * (N + 4) - i))));
    }

    // Features: nearest item is active; number, title and rail follow it.
    const fb = lit(feats, H);
    lit(archLit, H);
    if (fb >= 0) {
      swap(fnum, pad2(fb + 1));
      swap(ftitle, feats[fb].dataset.title ?? "");
      if (fbar) fbar.style.transform = `scaleX(${(fb + 1) / feats.length})`;
    }

    // Architecture: p through the pinned section moves the packet; stage = floor(p·n).
    if (arch && anodes.length) {
      const r = arch.getBoundingClientRect();
      if (r.height) {
        const n = anodes.length;
        const p = clamp(-r.top / (r.height - H));
        const pp = clamp(p * 1.08);
        const idx = Math.min(n - 1, Math.floor(p * n * 0.999 + 0.0001));
        if (afill) afill.style.transform = `scaleX(${pp})`;
        if (apkt) {
          apkt.style.left = `${pp * 100}%`;
          apkt.style.opacity = pp > 0.001 && pp < 0.999 ? "1" : "0";
        }
        swap(anum, pad2(idx + 1));
        swap(atitle, anodes[idx].dataset.title ?? "");
        swap(adesc, anodes[idx].dataset.desc ?? "");
        anodes.forEach((nd, i) => {
          nd.toggleAttribute("data-on", i / (n - 1) <= pp + 0.002);
          nd.toggleAttribute("data-cur", i === idx);
        });
      }
    }

    // Gallery: the track slides sideways through the pinned section.
    if (gal && track) {
      const r = gal.getBoundingClientRect();
      if (r.height) {
        const p = clamp(-r.top / (r.height - H));
        const dist = Math.max(0, track.scrollWidth - W);
        track.style.transform = `translateX(${-p * dist}px)`;
        if (galbar) galbar.style.transform = `scaleX(${p})`;
        let best = 0, bd = Infinity;
        figs.forEach((f, i) => {
          const fr = f.getBoundingClientRect();
          const d = Math.min(1, Math.abs(fr.left + fr.width / 2 - W / 2) / W);
          if (d < bd) {
            bd = d;
            best = i;
          }
          f.style.transform = `scale(${1 - d * 0.1})`;
          f.style.filter = `brightness(${1 - d * 0.45})`;
        });
        if (galcount) galcount.textContent = pad2(best + 1);
      }
    }
  };

  ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
  update();
}
