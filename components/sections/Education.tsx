import { ArrowUpRight, GraduationCap, Notebook } from "@phosphor-icons/react/dist/ssr";

export function Education() {
  return (
    <section data-k="sec-education" className="edu">
      <div data-reveal="0" className="kicker">
        04 — Education
      </div>
      <div className="edu-grid">
        <div data-reveal="0" data-spot="1" className="edu-main">
          <div data-k="edubg" aria-hidden="true" className="edu-bg">
            CSE
          </div>
          <div className="edu-top">
            <span className="edu-icon">
              <GraduationCap size="1em" />
            </span>
            <span className="tag tag-accent">Graduated 2019</span>
          </div>
          <div className="edu-body">
            <div className="edu-degree">B.Sc. in Computer Science and Engineering</div>
            <h3 className="edu-uni">Daffodil International University</h3>
            <div className="edu-years tnum">
              <span>2015</span>
              <span className="edu-line">
                <span data-k="edubar" className="edu-bar" />
                <span className="edu-cap" />
              </span>
              <span className="end">2019</span>
            </div>
          </div>
        </div>
        <a href="https://diary.nazmulhussain.com" data-reveal="120" data-spot="1" data-cursor="Read" className="edu-side">
          <div className="edu-side-top">
            <span>Still learning</span>
            <ArrowUpRight size={22} style={{ color: "var(--color-accent)" }} />
          </div>
          <div>
            <Notebook size={34} style={{ display: "block", color: "var(--color-accent-300)" }} />
            <div className="edu-side-title">A public diary</div>
            <p>Learning notes and references, written in the open.</p>
            <div className="edu-side-link">diary.nazmulhussain.com</div>
          </div>
        </a>
      </div>
    </section>
  );
}
