import { Fragment } from "react";
import { Browsers, Database, DeviceMobile, FigmaLogo } from "@phosphor-icons/react/dist/ssr";
import { SERVICES, type ServiceIcon } from "@/lib/content";

const ICONS: Record<ServiceIcon, typeof Browsers> = {
  browsers: Browsers,
  database: Database,
  mobile: DeviceMobile,
  figma: FigmaLogo,
};

export function Services() {
  return (
    <section data-k="sec-services" className="services">
      <div data-reveal="0" className="kicker">
        06 — What I do
      </div>
      <p data-reveal="80" className="services-lead">
        Available for full-time roles and a few freelance projects each quarter.
      </p>
      <div className="cards">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <Fragment key={s.icon}>
              {/* Zero-height marker at the card's un-stuck position; drives the stacking scene. */}
              {i > 0 && <div data-cardmark="1" className="card-mark" />}
              <article data-card="1" data-top={s.top} className="card" style={{ top: s.top }}>
                <div className="card-body">
                  <div className="card-top">
                    <span className="card-n tnum">0{i + 1} / 04</span>
                    <span className="tag tag-accent">Rates on request</span>
                  </div>
                  <div>
                    <h3 className="card-title">
                      {s.title[0]}
                      <br />
                      {s.title[1]}
                    </h3>
                    <p>{s.description}</p>
                  </div>
                </div>
                <div className="card-icon" aria-hidden="true">
                  <Icon size="1em" color="currentColor" />
                </div>
              </article>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
