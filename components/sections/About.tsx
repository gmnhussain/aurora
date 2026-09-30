import { ABOUT_TEXT } from "@/lib/content";

const words = ABOUT_TEXT.split(" ");

export function About() {
  return (
    <section data-k="sec-about" className="about">
      <div className="about-pin">
        <div className="about-top">
          <span className="kicker">01 — About</span>
          <span className="about-since tnum">Since 2021</span>
        </div>
        <p className="about-text">
          {words.map((w, i) => (
            <span key={i} data-w="1">
              {w + " "}
            </span>
          ))}
        </p>
        <div className="about-meta">
          <span>Sr. Front-end Engineer, API Solutions Ltd</span>
          <span>Dhaka, Bangladesh</span>
          <span className="open">Open to new roles</span>
        </div>
      </div>
    </section>
  );
}
