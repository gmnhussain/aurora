import { clamp, gsap, prefersReducedMotion, scoped } from "./motion";

/**
 * Custom cursor (dot + lerping ring with labels), magnetic buttons, the hero
 * spotlight and portrait tilt, and the floating project preview.
 * Desktop with a fine pointer only. Everything is written straight to styles
 * from one ticker; no React state.
 */
export function attachPointer(root: HTMLElement) {
  const { q, qa } = scoped(root);
  const ring = q("ring"), ringLabel = q("ringLabel"), dot = q("dot"), preview = q("preview");
  if (!ring || !ringLabel || !dot) return () => {};
  const pimgs = qa("[data-pimg]");
  const hero = q("sec-top"), aurora = q("aurora"), heroSpot = q("spot");
  const tilt = prefersReducedMotion() ? null : q("ptilt");

  let mx = -100, my = -100, rx = -100, ry = -100, px = -100, py = -100;
  let rs = 32, pvOn = false;
  let mag: HTMLElement | null = null;

  const onMove = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    const target = e.target instanceof Element ? e.target : null;

    const t = target?.closest<HTMLElement>("[data-cursor],a,button,input") ?? null;
    const label = t?.dataset.cursor ?? "";
    rs = label ? 84 : t ? 56 : 32;
    ring.style.width = ring.style.height = `${rs}px`;
    ring.style.background = label ? "color-mix(in srgb, var(--color-accent) 22%, transparent)" : "transparent";
    ring.style.opacity = "1";
    dot.style.opacity = label ? "0" : "1";
    if (ringLabel.textContent !== label) ringLabel.textContent = label;

    // Hero: spotlight follows the pointer; the portrait tilts toward it (nx, ny in −0.5…0.5).
    if (hero && window.scrollY < hero.offsetHeight) {
      if (aurora && heroSpot) {
        const r = aurora.getBoundingClientRect();
        heroSpot.style.opacity = "1";
        heroSpot.style.transform = `translate(${mx - r.left}px, ${my - r.top}px)`;
      }
      if (tilt) {
        const nx = mx / window.innerWidth - 0.5, ny = my / window.innerHeight - 0.5;
        tilt.style.transform = `perspective(1200px) rotateY(${nx * 6}deg) rotateX(${-ny * 4}deg) translate(${nx * -14}px, ${ny * -8}px)`;
      }
    } else if (heroSpot) {
      heroSpot.style.opacity = "0";
    }

    const row = target?.closest<HTMLElement>("[data-proj]") ?? null;
    if (preview) {
      preview.style.opacity = row ? "1" : "0";
      pvOn = !!row;
      if (row) pimgs.forEach((im, i) => (im.style.opacity = String(i) === row.dataset.proj ? "1" : "0"));
    }

    const m = target?.closest<HTMLElement>("[data-magnet]") ?? null;
    if (m) {
      const r = m.getBoundingClientRect();
      m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    }
    if (mag && mag !== m) mag.style.transform = "";
    mag = m;
  };

  const tick = () => {
    rx += (mx - rx) * 0.2;
    ry += (my - ry) * 0.2;
    const vx = mx - px;
    px += vx * 0.12;
    py += (my - py) * 0.12;
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    ring.style.transform = `translate(${rx - rs / 2}px, ${ry - rs / 2}px)`;
    if (preview) {
      preview.style.transform = `translate(${px - 170}px, ${py - 115}px) rotate(${clamp(vx * 0.08, -8, 8)}deg) scale(${pvOn ? 1 : 0.85})`;
    }
  };

  const onLeave = () => {
    [ring, dot, preview, heroSpot].forEach((el) => el && (el.style.opacity = "0"));
    if (tilt) tilt.style.transform = "";
    pvOn = false;
    if (mag) {
      mag.style.transform = "";
      mag = null;
    }
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  gsap.ticker.add(tick);

  return () => {
    window.removeEventListener("mousemove", onMove);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    gsap.ticker.remove(tick);
    onLeave();
  };
}
