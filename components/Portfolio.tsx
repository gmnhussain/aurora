"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { PHONE_RAW } from "@/lib/content";
import { playIntro } from "@/lib/intro";
import { EASE, ScrollTrigger, gsap, initGsap, prefersReducedMotion, scoped } from "@/lib/motion";
import { attachPointer } from "@/lib/pointer";
import { buildScenes, sectionTarget } from "@/lib/scenes";
import { Cursor, Curtain, Header, Menu, Preloader } from "./chrome";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Skills } from "./sections/Skills";
import { Work, WorkPreview } from "./sections/Work";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const introRef = useRef<gsap.core.Timeline | undefined>(undefined);
  const reducedRef = useRef(false);
  const lockedRef = useRef(false);
  const menuOpenRef = useRef(false);
  const copyTimer = useRef<number | undefined>(undefined);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cur, setCur] = useState(-1);
  const [copied, setCopied] = useState(false);

  // The preloader holds the scroll; the menu does too. Only release when neither does.
  const lock = useCallback(() => {
    lockedRef.current = true;
    lenisRef.current?.stop();
  }, []);
  const unlock = useCallback(() => {
    lockedRef.current = false;
    if (!menuOpenRef.current) lenisRef.current?.start();
  }, []);

  const runIntro = useCallback(() => {
    const root = rootRef.current;
    if (!root || !ctxRef.current) return;
    introRef.current?.kill();
    ctxRef.current.add(() => {
      introRef.current = playIntro(root, { reduced: reducedRef.current, lock, unlock });
    });
  }, [lock, unlock]);

  // Smooth scrolling, scroll scenes and the intro.
  useIsoLayoutEffect(() => {
    initGsap();
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    reducedRef.current = reduced;

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);
    if (!reduced) {
      lenis = new Lenis({ autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = lenis;
    }

    const ctx = gsap.context(() => buildScenes(root, reduced, setCur), root);
    ctxRef.current = ctx;
    runIntro();

    // Web fonts change text metrics; re-measure once they're in.
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      introRef.current?.kill();
      ctx.revert();
      ctxRef.current = null;
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [runIntro]);

  // Cursor, magnets, spotlights and project preview: desktop with a fine pointer only.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 721px)");
    let detach: (() => void) | undefined;
    const sync = () => {
      detach?.();
      detach = undefined;
      document.documentElement.classList.toggle("has-cursor", mq.matches);
      if (mq.matches) detach = attachPointer(root);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      detach?.();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen) lenisRef.current?.stop();
    else if (!lockedRef.current) lenisRef.current?.start();
  }, [menuOpen]);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const jumpTo = useCallback((y: number) => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
    ScrollTrigger.update();
  }, []);

  /** Menu navigation: a curtain rises, the page jumps, the curtain exits upward. */
  const go = useCallback(
    (id: string, label: string) => {
      setMenuOpen(false);
      const root = rootRef.current;
      if (!root) return;
      if (reducedRef.current) return jumpTo(sectionTarget(root, id));

      const { q } = scoped(root);
      const curtain = q("curtain"), lab = q("curtainLabel");
      if (!curtain || !lab) return;
      lab.textContent = label;
      gsap.killTweensOf([curtain, lab]);
      gsap.fromTo(lab, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: EASE.reveal });
      gsap.fromTo(
        curtain,
        { y: 0, yPercent: 101 },
        {
          yPercent: 0,
          duration: 0.6,
          ease: EASE.wipe,
          onComplete: () => {
            jumpTo(sectionTarget(root, id));
            gsap.to(curtain, { yPercent: -101, duration: 0.75, delay: 0.25, ease: EASE.wipe });
          },
        },
      );
    },
    [jumpTo],
  );

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const goTop = useCallback(() => go("top", "Hello"), [go]);
  const goContact = useCallback(() => go("contact", "Contact"), [go]);

  const replay = useCallback(() => {
    setMenuOpen(false);
    jumpTo(0);
    runIntro();
  }, [jumpTo, runIntro]);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(PHONE_RAW).catch(() => {});
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <div ref={rootRef}>
      <main className="page">
        <Hero onContact={goContact} />
        <About />
        <div className="inset">
          <Skills />
          <Experience />
          <Education />
          <Work />
          <Services />
        </div>
        <Contact copied={copied} onCopy={copy} />
      </main>

      <Header cur={cur} onBrand={goTop} onMenu={openMenu} />
      {menuOpen && <Menu onClose={closeMenu} onGo={go} onReplay={replay} />}
      <Curtain />
      <Preloader />
      <WorkPreview />
      <Cursor />
    </div>
  );
}
