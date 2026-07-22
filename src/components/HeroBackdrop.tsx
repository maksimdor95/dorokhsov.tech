import { useState } from "react";
import { getBackdropVariant } from "../backdropVariant";

function Grain() {
  return <div className="hero-grain" aria-hidden="true" />;
}

function GuideRules() {
  return (
    <div className="hero-rules">
      <span className="hero-rules__hline" />
      <span className="hero-rules__vline" />
    </div>
  );
}

function GuideCross({ className }: { className: string }) {
  return <span className={className} />;
}

/** A — sparse rules + one large outline circle. */
function OrbitBackdrop() {
  return (
    <div className="hero-backdrop hero-backdrop--orbit" aria-hidden="true">
      <GuideRules />
      <div className="hero-orbit">
        <span className="hero-orbit__ring hero-orbit__ring--outer" />
        <span className="hero-orbit__ring hero-orbit__ring--mid" />
        <GuideCross className="hero-orbit__cross" />
      </div>
      <Grain />
    </div>
  );
}

/** B — sparse rules + one large outline square. */
function SquareBackdrop() {
  return (
    <div className="hero-backdrop hero-backdrop--square" aria-hidden="true">
      <GuideRules />
      <div className="hero-square">
        <span className="hero-square__ring hero-square__ring--outer" />
        <span className="hero-square__ring hero-square__ring--mid" />
        <GuideCross className="hero-square__cross" />
      </div>
      <Grain />
    </div>
  );
}

/** C — sparse rules + one large outline triangle. */
function TriangleBackdrop() {
  return (
    <div className="hero-backdrop hero-backdrop--triangle" aria-hidden="true">
      <GuideRules />
      <div className="hero-triangle">
        <svg
          className="hero-triangle__ring hero-triangle__ring--outer"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,6 94,90 6,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <svg
          className="hero-triangle__ring hero-triangle__ring--mid"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,14 86,84 14,84"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
          />
        </svg>
        <GuideCross className="hero-triangle__cross" />
      </div>
      <Grain />
    </div>
  );
}

export function HeroBackdrop() {
  const [variant] = useState(getBackdropVariant);

  if (variant === "orbit") return <OrbitBackdrop />;
  if (variant === "square") return <SquareBackdrop />;
  return <TriangleBackdrop />;
}
