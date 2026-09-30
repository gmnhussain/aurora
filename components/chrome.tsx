"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowCounterClockwise, List, X } from "@phosphor-icons/react";
import { PHONE_DISPLAY, SECTIONS } from "@/lib/content";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

export function Header({ cur, onBrand, onMenu }: { cur: number; onBrand: () => void; onMenu: () => void }) {
  const label = cur < 0 ? "Portfolio 2026" : `0${cur + 1} / 07 — ${SECTIONS[cur].label}`;
  return (
    <>
      <header className="header">
        <button type="button" className="btn btn-ghost brand" onClick={onBrand}>
          <span className="brand-dot" />
          G. M. Nazmul Hussain
        </button>
        <span className="header-label tnum" aria-live="off">
          {label}
        </span>
        <button type="button" className="btn btn-secondary menu-btn" onClick={onMenu} aria-haspopup="dialog">
          Menu <List size="1em" />
        </button>
      </header>
      <div data-k="bar" className="progress" aria-hidden="true" />
    </>
  );
}

export function Menu({
  onClose,
  onGo,
  onReplay,
}: {
  onClose: () => void;
  onGo: (id: string, label: string) => void;
  onReplay: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-ml]"));
    items[0]?.focus({ preventScroll: true });
    if (!prefersReducedMotion()) {
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: EASE.wipe });
      gsap.fromTo(
        items,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, delay: 0.18, stagger: 0.055, ease: EASE.reveal, clearProps: "transform" },
      );
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      gsap.killTweensOf([el, ...items]);
    };
  }, [onClose]);

  return (
    <div ref={ref} className="menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="menu-top">
        <span>Menu</span>
        <button type="button" className="btn btn-secondary menu-btn" onClick={onClose}>
          Close <X size="1em" />
        </button>
      </div>
      <nav>
        {SECTIONS.map((s, i) => (
          <div key={s.id} className="menu-mask">
            <button type="button" data-ml="1" className="menu-item" onClick={() => onGo(s.id, s.label)}>
              <span className="n tnum">0{i + 1}</span>
              <span className="l">{s.label}</span>
            </button>
          </div>
        ))}
      </nav>
      <div className="menu-foot">
        <span>Dhaka, Bangladesh · {PHONE_DISPLAY}</span>
        <button type="button" className="btn btn-ghost" onClick={onReplay}>
          <ArrowCounterClockwise size="1em" /> Replay intro
        </button>
      </div>
    </div>
  );
}

export function Curtain() {
  return (
    <div data-k="curtain" className="curtain" aria-hidden="true">
      <span data-k="curtainLabel" className="curtain-label" />
    </div>
  );
}

export function Preloader() {
  return (
    <div data-k="pre" className="pre" aria-hidden="true">
      <div className="pre-top">
        <span>G. M. Nazmul Hussain</span>
        <span>Portfolio © 2026</span>
      </div>
      <div>
        <div className="pre-track">
          <div data-k="preBar" className="pre-bar" />
        </div>
        <div className="pre-bottom">
          <span>Loading work</span>
          <span data-k="cnt" className="pre-count tnum">
            000
          </span>
        </div>
      </div>
    </div>
  );
}

export function Cursor() {
  return (
    <>
      <div data-k="ring" className="ring" aria-hidden="true">
        <span data-k="ringLabel" />
      </div>
      <div data-k="dot" className="dot" aria-hidden="true" />
    </>
  );
}
