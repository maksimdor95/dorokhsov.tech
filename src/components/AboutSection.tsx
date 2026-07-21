import { profile } from "../data";
import { PillButton, SectionHeading } from "./ui";

export function AboutSection() {
  return (
    <section id="about" className="page-shell section-gap">
      <SectionHeading eyebrow={profile.experience}>About</SectionHeading>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="type-lg text-carbon-black">
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="bg-parchment p-6 md:p-8">
          <p className="type-xs text-stone">Focus</p>
          <ul className="mt-5 space-y-4">
            {profile.focus.map((item) => (
              <li key={item} className="type-lg text-carbon-black">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton href={profile.behance}>Behance</PillButton>
            <PillButton href={profile.github}>GitHub</PillButton>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="page-shell section-gap">
      <SectionHeading eyebrow="Предпочитаемый способ — email">
        Contact
      </SectionHeading>
      <div className="grid gap-8 lg:grid-cols-2">
        <p className="type-lg max-w-xl text-carbon-black">
          Открыт к консалтингу, UX/UI-проектам и разработке сайтов. Напишите
          коротко о задаче — отвечу с планом и сроками.
        </p>

        <div className="space-y-4">
          <a
            className="hairline type-xs flex items-center justify-between gap-4 py-4 text-carbon-black transition-colors hover:text-ink"
            href={`mailto:${profile.email}`}
          >
            <span>Email</span>
            <span>{profile.email}</span>
          </a>
          <a
            className="hairline type-xs flex items-center justify-between gap-4 py-4 text-carbon-black transition-colors hover:text-ink"
            href={profile.phoneHref}
          >
            <span>Phone</span>
            <span>{profile.phone}</span>
          </a>
          <a
            className="hairline type-xs flex items-center justify-between gap-4 py-4 text-carbon-black transition-colors hover:text-ink"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <span>GitHub</span>
            <span>maksimdor95</span>
          </a>
          <a
            className="hairline type-xs flex items-center justify-between gap-4 py-4 text-carbon-black transition-colors hover:text-ink"
            href={profile.behance}
            target="_blank"
            rel="noreferrer"
          >
            <span>Behance</span>
            <span>Portfolio</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="page-shell border-t border-carbon-black py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="type-xs text-carbon-black">
          {profile.fullName} · {profile.location}
        </p>
        <p className="type-xs text-stone">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
