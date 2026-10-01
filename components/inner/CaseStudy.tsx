"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, SquaresFour } from "@phosphor-icons/react";
import { SplitChars } from "../SplitChars";
import { caseScenes } from "@/lib/caseScenes";
import { revealAll, useScenes } from "@/lib/innerScenes";
import { CASES, WORKS, pad2, workBySlug } from "@/lib/works";
import { InnerLink } from "./nav";

export function CaseStudy({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const work = workBySlug(slug) ?? WORKS[0];
  const cs = CASES[work.slug];
  const total = pad2(WORKS.length);
  const next = WORKS[(work.i + 1) % WORKS.length];
  const prev = WORKS[(work.i + WORKS.length - 1) % WORKS.length];

  useScenes(ref, (root, reduced) => {
    revealAll(root, reduced);
    caseScenes(root, reduced);
  });

  const meta = cs
    ? ([
        ["Role", cs.role],
        ["Company", cs.org],
        ["Platform", cs.platform],
        ["Stack", cs.stack],
      ] as const)
    : [];

  return (
    <div ref={ref}>
      {/* 1. Hero */}
      <section className="ip-cs-hero">
        <div data-reveal="0" className="ip-cs-top">
          <InnerLink href="/works" label="Works" className="btn btn-ghost min44 ip-back">
            <ArrowLeft size="1em" /> All works
          </InnerLink>
          <span className="ip-cs-count tnum">
            Case study <span className="ip-accent">{work.n}</span> / {total}
          </span>
        </div>
        <h1 className="ip-cs-h1">
          <SplitChars text={work.title} />
        </h1>
        <div className="ip-cs-subrow">
          <p data-reveal="200" className="ip-cs-sub">
            {work.sub}
          </p>
          {cs?.live && (
            <a data-reveal="280" data-magnet="1" data-cursor="Open" href={cs.live} target="_blank" rel="noopener" className="ip-live">
              <span className="pulse ip-live-dot" aria-hidden="true" />
              Live site <ArrowUpRight size="1em" />
            </a>
          )}
        </div>
        {meta.length > 0 && (
          <dl className="ip-meta">
            {meta.map(([k, v], i) => (
              <div key={k} data-reveal={200 + i * 80} className="ip-meta-item">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* 2. Hero image: opens out to full bleed as it scrolls in */}
      <section className="ip-cs-imgsec">
        <div data-k="heroclip" className="ip-heroclip">
          <img data-k="heroimg" src={work.img} alt={work.title} />
        </div>
      </section>

      {cs && (
        <>
          {/* 3. Overview: pinned, words light up with scroll */}
          <section data-k="ov" className="ip-ov">
            <div className="ip-ov-stage">
              <div className="ip-labelrow">
                <span className="ip-accent">01 — Overview</span>
                <span className="ip-muted-55">{cs.platform}</span>
              </div>
              <p className="ip-ov-text">
                {cs.summary.split(" ").map((w, i) => (
                  <span key={i} data-word="1">
                    {w}{" "}
                  </span>
                ))}
              </p>
              <div className="ip-tags">
                {cs.tags.map((t) => (
                  <span key={t} className="tag ip-tag-outline">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="ip-gutter">
            {/* 4. Objective */}
            <section className="ip-obj">
              <div data-reveal="0" className="ip-obj-label kicker">
                02 — Objective
              </div>
              <p data-reveal="100" className="ip-obj-text">
                {cs.objective}
              </p>
            </section>

            {/* 5. What I built */}
            <section className="ip-built">
              <div data-reveal="0" className="ip-labelrow">
                <span className="ip-accent">03 — What I built</span>
                <span className="ip-muted-60 tnum">{pad2(cs.tasks.length)} pieces</span>
              </div>
              <ol className="ip-tasks">
                {cs.tasks.map((t, i) => (
                  <li key={i} data-reveal="0" className="ip-task">
                    <div data-draw="1" className="ip-task-rule" />
                    <div className="ip-task-row">
                      <span className="ip-task-n tnum">{pad2(i + 1)}</span>
                      <span className="ip-task-text">{t}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* 6. Features: sticky counter on desktop, items lit by scroll */}
          <section className="ip-feat">
            <div className="ip-feat-cols">
              <div className="ip-feat-side" aria-hidden="true">
                <div className="kicker">04 — Features</div>
                <div className="ip-feat-numrow tnum">
                  <span className="ip-roll ip-feat-num">
                    <span data-k="fnum" className="ip-outline-num">
                      01
                    </span>
                  </span>
                  <span className="ip-feat-of">/ {pad2(cs.features.length)}</span>
                </div>
                <div className="ip-roll ip-feat-title-mask">
                  <div data-k="ftitle" className="ip-feat-title">
                    {cs.features[0][0]}
                  </div>
                </div>
                <div className="ip-feat-rail">
                  <div data-k="fbar" className="ip-feat-bar" />
                </div>
              </div>
              <div className="ip-feat-label kicker">04 — Features</div>
              <ol className="ip-feat-list">
                {cs.features.map(([title, text], i) => (
                  <li key={title} data-lit="feat" data-title={title} className="ip-lit ip-feat-item">
                    <div className="ip-feat-kicker tnum">
                      <span className="ip-accent">{pad2(i + 1)}</span>
                      {title}
                    </div>
                    <p className="ip-feat-text">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 7. Architecture: pinned pipeline on desktop */}
          <section data-k="arch" className="ip-arch-desk" style={{ height: "340vh" }}>
            <div className="ip-arch-stage">
              <div className="ip-labelrow">
                <span className="ip-accent">05 — Architecture</span>
                <span className="ip-muted-60">How a change reaches the door</span>
              </div>
              <div className="ip-arch-head" aria-live="off">
                <span className="ip-roll ip-arch-num tnum">
                  <span data-k="anum" className="ip-outline-num">
                    01
                  </span>
                </span>
                <div className="ip-arch-copy">
                  <div data-k="atitle" className="ip-arch-title">
                    {cs.arch[0][0]}
                  </div>
                  <p data-k="adesc" className="ip-arch-desc">
                    {cs.arch[0][2]}
                  </p>
                </div>
              </div>
              <div className="ip-pipe">
                <div className="ip-pipe-track" />
                <div data-k="afill" className="ip-pipe-fill" />
                <div data-k="apkt" className="ip-pkt" aria-hidden="true">
                  <span className="ip-pkt-trail" />
                  <span className="ip-pkt-dot" />
                </div>
                {cs.arch.map(([title, sub, desc], i, arr) => {
                  const pos = i === 0 ? "first" : i === arr.length - 1 ? "last" : "mid";
                  return (
                    <div
                      key={title}
                      data-anode={i}
                      data-title={title}
                      data-desc={desc}
                      data-pos={pos}
                      className="ip-anode"
                      style={{ left: `${(i / (arr.length - 1)) * 100}%` }}
                    >
                      <span className="ip-anode-title">{title}</span>
                      <span className="ip-adot" />
                      <span className="ip-anode-sub">{sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* Phone / reduced motion: vertical timeline */}
          <section className="ip-arch-phone">
            <div className="kicker">05 — Architecture</div>
            <ol className="ip-tl">
              {cs.arch.map(([title, sub, desc], i) => (
                <li key={title} data-lit="arch" className="ip-lit ip-tl-item">
                  <span className="ip-tl-dot" aria-hidden="true" />
                  <div className="ip-tl-k tnum">
                    {pad2(i + 1)} · {sub}
                  </div>
                  <div className="ip-tl-title">{title}</div>
                  <p className="ip-tl-desc">{desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 8. Screens: pinned horizontal gallery on desktop */}
          {cs.gallery.length > 0 && (
            <>
              <section data-k="hgal" className="ip-gal-desk" style={{ height: `${cs.gallery.length * 50 + 60}vh` }}>
                <div className="ip-gal-stage">
                  <div className="ip-labelrow ip-gal-head">
                    <span className="ip-accent">06 — Screens</span>
                    <span className="ip-muted tnum">
                      <span data-k="galcount" className="ip-gal-cur">
                        01
                      </span>{" "}
                      / {pad2(cs.gallery.length)}
                    </span>
                  </div>
                  <div data-k="htrack" className="ip-gal-track">
                    {cs.gallery.map((src, i) => (
                      <figure key={src} data-fig="1" className="ip-gal-fig">
                        <img src={src} alt={`${work.title} screen ${pad2(i + 1)}`} loading="lazy" />
                      </figure>
                    ))}
                  </div>
                  <div className="ip-gal-rail">
                    <div data-k="galbar" className="ip-gal-bar" />
                  </div>
                </div>
              </section>
              <section className="ip-gal-phone">
                <div data-reveal="0" className="kicker">
                  06 — Screens
                </div>
                <div className="ip-gal-stack">
                  {cs.gallery.map((src, i) => (
                    <figure key={src} data-clip="1" className="ip-gal-sfig">
                      <img src={src} alt={`${work.title} screen ${pad2(i + 1)}`} loading="lazy" />
                    </figure>
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* 9. Prev / all, then the next-project band */}
      <div className="ip-prevrow">
        <InnerLink href={`/works/${prev.slug}`} label={prev.title} className="btn btn-ghost min44 ip-back">
          <ArrowLeft size="1em" /> Previous: {prev.title}
        </InnerLink>
        <InnerLink href="/works" label="Works" className="btn btn-ghost min44 ip-allworks">
          <SquaresFour size="1em" /> All works
        </InnerLink>
      </div>
      <InnerLink href={`/works/${next.slug}`} label={next.title} data-cursor="Next" className="ip-next">
        <div className="ip-next-bg" aria-hidden="true">
          <img src={next.img} alt="" loading="lazy" />
          <div className="ip-next-shade" />
        </div>
        <div className="ip-labelrow">
          <span className="ip-accent">Next project</span>
          <span className="ip-muted tnum">
            {next.n} / {total}
          </span>
        </div>
        <div className="ip-next-row">
          <div className="ip-next-main">
            <div className="ip-next-title">
              <SplitChars text={next.title} />
            </div>
            <p className="ip-next-sub">{next.sub}</p>
          </div>
          <span className="ip-next-arrow" aria-hidden="true">
            <ArrowRight />
          </span>
        </div>
      </InnerLink>
    </div>
  );
}
