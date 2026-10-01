"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, House } from "@phosphor-icons/react";
import { revealAll, useScenes } from "@/lib/innerScenes";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";
import { InnerLink } from "./nav";

/** Depth multipliers for 4 / 0 / 4 following the cursor. */
const DIGITS = [
  { c: "4", k: 1, outline: false },
  { c: "0", k: 2.4, outline: true },
  { c: "4", k: 1.6, outline: false },
];

export function NotFound() {
  const ref = useRef<HTMLElement>(null);

  // Digits rise in, 120ms apart; then the usual reveals.
  useScenes(ref, (root, reduced) => {
    revealAll(root, reduced);
    if (reduced) return;
    gsap.fromTo(
      root.querySelectorAll("[data-dig]"),
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.2, delay: 0.1, stagger: 0.12, ease: EASE.rise, clearProps: "transform,opacity" },
    );
  });

  // Desktop: each digit drifts with the cursor at its own depth.
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion() || !window.matchMedia("(pointer: fine) and (min-width: 721px)").matches) return;
    const digs = Array.from(root.querySelectorAll<HTMLElement>("[data-dig]"));
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      digs.forEach((d) => {
        const k = Number(d.dataset.dig);
        d.style.translate = `${nx * 30 * k}px ${ny * 24 * k}px`;
      });
    };
    const onLeave = () => digs.forEach((d) => (d.style.translate = "0 0"));
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={ref} className="ip-nf">
      <div className="ip-nf-halo" aria-hidden="true">
        <div className="hero-halo-fill" />
        <div className="hero-ring hero-ring-a" />
        <div className="hero-ring hero-ring-b" />
      </div>
      <div data-reveal="0" className="kicker">
        Error 404
      </div>
      <h1 className="ip-nf-digits" aria-label="404">
        {DIGITS.map((d, i) => (
          <span key={i} data-dig={d.k} aria-hidden="true" className={d.outline ? "ip-nf-outline" : undefined}>
            {d.c}
          </span>
        ))}
      </h1>
      <p data-reveal="150" className="ip-nf-line">
        This page drifted off into the dark.
      </p>
      <div data-reveal="250" className="ip-nf-actions">
        <InnerLink href="/" label="Hello" className="btn btn-primary ip-nf-btn">
          <House size="1em" /> Back home
        </InnerLink>
        <InnerLink href="/works" label="Works" className="btn btn-ghost ip-nf-btn">
          See my works <ArrowRight size="1em" />
        </InnerLink>
      </div>
    </section>
  );
}
