import { PORTRAIT_SRC } from "@/lib/content";

/**
 * Layers, back to front: aurora (−2), halo (−1), "Nazmul" (0), portrait (1),
 * "Hussain" (2), bottom row (3). Both name layers sit above the bottom row via
 * --nb, which the hero scene measures.
 */
export function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section data-k="sec-top" className="hero">
      <div data-k="aurora" className="hero-aurora" aria-hidden="true">
        <div data-k="auroraIn" className="hero-aurora-in">
          <div className="hero-blob hero-blob-0" />
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div data-k="spot" className="hero-spot" />
          <div className="hero-fade" />
          <div className="hero-grain" />
        </div>
      </div>

      <div data-k="halo" className="hero-halo" aria-hidden="true">
        <div data-k="haloIn" className="hero-halo-in">
          <div className="hero-halo-fill" />
          <div className="hero-ring hero-ring-a" />
          <div className="hero-ring hero-ring-b" />
        </div>
      </div>

      <h1 className="hero-name hero-name-1">
        <span className="sr-only">G. M. Nazmul Hussain</span>
        <span data-k="line1" className="hero-line" aria-hidden="true">
          <span className="hero-mask">
            <span data-in="1">Nazmul</span>
          </span>
        </span>
      </h1>

      <div data-k="portrait" className="hero-portrait">
        <div data-k="portraitIn" className="hero-portrait-in">
          <div data-k="ptilt" className="hero-portrait-tilt lighten">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PORTRAIT_SRC} alt="Portrait of G. M. Nazmul Hussain" fetchPriority="high" />
          </div>
          <div className="hero-portrait-tint" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-name hero-name-2" aria-hidden="true">
        <span data-k="line2" className="hero-line">
          <span className="hero-mask">
            <span data-in="1">Hussain</span>
          </span>
        </span>
      </div>

      <div data-k="hrow" className="hero-foot">
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
