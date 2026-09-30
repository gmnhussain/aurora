import { PORTRAIT_SRC } from "@/lib/content";

export function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section data-k="sec-top" className="hero">
      <div data-k="portrait" className="hero-portrait lighten">
        <div data-k="portraitIn" className="hero-portrait-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PORTRAIT_SRC} alt="Portrait of G. M. Nazmul Hussain" fetchPriority="high" />
        </div>
      </div>
      <h1 className="hero-name">
        <span data-k="line1" className="hero-line">
          <span className="hero-mask">
            <span data-in="1">Nazmul</span>
          </span>
        </span>
        <span data-k="line2" className="hero-line">
          <span className="hero-mask">
            <span data-in="1">Hussain</span>
          </span>
        </span>
      </h1>
      <div className="hero-foot">
        <div data-fadein="1" className="hero-intro">
          <div className="kicker">G. M. Nazmul Hussain</div>
          <p>Full-stack developer in Dhaka. Four years building web and mobile apps with TypeScript, React, Next.js and Node.</p>
        </div>
        <div data-fadein="1" className="scroll-cue">
          <span className="scroll-cue-track" aria-hidden="true" />
          Scroll
        </div>
        <div data-fadein="1" className="hero-cta-wrap">
          <button type="button" data-magnet="1" data-cursor="Say hi" className="hero-cta" onClick={onContact}>
            Get in
            <br />
            touch
          </button>
        </div>
      </div>
    </section>
  );
}
