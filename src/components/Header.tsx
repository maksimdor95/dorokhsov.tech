import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { HeroBackdrop } from "./HeroBackdrop";
import { PillButton } from "./ui";
import { navItems, profile } from "../data";

export function Header() {
  return (
    <header className="page-shell site-header relative z-20">
      <div className="flex items-center justify-between">
        <a href="#" className="type-xs text-carbon-black">
          {profile.shortName}
          <sup className="ml-0.5 text-[0.55rem]">®</sup>
        </a>

        <nav className="hidden items-center gap-[29px] md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="type-xs text-carbon-black transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="type-xs text-carbon-black transition-colors hover:text-ink md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

type CaretPhase = "typing" | "hold" | "falling" | "gone";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function HeroHeadline({
  lines,
  onReady,
}: {
  lines: string[];
  onReady: () => void;
}) {
  const [typed, setTyped] = useState(() =>
    prefersReducedMotion() ? lines : lines.map(() => ""),
  );
  const [activeLine, setActiveLine] = useState(0);
  const [caretPhase, setCaretPhase] = useState<CaretPhase>(() =>
    prefersReducedMotion() ? "gone" : "typing",
  );
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReadyRef.current();
      return;
    }

    let cancelled = false;
    let timer = 0;
    let line = 0;
    let char = 0;
    const CHAR_MS = 48;
    const LINE_PAUSE_MS = 280;
    const HOLD_MS = 520;

    const tick = () => {
      if (cancelled) return;

      const current = lines[line];
      if (char < current.length) {
        char += 1;
        setTyped((prev) => {
          const next = [...prev];
          next[line] = current.slice(0, char);
          return next;
        });
        setActiveLine(line);
        timer = window.setTimeout(tick, CHAR_MS);
        return;
      }

      if (line < lines.length - 1) {
        line += 1;
        char = 0;
        setActiveLine(line);
        timer = window.setTimeout(tick, LINE_PAUSE_MS);
        return;
      }

      setCaretPhase("hold");
      onReadyRef.current();
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setCaretPhase("falling");
        timer = window.setTimeout(() => {
          if (!cancelled) setCaretPhase("gone");
        }, 700);
      }, HOLD_MS);
    };

    timer = window.setTimeout(tick, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [lines]);

  return (
    <h1
      className="type-5xl-2 hero-headline flex w-full flex-col text-carbon-black"
      aria-label={lines.join(". ")}
    >
      {lines.map((line, index) => {
        const showCaret =
          caretPhase !== "gone" &&
          (caretPhase === "typing"
            ? index === activeLine
            : index === lines.length - 1);

        return (
          <span key={line} className="hero-line hero-line--type">
            <span className="hero-line__ghost" aria-hidden>
              {line}
            </span>
            <span className="hero-line__typed">
              {typed[index]}
              {showCaret ? (
                <span
                  className={
                    caretPhase === "falling"
                      ? "hero-caret is-falling"
                      : "hero-caret"
                  }
                  aria-hidden
                />
              ) : null}
            </span>
          </span>
        );
      })}
    </h1>
  );
}

export function Hero() {
  const taglines = Array.isArray(profile.tagline)
    ? profile.tagline
    : [profile.tagline];
  const [copyReady, setCopyReady] = useState(() => prefersReducedMotion());

  return (
    <section className="hero-stage">
      <HeroBackdrop />

      <div className="page-shell hero-stage__content">
        <div className="hero-copy">
          <HeroHeadline
            lines={profile.headline}
            onReady={() => setCopyReady(true)}
          />

          <div
            className={`hero-tagline type-xs text-carbon-black ${copyReady ? "hero-fade" : "hero-fade-pending"}`}
            style={{ "--i": 0 } as CSSProperties}
          >
            {taglines.map((line) => (
              <p key={line} className="leading-[1.17]">
                {line}
              </p>
            ))}
          </div>

          <div className="hero-intro">
            <p
              className={`type-lg max-w-2xl text-carbon-black ${copyReady ? "hero-fade" : "hero-fade-pending"}`}
              style={{ "--i": 1 } as CSSProperties}
            >
              {profile.intro}
            </p>
            <div
              className={`mt-5 flex flex-wrap gap-3 ${copyReady ? "hero-fade" : "hero-fade-pending"}`}
              style={{ "--i": 2 } as CSSProperties}
            >
              <PillButton href="#work">View Work</PillButton>
              <PillButton href="#contact">Get in Touch</PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
