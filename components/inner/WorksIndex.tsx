"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { ArrowUpRight, Rows, SquaresFour } from "@phosphor-icons/react";
import { SplitChars } from "../SplitChars";
import { parallax, revealAll, useScenes } from "@/lib/innerScenes";
import { EASE, gsap } from "@/lib/motion";
import { WORKS, WORK_FILTERS, pad2, type Category } from "@/lib/works";
import { InnerLink } from "./nav";

type Filter = "All" | Category;
type View = "grid" | "list";

const count = (f: Filter) => pad2(f === "All" ? WORKS.length : WORKS.filter((w) => w.category === f).length);

export function WorksIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [view, setView] = useState<View>("grid");
  const heroRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastKey = useRef("");
  const shown = WORKS.filter((w) => filter === "All" || w.category === filter);

  useScenes(heroRef, revealAll);

  // Cards: wipe and fade in on first scroll; after a filter or view change they
  // re-enter together, 80ms apart.
  useScenes(
    listRef,
    (root, reduced) => {
      // Same key again (first load, or a StrictMode re-run) → normal scroll reveals.
      const key = `${filter}|${view}`;
      const first = !lastKey.current || lastKey.current === key;
      lastKey.current = key;
      if (first) {
        revealAll(root, reduced);
        return;
      }
      parallax(root, reduced);
      if (reduced) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.9, delay: (i) => Math.min(i, 6) * 0.08, ease: EASE.reveal, clearProps: "opacity,transform" },
      );
    },
    [filter, view],
  );

  return (
    <>
      <section ref={heroRef} className="ip-works-hero">
        <div data-reveal="0" className="ip-labelrow">
          <span className="ip-accent">Works</span>
          <span className="ip-muted tnum">
            {pad2(WORKS.length)} projects · 2021 → Now
          </span>
        </div>
        <h1 className="ip-works-h1">
          <span className="ip-h1-line">
            <SplitChars text="Selected" />
          </span>
          <span className="ip-h1-line ip-h1-indent ip-outline">
            <SplitChars text="works" />
            <span className="ip-h1-sup tnum" aria-hidden="true">
              ({pad2(WORKS.length)})
            </span>
          </span>
        </h1>
        <div className="ip-works-bar">
          <p data-reveal="200" className="ip-works-intro">
            Major projects and case studies from my recent work, from access control to commerce.
          </p>
          <div data-reveal="300" className="ip-works-controls">
            <div className="ip-filters" role="group" aria-label="Filter projects">
              {WORK_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="ip-pill"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  <span className="ip-pill-n tnum">{count(f)}</span>
                </button>
              ))}
            </div>
            <div className="ip-views" role="group" aria-label="Layout">
              <button type="button" className="ip-view" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
                <SquaresFour />
              </button>
              <button type="button" className="ip-view" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")}>
                <Rows />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div ref={listRef}>
        {view === "grid" ? (
          <section className="ip-grid" aria-label="Projects">
            {shown.map((p) => (
              <InnerLink
                key={p.slug}
                href={`/works/${p.slug}`}
                label={p.title}
                data-card="1"
                data-reveal="0"
                data-cursor="View"
                className="ip-card"
              >
                <div className="ip-card-in">
                  <div data-clip="1" className="ip-card-img">
                    <div data-par="1" className="ip-card-par">
                      <img src={p.img} alt="" loading="lazy" />
                    </div>
                    <div className="ip-card-ov" aria-hidden="true" />
                    <span className="ip-card-chip tnum">
                      {p.n} — {p.category}
                    </span>
                    <span className="ip-card-arrow" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <div className="ip-card-head">
                    <span className="ip-card-title">{p.title}</span>
                    <span className="ip-card-line" aria-hidden="true" />
                  </div>
                  <p className="ip-card-sub">{p.sub}</p>
                </div>
              </InnerLink>
            ))}
          </section>
        ) : (
          <section className="ip-list" aria-label="Projects">
            {shown.map((p) => (
              <InnerLink
                key={p.slug}
                href={`/works/${p.slug}`}
                label={p.title}
                data-card="1"
                data-proj={p.i}
                data-cursor="View"
                className="ip-row"
              >
                <span className="ip-row-n tnum">{p.n}</span>
                <span className="ip-row-main">
                  <span className="ip-row-title">{p.title}</span>
                  <span className="ip-row-sub-phone">{p.sub}</span>
                </span>
                <span className="ip-row-side">
                  {p.sub}
                  <br />
                  <span className="ip-accent-300">{p.category}</span>
                </span>
              </InnerLink>
            ))}
          </section>
        )}
      </div>

      {/* Desktop floating preview over list rows; driven by attachPointer. */}
      <div data-k="preview" className="preview" aria-hidden="true">
        {WORKS.map((p) => (
          <img key={p.slug} data-pimg="1" src={p.img} alt="" loading="lazy" />
        ))}
      </div>
    </>
  );
}
