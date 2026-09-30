"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { ROLES } from "@/lib/content";
import { ScrollTrigger, isPhone } from "@/lib/motion";
import { SplitChars } from "../SplitChars";

/** Accordion of roles: one open at a time, the first by default. Hover opens on desktop. */
export function Experience() {
  const [open, setOpen] = useState(0);
  const mounted = useRef(false);

  // Rows change height as they open, so re-measure every trigger below once the body settles.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 750);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <section data-k="sec-work" className="exp">
      <div data-reveal="0" className="row-between">
        <span className="kicker">03 — Experience</span>
        <span className="exp-range tnum">2021 → Now</span>
      </div>
      <h2 data-reveal="80">Four years, two teams, one habit: ship it well.</h2>

      <div className="jobs">
        {ROLES.map((role, i) => {
          const isOpen = open === i;
          const bodyId = `job-body-${i}`;
          return (
            <div
              key={role.title}
              data-job="1"
              className={`job${isOpen ? " is-open" : ""}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && !isPhone() && setOpen(i)}
            >
              <div data-draw="1" className="job-rule" />
              <div data-jprog="1" className="job-prog" />
              <div data-yr="1" className="job-yr tnum" aria-hidden="true">
                {role.dates.match(/\d{4}/)?.[0]}
              </div>

              <button
                type="button"
                className="job-head"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => setOpen((o) => (o === i ? -1 : i))}
              >
                <span className="job-main">
                  <span className="job-meta tnum">
                    <span className="job-n">0{i + 1}</span>
                    <span className="job-dates">{role.dates}</span>
                    {role.current && (
                      <span className="job-now">
                        <span className="pulse" />
                        Now
                      </span>
                    )}
                  </span>
                  <SplitChars text={role.title} className="job-title" />
                  <span className="job-org">
                    <span className="job-dash" />
                    {role.company}
                  </span>
                </span>
                <span className="job-plus" aria-hidden="true">
                  <Plus size="1em" />
                </span>
              </button>

              <div id={bodyId} className="job-body" inert={!isOpen}>
                <div>
                  <div className="job-body-in">
                    <p>{role.description}</p>
                    <div>
                      <div className="job-label">Stack</div>
                      <div className="job-tags">
                        {role.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div data-draw="1" className="job-rule" />
      </div>
    </section>
  );
}
