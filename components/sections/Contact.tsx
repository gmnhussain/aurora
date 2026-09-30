import {
  ArrowDownRight,
  Check,
  Copy,
  EnvelopeSimple,
  FacebookLogo,
  FileText,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { PHONE_DISPLAY } from "@/lib/content";

const LINKS = [
  { href: "/contact", label: "Email", Icon: EnvelopeSimple },
  { href: "https://wa.me/8801551761805", label: "WhatsApp", Icon: WhatsappLogo },
  { href: "https://github.com/gmnhussain", label: "GitHub", Icon: GithubLogo },
  { href: "https://www.linkedin.com/in/gmnhussain/", label: "LinkedIn", Icon: LinkedinLogo },
  { href: "https://www.facebook.com/nazmul.engineer", label: "Facebook", Icon: FacebookLogo },
];

export function Contact({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  return (
    <section data-k="sec-contact" className="contact">
      <div data-reveal="0" className="contact-top">
        <div className="contact-title">
          <ArrowDownRight className="contact-arrow" size="1em" />
          <h2>
            Let’s work
            <br />
            together
          </h2>
        </div>
        <a href="/contact" className="btn btn-secondary min44">
          <FileText size="1em" /> Request résumé
        </a>
      </div>

      <div data-reveal="100" className="contact-phone">
        <button type="button" data-magnet="1" data-cursor="Copy" className="btn btn-primary phone-btn" onClick={onCopy}>
          {PHONE_DISPLAY} {copied ? <Check size="1em" /> : <Copy size="1em" />}
        </button>
        <span className="copy-hint" role="status" aria-live="polite">
          {copied ? "Copied to clipboard." : ""}
        </span>
      </div>

      <div data-reveal="160" className="contact-links">
        {LINKS.map(({ href, label, Icon }) => (
          <a key={label} href={href} className="btn btn-ghost min44">
            <Icon size="1em" /> {label}
          </a>
        ))}
      </div>

      <div className="fade-rule" />
      <div data-k="footname" className="foot-name" aria-hidden="true">
        Nazmul Hussain
      </div>
      <div className="foot-row">
        <span>© 2026 G. M. Nazmul Hussain</span>
        <span>Full-stack developer · Dhaka, Bangladesh</span>
      </div>
    </section>
  );
}
