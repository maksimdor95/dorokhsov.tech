import type { PricingTier, Service } from "../data";
import { MetaTags, SectionHeading } from "./ui";

function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="hairline grid gap-4 py-5 md:grid-cols-[1.2fr_1fr_auto_auto] md:items-center md:gap-6">
      <div>
        <p className="type-xs text-carbon-black">{service.title}</p>
        <p className="type-lg mt-2 max-w-xl text-carbon-black">
          {service.description}
        </p>
      </div>
      <MetaTags tags={service.tags} />
      <p className="type-xs text-carbon-black">{service.price}</p>
      <p className="type-xs text-stone">{service.timeline}</p>
    </div>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <article className="bg-linen p-6 md:p-8">
      <p className="type-xs text-stone">{tier.name}</p>
      <h3 className="type-4xl mt-4 text-carbon-black">{tier.price}</h3>
      <p className="type-lg mt-4 text-carbon-black">{tier.description}</p>
      <ul className="mt-6 space-y-3">
        {tier.includes.map((item) => (
          <li key={item} className="type-lg text-carbon-black">
            — {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="page-shell section-gap">
      <SectionHeading eyebrow="Консалтинг и дизайн">
        Services
      </SectionHeading>
      <p className="type-lg -mt-10 mb-20 max-w-2xl text-carbon-black">
        Продуктовая экспертиза, UX/UI и аудит — почасовая или проектная работа.
        Сайты и Telegram-боты — в блоке Pricing.
      </p>
      <div>
        {services.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export function PricingSection({ tiers }: { tiers: PricingTier[] }) {
  return (
    <section id="pricing" className="page-shell section-gap">
      <SectionHeading eyebrow="Сайты и боты">
        Pricing
      </SectionHeading>
      <p className="type-lg -mt-10 mb-20 max-w-3xl text-carbon-black">
        Сайты под ключ и Telegram-боты. Фиксированный объём, понятные сроки и
        продуктовый подход.
      </p>
      <div className="grid gap-[29px] md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
}
