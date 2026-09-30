import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SplitChars } from "../SplitChars";

const FACTS = [
  { label: "Degree", value: "Bachelor of Science" },
  { label: "University", value: "Daffodil International University" },
  { label: "Graduated", value: "2019 · Dhaka" },
];

const YEARS = ["2015", "2016", "2017", "2018", "2019"];

export function Education() {
  return (
    <section data-k="sec-education" className="edu">
      <div data-reveal="0" className="kicker">
        04 — Education
      </div>
      <h2 className="edu-title">
        <SplitChars text="Computer Science" />
        <SplitChars text="& Engineering" className="edu-title-outline" />
      </h2>

      <div className="edu-facts">
        {FACTS.map((f, i) => (
          <div key={f.label} data-reveal={i * 100} className="edu-fact">
            <div className="edu-fact-label">{f.label}</div>
            <div className="edu-fact-value">{f.value}</div>
          </div>
        ))}
      </div>

      {/* Scroll-linked ruler: the fill grows and lights each year as it passes. */}
      <div data-k="edruler" data-reveal="0" className="edu-ruler" aria-hidden="true">
        <div className="edu-ruler-track" />
        <div data-k="edfill" className="edu-ruler-fill" />
        <div className="edu-ticks tnum">
          {YEARS.map((y) => (
            <span key={y} data-tick="1" className="edu-tick">
              <span className="edu-node" />
              {y}
            </span>
          ))}
        </div>
      </div>

      <a href="https://diary.nazmulhussain.com" data-reveal="0" data-cursor="Read" className="edu-link">
        <span className="edu-link-kicker">Still learning</span>
        Read my public diary
        <ArrowUpRight size="1em" className="edu-link-arrow" />
      </a>
    </section>
  );
}
