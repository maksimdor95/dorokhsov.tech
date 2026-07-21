import { useState, type FormEvent } from "react";
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

type FormStatus = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            message: data.get("message"),
            _subject: "Заявка с dorokhov.tech",
            _template: "table",
          }),
        },
      );

      if (!response.ok) throw new Error("submit failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="page-shell section-gap">
      <SectionHeading eyebrow="Telegram или заявка">
        Contact
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <p className="type-lg max-w-xl text-carbon-black">
          Открыт к консалтингу, UX/UI-проектам, сайтам и Telegram-ботам.
          Напишите в Telegram или оставьте заявку ниже — отвечу с планом и
          сроками.
        </p>

        <div className="space-y-0">
          <a
            className="hairline type-xs flex items-center justify-between gap-4 py-4 text-carbon-black transition-colors hover:text-ink"
            href={profile.telegramHref}
            target="_blank"
            rel="noreferrer"
          >
            <span>Telegram</span>
            <span>@{profile.telegram}</span>
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
          <div className="pt-6">
            <PillButton href={profile.telegramHref}>
              Написать в Telegram
            </PillButton>
          </div>
        </div>
      </div>

      <div className="contact-panel mt-16 md:mt-20">
        <div className="contact-panel__intro">
          <p className="type-xs text-stone">Заявка</p>
          <h3 className="type-4xl mt-3 text-carbon-black">Напишите о задаче</h3>
          <p className="type-lg mt-4 max-w-md text-carbon-black">
            Коротко опишите проект — письмо придёт мне, отвечу на ваш email.
          </p>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-form__row">
            <label className="contact-field">
              <span className="type-xs text-stone">Имя</span>
              <input
                className="contact-input"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Как к вам обращаться"
              />
            </label>
            <label className="contact-field">
              <span className="type-xs text-stone">Email для ответа</span>
              <input
                className="contact-input"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
              />
            </label>
          </div>

          <label className="contact-field">
            <span className="type-xs text-stone">Задача</span>
            <textarea
              className="contact-input contact-input--area"
              name="message"
              required
              rows={5}
              placeholder="Проект, сроки, бюджет — в свободной форме"
            />
          </label>

          <div className="contact-form__actions">
            <PillButton type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Отправляю…" : "Отправить заявку"}
            </PillButton>
            {status === "sent" && (
              <p className="type-xs text-carbon-black">
                Отправлено. Скоро отвечу.
              </p>
            )}
            {status === "error" && (
              <p className="type-xs text-carbon-black">
                Не отправилось — напишите в{" "}
                <a
                  className="underline"
                  href={profile.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
                .
              </p>
            )}
          </div>
        </form>
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
        <p className="type-xs text-stone">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
