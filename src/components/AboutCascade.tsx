import { useMemo, useState, type CSSProperties } from "react";
import {
  getBackdropVariant,
  type BackdropVariant,
} from "../backdropVariant";
import { useInView } from "../hooks/useInView";

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

function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

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
      fromX: (r1 - 0.5) * 80,
      fromY: -220 - r2 * 160,
      fromRot: (r1 - 0.5) * 42,
      floatDur: 1.8 + r3 * 1.4,
      floatDelay: 1.8 + id * 0.08 + r2 * 0.2,
    };
  });
}

function shapeClass(variant: BackdropVariant) {
  if (variant === "orbit") return "about-cascade__frame--circle";
  if (variant === "triangle") return "about-cascade__frame--triangle";
  return "about-cascade__frame--square";
}

function FrameShape({ variant }: { variant: BackdropVariant }) {
  if (variant === "triangle") {
    return (
      <svg className="about-cascade__svg" viewBox="0 0 100 100">
        <polygon
          points="50,6 94,90 6,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return null;
}

/** Side graphic in About — matches Hero shape for this page load. */
export function AboutCascade() {
  const [variant] = useState(getBackdropVariant);
  const frames = useMemo(() => buildCascadeFrames(), []);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`about-cascade about-cascade--${variant} ${inView ? "is-inview" : ""}`}
      aria-hidden="true"
    >
      {frames.map((frame) => (
        <span
          key={frame.id}
          className="about-cascade__slot"
          style={
            {
              top: frame.top,
              left: frame.left,
              width: frame.width,
              height: variant === "orbit" ? frame.width : frame.height,
              "--float-dur": `${frame.floatDur}s`,
              "--float-delay": `${frame.floatDelay}s`,
            } as CSSProperties
          }
        >
          <span
            className={`about-cascade__frame ${shapeClass(variant)}`}
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
          >
            <FrameShape variant={variant} />
          </span>
        </span>
      ))}
    </div>
  );
}
