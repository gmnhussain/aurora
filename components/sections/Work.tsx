/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PROJECTS } from "@/lib/content";

export function Work() {
  return (
    <section data-k="sec-projects" className="work">
      <div data-reveal="0" className="row-between">
        <span className="kicker">05 — Selected work</span>
        <a href="/works" className="btn btn-ghost work-all">
          All works <ArrowUpRight size="1em" />
        </a>
      </div>
      <div className="work-list">
        {PROJECTS.map((p, i) => (
          <a key={p.href} href={p.href} data-reveal="0" data-proj={i} data-cursor="View" className="proj">
            {/* Phone only: the image sits inline above the row. */}
            <div className="proj-img lighten">
              <img src={p.img} alt="" loading="lazy" />
            </div>
            <span className="proj-n tnum">0{i + 1}</span>
            <span className="proj-title">{p.title}</span>
            <span className="proj-meta">{p.meta}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/** Desktop floating preview that follows the cursor over project rows. */
export function WorkPreview() {
  return (
    <div data-k="preview" className="preview" aria-hidden="true">
      {PROJECTS.map((p) => (
        <img key={p.href} data-pimg="1" src={p.img} alt="" loading="lazy" />
      ))}
    </div>
  );
}
