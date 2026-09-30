import { MARQUEE_ROWS, SKILL_GROUPS } from "@/lib/content";

export function Skills() {
  return (
    <section data-k="sec-skills" className="skills">
      <div data-reveal="0" className="row-between">
        <span className="kicker">02 — Skills</span>
        <span className="skills-count tnum">24 tools · 3 disciplines</span>
      </div>
      <h2 data-reveal="80">The stack I ship with, end to end.</h2>

      <div className="marquee" aria-hidden="true">
        {MARQUEE_ROWS.map((row, r) => (
          <div key={r} data-k={`mq${r + 1}`} className="marquee-row">
            <div className="marquee-track">
              {[...row, ...row].map((item, i) => (
                <span key={i} className="marquee-item">
                  <span className={item.outline ? "outline" : undefined}>{item.word}</span>
                  <span className="marquee-dot" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only">{MARQUEE_ROWS.flat().map((m) => m.word).join(", ")}</p>

      <div className="skill-cols">
        {SKILL_GROUPS.map((g, gi) => (
          <div key={g.title} data-reveal={gi * 120} className="skill-col">
            <div className="skill-col-head tnum">
              <span className="n">0{gi + 1}</span>
              <span className="c">{String(g.items.length).padStart(2, "0")}</span>
            </div>
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((item, i) => (
                <li key={item} data-reveal={60 + gi * 120 + i * 45}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
