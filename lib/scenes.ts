import { SECTIONS } from "./content";
import { EASE, ScrollTrigger, clamp, gsap, isPhone, scoped } from "./motion";

const docTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

/**
 * Every scroll-linked effect on the page. Call inside a gsap.context so a
 * single revert() tears it all down, including the returned cleanup.
 * Formulas mirror the prototype's update().
 */
export function buildScenes(root: HTMLElement, reduced: boolean, onSection: (i: number) => void) {
  const { q, qa } = scoped(root);
  const H = () => window.innerHeight;

  // ── Progress bar
  const bar = q("bar");
  if (bar) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => (bar.style.transform = `scaleX(${s.progress})`),
      onRefresh: (s) => (bar.style.transform = `scaleX(${s.progress})`),
    });
  }

  // ── Current section label (last section whose top is above 45% of the viewport)
  const secEls = SECTIONS.map((s) => q(`sec-${s.id}`));
  let tops: number[] = [];
  const pick = (st: number) => {
    let cur = -1;
    tops.forEach((t, i) => {
      if (t <= st + H() * 0.45) cur = i;
    });
    onSection(cur);
  };
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onRefresh: (s) => {
      tops = secEls.map((el) => (el ? docTop(el) : Infinity));
      pick(s.scroll());
    },
    onUpdate: (s) => pick(s.scroll()),
  });

  // ── Hero: keep both name layers above the bottom row. --nb = row height + the
  // hero's bottom padding; re-measured on resize, font load (refresh) and scroll.
  const hero = q("sec-top"), hrow = q("hrow");
  let ro: ResizeObserver | undefined;
  if (hero && hrow) {
    let nb = 0;
    const fit = () => {
      const v = hrow.offsetHeight + parseFloat(getComputedStyle(hero).paddingBottom || "0");
      if (v > 20 && v !== nb) hero.style.setProperty("--nb", `${(nb = v)}px`);
    };
    fit();
    ro = new ResizeObserver(fit);
    ro.observe(hrow);
    ro.observe(hero);
    ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", onRefresh: fit, onUpdate: fit });
  }

  // ── Hero parallax: names drift apart (±scrollY × 0.4, 0.25 on phone), the portrait
  // sinks and shrinks to .94, halo and aurora trail at 0.3 and 0.45.
  if (hero && !reduced) {
    const k = () => (isPhone() ? 0.25 : 0.4);
    const h = () => hero.offsetHeight;
    const st = () => ({ trigger: hero, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true });
    gsap.to(q("line1"), { x: () => -k() * h(), ease: "none", scrollTrigger: st() });
    gsap.to(q("line2"), { x: () => k() * h(), ease: "none", scrollTrigger: st() });
    gsap.to(q("portrait"), { y: () => 0.12 * h(), scale: 0.94, ease: "none", scrollTrigger: st() });
    gsap.to(q("halo"), { y: () => 0.3 * h(), ease: "none", scrollTrigger: st() });
    gsap.to(q("aurora"), { y: () => 0.45 * h(), ease: "none", scrollTrigger: st() });
  }

  // ── About: words light up in sequence through the pinned range
  const about = q("sec-about");
  const words = qa("[data-w]");
  if (about && !reduced) {
    const N = words.length;
    const light = (p: number) =>
      words.forEach((w, i) => (w.style.opacity = String(0.16 + 0.84 * clamp(p * (N + 4) - i))));
    ScrollTrigger.create({
      trigger: about,
      start: "top 15%",
      end: "bottom bottom",
      onUpdate: (s) => light(s.progress),
      onRefresh: (s) => light(s.progress),
    });
  } else {
    words.forEach((w) => (w.style.opacity = "1"));
  }

  // ── Marquee: scroll adds an offset on top of the CSS loop
  const m1 = q("mq1"), m2 = q("mq2");
  if (m1 && m2 && !reduced) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => {
        const st = s.scroll();
        m1.style.transform = `translateX(${(-st * 0.25) % 2000}px)`;
        m2.style.transform = `translateX(${(st * 0.25) % 2000}px)`;
      },
    });
  }

  // ── Experience rows: accent progress p = clamp((0.8H − top) / (height + 0.3H)); the
  // outlined start year drifts with it. Progress stays scroll-linked under reduced motion.
  qa("[data-job]").forEach((row) => {
    const prog = row.querySelector<HTMLElement>("[data-jprog]"), yr = row.querySelector<HTMLElement>("[data-yr]");
    if (!prog || !yr) return;
    const set = () => {
      const r = row.getBoundingClientRect();
      const p = clamp((H() * 0.8 - r.top) / (r.height + H() * 0.3));
      prog.style.transform = `scaleX(${p})`;
      if (!reduced) yr.style.transform = `translateX(${(0.5 - p) * 18}%)`;
    };
    ScrollTrigger.create({ trigger: row, start: "top bottom", end: "bottom top", onUpdate: set, onRefresh: set });
  });

  // ── Letter reveal: once a [data-chars] block is 30% visible, its letters rise from their word masks
  if (!reduced) {
    qa("[data-chars]").forEach((el) => {
      const chars = el.querySelectorAll("[data-ch]");
      gsap.set(chars, { yPercent: 105 });
      ScrollTrigger.create({
        trigger: el,
        start: () => `top+=${el.offsetHeight * 0.3} bottom`,
        once: true,
        onEnter: () => gsap.to(chars, { yPercent: 0, duration: 0.9, stagger: 0.022, ease: EASE.rise }),
      });
    });
  }

  // ── Stacking cards: as the next card approaches its sticky top, the previous one
  // scales to .94 and dims. Markers sit at each next card's un-stuck position.
  const cards = qa("[data-card]");
  const marks = qa("[data-cardmark]");
  cards.forEach((c, i) => {
    const next = cards[i + 1], mark = marks[i];
    if (!next || !mark) return;
    const target = Number(next.dataset.top);
    const set = (p: number) => {
      c.style.transform = `scale(${1 - 0.06 * p})`;
      c.style.filter = `brightness(${1 - 0.4 * p})`;
    };
    ScrollTrigger.create({
      trigger: mark,
      start: () => `top ${target + H() * 0.7}px`,
      end: `top ${target}px`,
      invalidateOnRefresh: true,
      onUpdate: (s) => set(s.progress),
      onRefresh: (s) => set(s.progress),
    });
  });

  // ── Education: outlined "CSE" parallax, 2015 → 2019 bar draws in
  const edu = q("sec-education");
  if (edu) {
    if (!reduced) {
      gsap.fromTo(
        q("edubg"),
        { y: 60 },
        { y: -60, ease: "none", scrollTrigger: { trigger: edu, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }
    gsap.fromTo(
      q("edubar"),
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: edu, start: "top+=100 75%", end: "top+=400 75%", scrub: true } },
    );
  }

  // ── Footer name slides in as the contact band enters
  const contact = q("sec-contact"), footname = q("footname");
  if (contact && footname && !reduced) {
    gsap.fromTo(
      footname,
      { xPercent: -18 },
      { xPercent: 0, ease: "none", scrollTrigger: { trigger: contact, start: "top bottom", end: "bottom bottom", scrub: true } },
    );
  }

  // ── Hairlines draw in once they enter
  qa("[data-draw]").forEach((el) => {
    if (reduced) return void gsap.set(el, { scaleX: 1 });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      once: true,
      onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.4, ease: EASE.draw }),
    });
  });

  // ── Generic reveal: fade up once 12% visible, with the element's own delay
  if (!reduced) {
    qa("[data-reveal]").forEach((el) => {
      gsap.set(el, { opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: () => `top+=${el.offsetHeight * 0.12} bottom`,
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
              // Hand transform back to CSS so hover transforms keep working.
              clearProps: "opacity,transform",
            },
          ),
      });
    });
  }

  return () => ro?.disconnect();
}

/** Document scroll position that puts a section in view (as the prototype's go()). */
export function sectionTarget(root: HTMLElement, id: string) {
  if (id === "top") return 0;
  const el = scoped(root).q(`sec-${id}`);
  if (!el) return 0;
  return docTop(el) - (id === "about" || id === "contact" ? 0 : 40);
}
