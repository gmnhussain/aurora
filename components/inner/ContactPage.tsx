"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowCounterClockwise,
  ArrowUpRight,
  Check,
  CircleNotch,
  Copy,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { SplitChars } from "../SplitChars";
import { CONTACT_TOPICS, ContactNotConfiguredError, isEmail, sendContact } from "@/lib/contact";
import { PHONE_DISPLAY, PHONE_RAW } from "@/lib/content";
import { revealAll, useScenes } from "@/lib/innerScenes";
import { prefersReducedMotion } from "@/lib/motion";

type Field = "name" | "email" | "msg";
type Status = "idle" | "sending" | "done" | "unconfigured" | "failed";

const SOCIALS = [
  { label: "LinkedIn", handle: "in/gmnhussain", href: "https://www.linkedin.com/in/gmnhussain/" },
  { label: "GitHub", handle: "github.com/gmnhussain", href: "https://github.com/gmnhussain" },
  { label: "WhatsApp", handle: PHONE_DISPLAY, href: "https://wa.me/8801551761805" },
  { label: "Messenger", handle: "m.me/nazmul.engineer", href: "https://m.me/nazmul.engineer" },
  { label: "Discord", handle: "nazmul.api", href: "https://discord.com/users/nazmul.api" },
  { label: "Facebook", handle: "fb.com/nazmul.engineer", href: "https://www.facebook.com/nazmul.engineer/" },
];

const MARQUEE = [0, 1].flatMap(() => ["Let’s talk", "Dhaka", "Open to new roles", "GMT+6"]);

const pad2 = (n: number) => String(n).padStart(2, "0");

export function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);
  const mqRef = useRef<HTMLDivElement>(null);

  useScenes(heroRef, revealAll);
  useScenes(bodyRef, revealAll);

  // Marquee: the CSS loop runs; scroll nudges it along (−scrollY · 0.3).
  useEffect(() => {
    const el = mqRef.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const set = () => (el.style.transform = `translateX(${(-window.scrollY * 0.3) % 2000}px)`);
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(set);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="ip-ct-hero">
        <div data-reveal="0" className="ip-labelrow">
          <span className="ip-accent">Contact</span>
          <span className="ip-open">
            <span className="pulse ip-live-dot" aria-hidden="true" />
            Open to new roles
          </span>
        </div>
        <h1 className="ip-ct-h1">
          <span className="ip-h1-line">
            <SplitChars text="Let’s" />
          </span>
          <span className="ip-h1-line ip-ct-indent ip-outline">
            <SplitChars text="talk." />
          </span>
        </h1>
        <p data-reveal="200" className="ip-ct-intro">
          Please feel free to contact me at your convenience — for a full-time role, a freelance project or just to say
          hello.
        </p>
      </section>

      <section ref={bodyRef} className="ip-ct-body">
        <SentenceForm />

        <div className="ip-ct-rule">
          <div data-draw="1" className="ip-fade-draw" />
        </div>
        <div className="ip-ct-info">
          <DhakaClock />
          <PhoneCopy />
        </div>

        <Elsewhere />
      </section>

      <section className="ip-ct-mq" aria-hidden="true">
        <div ref={mqRef} className="ip-ct-mq-nudge">
          <div className="ip-ct-mq-track">
            {MARQUEE.map((t, i) => (
              <span key={i} className="ip-ct-mq-item">
                <span className={i % 2 ? "ip-mq-outline" : undefined}>{t}</span>
                <span className="ip-mq-dot" />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** "Hi Nazmul, my name is [name] …" with inline inputs and topic words. */
function SentenceForm() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [topic, setTopic] = useState(0);
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const sendRef = useRef<HTMLButtonElement>(null);
  const okRef = useRef<HTMLSpanElement>(null);
  const okLineRef = useRef<HTMLDivElement>(null);

  const valid = { name: !!form.name.trim(), email: isEmail(form.email), msg: !!form.msg.trim() };
  const err = (k: Field) => tried && !valid[k];
  const filled = pad2(Object.values(valid).filter(Boolean).length);
  const set = (k: Field) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Success: the check springs in, the line follows.
  useLayoutEffect(() => {
    if (status !== "done" || prefersReducedMotion()) return;
    okRef.current?.animate(
      [
        { scale: "0.3", opacity: 0, rotate: "-90deg" },
        { scale: "1", opacity: 1, rotate: "0deg" },
      ],
      { duration: 900, easing: "cubic-bezier(.3,1.5,.5,1)" },
    );
    okLineRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(30px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 900, delay: 200, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" },
    );
  }, [status]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!valid.name || !valid.email || !valid.msg) {
      setTried(true);
      if (!prefersReducedMotion())
        sendRef.current?.animate(
          [{ translate: "0 0" }, { translate: "-8px 0" }, { translate: "8px 0" }, { translate: "-5px 0" }, { translate: "0 0" }],
          { duration: 420 },
        );
      return;
    }
    setStatus("sending");
    try {
      await sendContact({ name: form.name.trim(), email: form.email.trim(), topic: CONTACT_TOPICS[topic], message: form.msg.trim() });
      setStatus("done");
    } catch (error) {
      setStatus(error instanceof ContactNotConfiguredError ? "unconfigured" : "failed");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", msg: "" });
    setTried(false);
    setStatus("idle");
  };

  const hint =
    status === "unconfigured"
      ? `The form isn’t connected yet — please reach me on WhatsApp or call ${PHONE_DISPLAY}.`
      : status === "failed"
        ? `That didn’t go through. Try again, or reach me on WhatsApp at ${PHONE_DISPLAY}.`
        : tried && !(valid.name && valid.email && valid.msg)
          ? "A few blanks still need filling before this can go."
          : "Fill the blanks and tap a topic. No forms, just a note.";

  if (status === "done") {
    return (
      <div className="ip-sf ip-sf-done" role="status">
        <span ref={okRef} className="ip-okmark" aria-hidden="true">
          <Check />
        </span>
        <div>
          <div ref={okLineRef} className="ip-ok-line">
            Thanks, {form.name.trim().split(" ")[0] || "friend"}.
          </div>
          <p className="ip-ok-sub">Your message is on its way. I’ll get back to you at {form.email.trim()}.</p>
        </div>
        <button type="button" className="btn btn-ghost min44 ip-back" onClick={reset}>
          <ArrowCounterClockwise size="1em" /> Send another
        </button>
      </div>
    );
  }

  const blank = (k: "name" | "email", ph: string, type: string, auto: string) => (
    <span className="ip-blank" data-err={err(k) || undefined}>
      <input
        type={type}
        name={k}
        autoComplete={auto}
        value={form[k]}
        placeholder={ph}
        aria-label={k === "name" ? "Your name" : "Your email"}
        aria-invalid={err(k) || undefined}
        onChange={set(k)}
        style={{ width: `${Math.max(ph.length, form[k].length, 4) + 1}ch` }}
      />
      <span className="ip-blank-base" aria-hidden="true" />
      <span className="ip-blank-focus" aria-hidden="true" />
    </span>
  );

  return (
    <form className="ip-sf" noValidate onSubmit={submit} aria-label="Write to me">
      <div data-reveal="0" className="ip-labelrow">
        <span className="ip-muted-60">Write to me</span>
        <span className="ip-muted-55 tnum">
          <span className="ip-accent">{filled}</span> / 03
        </span>
      </div>
      <div data-draw="1" className="ip-sf-rule" />
      <p data-reveal="100" className="ip-sentence">
        Hi Nazmul, my name is {blank("name", "your name", "text", "name")} and I’m getting in touch about{" "}
        <span className="ip-topics" role="group" aria-label="Topic">
          {CONTACT_TOPICS.map((t, i) => {
            const last = i === CONTACT_TOPICS.length - 1;
            const btn = (
              <button key={t} type="button" className="ip-topic" aria-pressed={topic === i} onClick={() => setTopic(i)}>
                {t}
                <span className="ip-topic-ul" aria-hidden="true" />
                {!last && <span className="ip-topic-sep">,</span>}
              </button>
            );
            // Keep the full stop on the same line as the last topic.
            return last ? (
              <span key={t} className="ip-nowrap">
                {btn}.
              </span>
            ) : (
              btn
            );
          })}
        </span>{" "}
        You can reach me at {blank("email", "you@email.com", "email", "email")}.
      </p>
      <label data-reveal="200" className="ip-idea" data-err={err("msg") || undefined}>
        <span className="ip-idea-label">Here’s the idea</span>
        <textarea
          rows={3}
          name="message"
          value={form.msg}
          placeholder="A few lines is plenty."
          aria-invalid={err("msg") || undefined}
          onChange={set("msg")}
        />
        <span className="ip-blank-focus" aria-hidden="true" />
      </label>
      <div data-reveal="280" className="ip-sf-foot">
        <span className="ip-sf-hint" role="status" aria-live="polite">
          {hint}
        </span>
        <button
          ref={sendRef}
          type="submit"
          data-magnet="1"
          data-cursor="Send"
          className="ip-send"
          data-busy={status === "sending" || undefined}
        >
          {status === "sending" ? <CircleNotch className="ip-spin" size={24} /> : <PaperPlaneTilt size={24} />}
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}

const DHAKA = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const dayPart = (h: number) =>
  h >= 9 && h < 18 ? "Working hours" : h >= 18 && h < 22 ? "Evening" : h >= 5 && h < 9 ? "Morning" : "Night";

/** Local time in Dhaka, ticking every second, with a 24-hour line. */
function DhakaClock() {
  const [now, setNow] = useState<[string, string, string] | null>(null);
  const secRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => setNow(DHAKA.format(new Date()).split(":") as [string, string, string]);
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Seconds roll down into place on every tick.
  const ss = now?.[2];
  useEffect(() => {
    if (!ss || prefersReducedMotion()) return;
    secRef.current?.animate(
      [
        { transform: "translateY(-100%)", opacity: 0 },
        { transform: "none", opacity: 1 },
      ],
      { duration: 500, easing: "cubic-bezier(.2,.7,.2,1)" },
    );
  }, [ss]);

  const [hh, mm] = now ?? ["--", "--", "--"];
  const pct = now ? ((+now[0] * 3600 + +now[1] * 60 + +now[2]) / 86400) * 100 : 0;

  return (
    <div data-reveal="0" className="ip-info">
      <div className="ip-info-head">
        <span>Local time · Dhaka</span>
        <span className="ip-accent-300">{now ? dayPart(+now[0]) : ""}</span>
      </div>
      <div className="ip-clock tnum">
        <span>
          {hh}:{mm}
        </span>
        <span className="ip-clock-s">
          <span ref={secRef}>{ss ?? "--"}</span>
        </span>
      </div>
      <div className="ip-day" aria-hidden="true">
        <div className="ip-day-fill" style={{ width: `${pct}%` }} />
        <span className="ip-day-dot" style={{ left: `${pct}%` }} />
      </div>
      <div className="ip-day-ticks tnum" aria-hidden="true">
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
    </div>
  );
}

/** Phone number: hover scrambles the digits; click copies. */
function PhoneCopy() {
  const [copied, setCopied] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);
  const scr = useRef<number | undefined>(undefined);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearInterval(scr.current);
      window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const scramble = () => {
    const el = numRef.current;
    if (!el || scr.current || prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
    let f = 0;
    scr.current = window.setInterval(() => {
      f++;
      el.textContent = Array.from(PHONE_DISPLAY)
        .map((c, i) => (c === " " || c === "+" || i < f / 1.6 ? c : String(Math.floor(Math.random() * 10))))
        .join("");
      if (f / 1.6 >= PHONE_DISPLAY.length) {
        window.clearInterval(scr.current);
        scr.current = undefined;
        el.textContent = PHONE_DISPLAY;
      }
    }, 30);
  };

  const copy = () => {
    navigator.clipboard?.writeText(PHONE_RAW).catch(() => {});
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div data-reveal="120" className="ip-info">
      <div className="ip-info-head">
        <span>Phone · WhatsApp</span>
        <span className="ip-accent-300 ip-copy-state" role="status" aria-live="polite">
          {copied ? <Check size="1em" /> : <Copy size="1em" />}
          {copied ? "Copied" : "Tap to copy"}
        </span>
      </div>
      <button
        type="button"
        data-cursor="Copy"
        className="ip-phone tnum"
        onClick={copy}
        onMouseEnter={scramble}
        aria-label={`Copy phone number ${PHONE_DISPLAY}`}
      >
        <span ref={numRef}>{PHONE_DISPLAY}</span>
      </button>
      <p className="ip-phone-note">Based in Dhaka, Bangladesh. Calls and messages on the same number.</p>
    </div>
  );
}

/** Big outlined names that ink-fill on hover. */
function Elsewhere() {
  const [on, setOn] = useState(-1);
  return (
    <div className="ip-else">
      <div data-reveal="0" className="ip-labelrow">
        <span className="ip-muted-60">Elsewhere</span>
        <span className="ip-accent-300 ip-else-handle">{on >= 0 ? SOCIALS[on].handle : ""}</span>
      </div>
      <div data-reveal="100" className="ip-socs" onMouseLeave={() => setOn(-1)}>
        {SOCIALS.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener"
            data-cursor="Open"
            className="ip-soc"
            onMouseEnter={() => setOn(i)}
            onFocus={() => setOn(i)}
            onBlur={() => setOn(-1)}
          >
            <span className="ip-soc-name">
              {s.label}
              <ArrowUpRight className="ip-soc-arrow" aria-hidden="true" />
            </span>
            {i < SOCIALS.length - 1 && <span className="ip-soc-dot" aria-hidden="true" />}
          </a>
        ))}
      </div>
    </div>
  );
}
