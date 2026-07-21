import { useMemo, useState, type CSSProperties } from "react";

type BackdropVariant = "orbit" | "cascade";

const STORAGE_KEY = "dorokhov-hero-backdrop-v3";

/** Survives Strict Mode double-invoke within one page load. */
let pickedThisLoad: BackdropVariant | null = null;

function pickVariant(): BackdropVariant {
  if (pickedThisLoad) return pickedThisLoad;

  try {
    const last = localStorage.getItem(STORAGE_KEY);
    const next: BackdropVariant = last === "orbit" ? "cascade" : "orbit";
    localStorage.setItem(STORAGE_KEY, next);
    pickedThisLoad = next;
    return next;
  } catch {
    pickedThisLoad = Math.random() > 0.5 ? "orbit" : "cascade";
    return pickedThisLoad;
  }
}

function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type CascadeFrame = {
  id: number;
  top: string;
  left: string;
  width: string;
  height: string;
  settleRot: number;
  delay: number;
  duration: number;
  fromX: number;
  fromY: number;
  fromRot: number;
  floatDur: number;
  floatDelay: number;
};

/** Overlapping editorial frames — not a uniform card grid. */
function buildCascadeFrames(): CascadeFrame[] {
  const layout: Array<{
    top: string;
    left: string;
    width: string;
    height: string;
    settleRot: number;
  }> = [
    { top: "4%", left: "8%", width: "58%", height: "42%", settleRot: -2.5 },
    { top: "10%", left: "48%", width: "46%", height: "34%", settleRot: 3 },
    { top: "38%", left: "0%", width: "40%", height: "36%", settleRot: 1.5 },
    { top: "42%", left: "36%", width: "52%", height: "40%", settleRot: -1.8 },
    { top: "68%", left: "18%", width: "44%", height: "28%", settleRot: 2.2 },
    { top: "62%", left: "58%", width: "38%", height: "32%", settleRot: -3 },
  ];

  return layout.map((slot, id) => {
    const r1 = seeded(id + 7);
    const r2 = seeded(id + 31);
    const r3 = seeded(id + 53);
    return {
      id,
      ...slot,
      delay: id * 0.1 + r1 * 0.06,
      duration: 1.05 + r2 * 0.4,
      fromX: (r1 - 0.5) * 120,
      fromY: -340 - r2 * 240,
      fromRot: (r1 - 0.5) * 52,
      floatDur: 1.8 + r3 * 1.4,
      floatDelay: 1.8 + id * 0.08 + r2 * 0.2,
    };
  });
}

function Grain() {
  return <div className="hero-grain" aria-hidden="true" />;
}

/** A — sparse rules + one large outline circle on the right. */
function OrbitBackdrop() {
  return (
    <div className="hero-backdrop hero-backdrop--orbit" aria-hidden="true">
      <div className="hero-rules">
        <span className="hero-rules__hline" />
        <span className="hero-rules__vline" />
      </div>
      <div className="hero-orbit">
        <span className="hero-orbit__ring hero-orbit__ring--outer" />
        <span className="hero-orbit__ring hero-orbit__ring--mid" />
        <span className="hero-orbit__cross" />
      </div>
      <Grain />
    </div>
  );
}

/** B — outline frames cascade-fall into an overlapping collage. */
function CascadeBackdrop() {
  const frames = useMemo(() => buildCascadeFrames(), []);

  return (
    <div className="hero-backdrop hero-backdrop--cascade" aria-hidden="true">
      <div className="hero-cascade">
        {frames.map((frame) => (
          <span
            key={frame.id}
            className="hero-cascade__slot"
            style={
              {
                top: frame.top,
                left: frame.left,
                width: frame.width,
                height: frame.height,
                "--float-dur": `${frame.floatDur}s`,
                "--float-delay": `${frame.floatDelay}s`,
              } as CSSProperties
            }
          >
            <span
              className="hero-cascade__frame"
              style={
                {
                  "--delay": `${frame.delay}s`,
                  "--duration": `${frame.duration}s`,
                  "--from-x": `${frame.fromX}px`,
                  "--from-y": `${frame.fromY}px`,
                  "--from-rot": `${frame.fromRot}deg`,
                  "--settle-rot": `${frame.settleRot}deg`,
                } as CSSProperties
              }
            />
          </span>
        ))}
      </div>
      <Grain />
    </div>
  );
}

export function HeroBackdrop() {
  const [variant] = useState(pickVariant);

  return variant === "orbit" ? <OrbitBackdrop /> : <CascadeBackdrop />;
}
