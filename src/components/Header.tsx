import type { CSSProperties } from "react";
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

export function Hero() {
  const taglines = Array.isArray(profile.tagline)
    ? profile.tagline
    : [profile.tagline];

  return (
    <section className="hero-stage">
      <HeroBackdrop />

      <div className="page-shell hero-stage__content">
        <div className="hero-copy">
          <h1 className="type-5xl-2 hero-headline flex w-full max-w-[20ch] flex-col gap-[8px] text-carbon-black">
            {profile.headline.map((line, index) => (
              <span
                key={line}
                className="hero-line"
                style={{ "--i": index } as CSSProperties}
              >
                <span className="hero-line__inner">{line}</span>
              </span>
            ))}
          </h1>

          <div
            className="hero-tagline type-xs hero-fade text-carbon-black"
            style={{ "--i": profile.headline.length } as CSSProperties}
          >
            {taglines.map((line) => (
              <p key={line} className="leading-[1.17]">
                {line}
              </p>
            ))}
          </div>

          <div className="hero-intro">
            <p
              className="type-lg hero-fade max-w-2xl text-carbon-black"
              style={
                {
                  "--i": profile.headline.length + 2,
                } as CSSProperties
              }
            >
              {profile.intro}
            </p>
            <div
              className="hero-fade mt-5 flex flex-wrap gap-3"
              style={
                {
                  "--i": profile.headline.length + 3,
                } as CSSProperties
              }
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
