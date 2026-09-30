import { ROLES } from "@/lib/content";

export function Experience() {
  return (
    <section data-k="sec-work" className="exp">
      <div data-reveal="0" className="kicker">
        03 — Experience
      </div>
      <div className="exp-grid">
        <div className="exp-side">
          <div className="exp-years" aria-label="4+ years">
            <span data-k="yrs" className="tnum" aria-hidden="true">
              0
            </span>
            <span className="plus" aria-hidden="true">
              +
            </span>
          </div>
          <div className="exp-side-title">Years shipping for the web</div>
          <p>From owning products end to end to leading front-end today.</p>
          <div className="exp-stats">
            <div>
              <div className="v">02</div>
              <div className="l">Companies</div>
            </div>
            <div>
              <div className="v">09</div>
              <div className="l">Shipped works</div>
            </div>
          </div>
        </div>

        <div data-k="track" className="track">
          <div className="track-rail" />
          <div data-k="tl" className="track-fill" />
          <div data-k="tlDot" className="track-dot" />
          {ROLES.map((role) => (
            <article key={role.title} className="role">
              <div data-draw="1" className="role-rule" />
              <span data-node="1" className="role-node" />
              <div data-reveal="0" className={`role-head tnum${role.current ? " is-current" : ""}`}>
                <span>{role.dates}</span>
                {role.current && (
                  <span className="role-current">
                    <span className="pulse" />
                    Current role
                  </span>
                )}
              </div>
              <h3 data-fill="1" className="role-title">
                {role.title}
              </h3>
              <div data-reveal="100" className="role-company">
                <span className="dash" />
                {role.company}
              </div>
              <p data-reveal="180">{role.description}</p>
              <div data-reveal="260" className="role-stack">
                {role.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
