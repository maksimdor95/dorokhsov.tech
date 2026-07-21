import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { useInView } from "../hooks/useInView";

type PillButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
};

export function PillButton({ children, href, onClick }: PillButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.setProperty("--tx", `${x * 0.22}px`);
    node.style.setProperty("--ty", `${y * 0.28}px`);
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tx", "0px");
    node.style.setProperty("--ty", "0px");
  };

  const className = "pill-button pill-button--magnetic";

  if (href) {
    const isHash = href.startsWith("#");
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        className={className}
        href={href}
        target={isHash ? undefined : "_blank"}
        rel={isHash ? undefined : "noreferrer"}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <span className="pill-button__label">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      className={className}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="pill-button__label">{children}</span>
    </button>
  );
}

export function MetaTags({ tags }: { tags: string[] }) {
  return <p className="type-xs text-carbon-black">{tags.join(" · ")}</p>;
}

export function SectionHeading({
  children,
  eyebrow,
}: {
  children: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-20 max-w-5xl">
      {eyebrow ? <p className="type-xs mb-5 text-stone">{eyebrow}</p> : null}
      <h2 className="type-5xl text-carbon-black">{children}</h2>
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-inview" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
