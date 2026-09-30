"use client";

import { useState } from "react";
import { Browsers, Database, DeviceMobile, FigmaLogo } from "@phosphor-icons/react/dist/ssr";
import { SERVICES, type ServiceIcon } from "@/lib/content";
import { isPhone } from "@/lib/motion";

const ICONS: Record<ServiceIcon, typeof Browsers> = {
  browsers: Browsers,
  database: Database,
  mobile: DeviceMobile,
  figma: FigmaLogo,
};

/** Service rows: hover (desktop mouse) or tap activates one; the others dim. */
export function Services() {
  const [active, setActive] = useState(-1);

  return (
    <section data-k="sec-services" className="services">
      <div data-reveal="0" className="kicker">
        06 — What I do
      </div>
      <div
        className={`svc-list${active >= 0 ? " has-active" : ""}`}
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(-1)}
      >
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <div
              key={s.icon}
              data-reveal="0"
              className={`svc${active === i ? " is-active" : ""}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && !isPhone() && setActive(i)}
              onClick={() => setActive(i)}
            >
              <div className="svc-fill" aria-hidden="true" />
              <div className="svc-grid">
                <div className="svc-head">
                  <span className="svc-n tnum">0{i + 1}</span>
                  <h3 className="svc-title">{s.title}</h3>
                </div>
                <div className="svc-side">
                  <p>{s.description}</p>
                  <span className="svc-icon" aria-hidden="true">
                    <Icon size="1em" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div data-reveal="0" className="svc-foot">
        <span>Full-time roles and a few freelance projects each quarter.</span>
        <span>Rates on request</span>
      </div>
    </section>
  );
}
