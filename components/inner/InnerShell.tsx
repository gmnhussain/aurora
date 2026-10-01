"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { EASE, ScrollTrigger, gsap, initGsap, prefersReducedMotion, scoped } from "@/lib/motion";
import { attachPointer } from "@/lib/pointer";
import { routeLabel } from "@/lib/works";
import { Cursor, Curtain } from "../chrome";
import { InnerFooter, InnerHeader, InnerMenu } from "./chrome";
import { InnerNavContext } from "./nav";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Shared frame for the inner pages: smooth scroll, progress bar, hide-on-scroll
 * header, phone menu, cursor, footer and the route curtain. Lives in the
 * (inner) layout so it stays mounted while routes change underneath it.
 */
export function InnerShell({ children, notFound = false }: { children: React.ReactNode; notFound?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedRef = useRef(false);
  const pendingRef = useRef(false);
  const pathRef = useRef(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const jumpTop = useCallback(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.update();
  }, []);

  // Smooth scrolling, and the curtain lifting off on first load.
  useIsoLayoutEffect(() => {
    initGsap();
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    reducedRef.current = reduced;

    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);
    if (!reduced) {
      lenis = new Lenis({ autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = lenis;
    }

    const { q } = scoped(root);
    const curtain = q("curtain"), lab = q("curtainLabel");
    if (curtain && lab) {
      lab.textContent = notFound ? "404" : routeLabel(window.location.pathname);
      gsap.set(curtain, { y: 0, yPercent: reduced ? 101 : 0 });
      root.removeAttribute("data-boot");
      if (!reduced) gsap.to(curtain, { yPercent: -101, duration: 0.9, delay: 0.35, ease: EASE.wipe });
    }

    return () => {
      if (curtain) gsap.killTweensOf(curtain);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [notFound]);

  // Progress bar and the header hiding on scroll down / returning on scroll up.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { q } = scoped(root);
    const bar = q("bar"), hdr = q("hdr");
    let last = window.scrollY, frame = 0;
    const update = () => {
      const st = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, st / max) : 0})`;
      if (hdr) {
        if (st > last + 2 && st > 160) hdr.dataset.hidden = "1";
        else if (st < last - 2 || st < 160) delete hdr.dataset.hidden;
      }
      last = st;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // A route landed: reset the header, re-measure, and lift the curtain if we lowered it.
  useEffect(() => {
    pathRef.current = pathname;
    const root = rootRef.current;
    if (!root) return;
    const { q } = scoped(root);
    const hdr = q("hdr");
    if (hdr) delete hdr.dataset.hidden;
    ScrollTrigger.refresh();
    if (!pendingRef.current) return;
    pendingRef.current = false;
    jumpTop();
    const curtain = q("curtain");
    if (curtain) gsap.to(curtain, { yPercent: -101, duration: 0.8, delay: 0.25, ease: EASE.wipe });
  }, [pathname, jumpTop]);

  // Cursor, magnets and the list preview: desktop with a fine pointer only.
  // Re-attached per route, since each page brings its own preview images.
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
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [menuOpen]);

  /** Curtain rises, route swaps and scrolls to top, curtain exits upward. */
  const go = useCallback(
    (href: string, label: string) => {
      setMenuOpen(false);
      if (href === pathRef.current) return jumpTop();
      const root = rootRef.current;
      const curtain = root && scoped(root).q("curtain"), lab = root && scoped(root).q("curtainLabel");
      if (reducedRef.current || !curtain || !lab) return router.push(href);

      lab.textContent = label;
      gsap.killTweensOf([curtain, lab]);
      gsap.fromTo(lab, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.22, ease: EASE.reveal });
      gsap.fromTo(
        curtain,
        { y: 0, yPercent: 101 },
        {
          yPercent: 0,
          duration: 0.65,
          ease: EASE.wipe,
          onComplete: () => {
            pendingRef.current = true;
            jumpTop();
            router.push(href, { scroll: false });
          },
        },
      );
    },
    [jumpTop, router],
  );

  const nav = useMemo(() => ({ go }), [go]);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <InnerNavContext.Provider value={nav}>
      <div ref={rootRef} className="ip-shell" data-boot="">
        <div className="page ip-page">
          <main>{children}</main>
          {!notFound && <InnerFooter cta={pathname !== "/contact"} />}
        </div>

        <InnerHeader pathname={pathname} onMenu={openMenu} />
        {menuOpen && <InnerMenu pathname={pathname} onClose={closeMenu} />}
        <Curtain />
        <Cursor />
      </div>
    </InnerNavContext.Provider>
  );
}
