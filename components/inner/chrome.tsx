"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight, FacebookLogo, GithubLogo, LinkedinLogo, List, WhatsappLogo, X } from "@phosphor-icons/react";
import { PHONE_DISPLAY } from "@/lib/content";
import { useScenes } from "@/lib/innerScenes";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";
import { InnerLink } from "./nav";

const NAV = [
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
];

const MENU = [{ href: "/", label: "Home" }, ...NAV];

const isOn = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** Inner-page header: brand, inline nav + "Let’s talk" on desktop, Menu on phone. Hides on scroll down. */
export function InnerHeader({ pathname, onMenu }: { pathname: string; onMenu: () => void }) {
  return (
    <>
      <header data-k="hdr" className="header ip-header">
        <InnerLink href="/" label="Hello" className="btn btn-ghost brand ip-brand">
          <span className="brand-dot" />
          G. M. Nazmul Hussain
        </InnerLink>
        <div className="ip-nav-wrap">
          <nav className="ip-nav" aria-label="Main">
            {NAV.map((n) => (
              <InnerLink
                key={n.href}
                href={n.href}
                label={n.label}
                className={`ip-nav-link${isOn(pathname, n.href) ? " is-on" : ""}`}
                aria-current={isOn(pathname, n.href) ? "page" : undefined}
              >
                {n.label}
                <span className="ip-nav-ul" aria-hidden="true" />
              </InnerLink>
            ))}
          </nav>
          <InnerLink href="/contact" label="Contact" data-magnet="1" className="btn btn-secondary min44 ip-talk">
            Let’s talk <ArrowUpRight size="1em" />
          </InnerLink>
        </div>
        <button type="button" className="btn btn-secondary menu-btn ip-menu-btn" onClick={onMenu} aria-haspopup="dialog">
          Menu <List size="1em" />
        </button>
      </header>
      <div data-k="bar" className="progress" aria-hidden="true" />
    </>
  );
}

/** Full-screen phone menu with the inner-page routes. */
export function InnerMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-ml]"));
    items[0]?.focus({ preventScroll: true });
    if (!prefersReducedMotion()) {
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: EASE.wipe });
      gsap.fromTo(
        items,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, delay: 0.18, stagger: 0.055, ease: EASE.reveal, clearProps: "transform" },
      );
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      gsap.killTweensOf([el, ...items]);
    };
  }, [onClose]);

  return (
    <div ref={ref} className="menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="menu-top">
        <span>Menu</span>
        <button type="button" className="btn btn-secondary menu-btn" onClick={onClose}>
          Close <X size="1em" />
        </button>
      </div>
      <nav>
        {MENU.map((m, i) => (
          <div key={m.href} className="menu-mask">
            <InnerLink
              href={m.href}
              label={m.href === "/" ? "Hello" : m.label}
              data-ml="1"
              className={`menu-item${isOn(pathname, m.href) ? " ip-menu-on" : ""}`}
              aria-current={isOn(pathname, m.href) ? "page" : undefined}
            >
              <span className="n tnum">0{i + 1}</span>
              <span className="l">{m.label}</span>
            </InnerLink>
          </div>
        ))}
      </nav>
      <div className="menu-foot">
        <span>Dhaka, Bangladesh · {PHONE_DISPLAY}</span>
      </div>
    </div>
  );
}

const FOOT_LINKS = [
  { href: "https://wa.me/8801551761805", label: "WhatsApp", Icon: WhatsappLogo },
  { href: "https://github.com/gmnhussain", label: "GitHub", Icon: GithubLogo },
  { href: "https://www.linkedin.com/in/gmnhussain/", label: "LinkedIn", Icon: LinkedinLogo },
  { href: "https://www.facebook.com/nazmul.engineer", label: "Facebook", Icon: FacebookLogo },
];

/** Section-blue footer. `cta` adds "Have a project in mind?" (off on Contact). */
export function InnerFooter({ cta }: { cta: boolean }) {
  const ref = useRef<HTMLElement>(null);

  // The big name slides in as the footer enters.
  useScenes(ref, (root, reduced) => {
    const name = root.querySelector<HTMLElement>("[data-footname]");
    if (!name || reduced) return;
    gsap.fromTo(
      name,
      { xPercent: -18 },
      { xPercent: 0, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } },
    );
  });

  return (
    <footer ref={ref} className="contact ip-foot">
      {cta && (
        <InnerLink href="/contact" label="Contact" data-cursor="Say hi" className="ip-cta">
          <ArrowDownRight className="contact-arrow" size="1em" />
          <span className="ip-cta-text">
            Have a project
            <br />
            in mind?
          </span>
        </InnerLink>
      )}
      <div className="contact-links">
        {FOOT_LINKS.map(({ href, label, Icon }) => (
          <a key={label} href={href} className="btn btn-ghost min44">
            <Icon size="1em" /> {label}
          </a>
        ))}
      </div>
      <div className="fade-rule" />
      <div data-footname="1" className="foot-name" aria-hidden="true">
        Nazmul Hussain
      </div>
      <div className="foot-row">
        <span>© 2026 G. M. Nazmul Hussain</span>
        <span>Full-stack developer · Dhaka, Bangladesh</span>
      </div>
    </footer>
  );
}
