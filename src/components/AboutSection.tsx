import { useState, type FormEvent } from "react";
import { profile } from "../data";
import { AboutCascade } from "./AboutCascade";
import { PillButton, SectionHeading } from "./ui";

export function AboutSection() {
  return (
    <section id="about" className="page-shell section-gap">
      <SectionHeading eyebrow="Как работаю">About</SectionHeading>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl space-y-6">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="type-lg text-carbon-black">
              {paragraph}
            </p>
          ))}
        </div>
        <AboutCascade />
      </div>
    </section>
  );
}

type FormStatus = "idle" | "sending" | "sent" | "error";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
  "text/plain",
];

function buildRequestText(name: string, email: string, message: string) {
  return `Заявка с dorokhov.tech\n\nИмя: ${name}\nEmail: ${email}\n\n${message}`;
}

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState("");
  const [fileName, setFileName] = useState("");
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const file = data.get("attachment");

    if (!name || !email || !message) {
      setStatus("error");
      setErrorText("Заполните все поля.");
      return;
    }

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        setStatus("error");
        setErrorText("Файл больше 5 МБ — сожмите или пришлите ссылку.");
        return;
      }
      if (file.type && !ACCEPTED_TYPES.includes(file.type)) {
        setStatus("error");
        setErrorText("Формат не подходит. PDF, DOC/DOCX, XLS/XLSX, JPG, PNG.");
        return;
      }
      if (!accessKey) {
        setStatus("error");
        setErrorText(
          "Вложения пока недоступны. Напишите в Telegram и приложите файл там.",
        );
        return;
      }
    }

    setStatus("sending");
    setErrorText("");

    // С ключом Web3Forms — письмо уходит само, с вложением.
    if (accessKey) {
      try {
        const payload = new FormData();
        payload.append("access_key", accessKey);
        payload.append("name", name);
        payload.append("email", email);
        payload.append("message", message);
        payload.append("subject", `Заявка с dorokhov.tech — ${name}`);
        payload.append("from_name", "dorokhov.tech");
        if (file instanceof File && file.size > 0) {
          payload.append("attachment", file, file.name);
        }

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: payload,
        });
        const result = (await response.json()) as {
          success?: boolean;
          message?: string;
        };

        if (!response.ok || !result.success) {
          throw new Error(result.message || "submit failed");
        }

        setStatus("sent");
        setFileName("");
        form.reset();
        return;
      } catch {
        setStatus("error");
        setErrorText("Не отправилось. Напишите в Telegram — или попробуйте ещё раз.");
        return;
      }
    }

    // Без ключа — fallback через почтовый клиент (без вложений).
    const text = buildRequestText(name, email, message);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Заявка с dorokhov.tech — ${name}`,
    )}&body=${encodeURIComponent(text)}`;
    window.setTimeout(() => {
      setStatus("sent");
      setFileName("");
      form.reset();
    }, 200);
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
            Можно приложить бриф или документ. Письмо придёт мне на почту —
            отвечу на ваш email.
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

          <div className="contact-field">
            <span className="type-xs text-stone">Вложение (опционально)</span>
            <label className="contact-file">
              <input
                className="contact-file__input"
                name="attachment"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp,.txt"
                onChange={(event) => {
                  const next = event.target.files?.[0];
                  setFileName(next ? next.name : "");
                  setStatus("idle");
                  setErrorText("");
                }}
              />
              <span className="contact-file__button type-xs">
                {fileName || "Прикрепить файл"}
              </span>
              <span className="type-xs text-stone">
                PDF, DOC, XLS, изображение · до 5 МБ
              </span>
            </label>
          </div>

          <div className="contact-form__actions">
            <PillButton type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Отправляю…" : "Отправить заявку"}
            </PillButton>
            {status === "sent" && (
              <p className="type-xs text-carbon-black">
                {accessKey
                  ? "Отправлено. Скоро отвечу."
                  : "Готово — подтвердите отправку в почтовом клиенте."}
              </p>
            )}
            {status === "error" && (
              <p className="type-xs text-carbon-black">
                {errorText || "Что-то пошло не так."}{" "}
                <a
                  className="underline"
                  href={profile.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
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
