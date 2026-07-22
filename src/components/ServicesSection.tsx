import type { PricingTier, Service } from "../data";
import { MetaTags, SectionHeading } from "./ui";

function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="hairline grid gap-3 py-5 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-6">
      <div>
        <p className="type-xs text-carbon-black">{service.title}</p>
        <p className="type-lg mt-2 max-w-xl text-carbon-black">
          {service.description}
        </p>
      </div>
      <MetaTags tags={service.tags} />
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

export function ServicesSection({
  services,
  tiers,
}: {
  services: Service[];
  tiers: PricingTier[];
}) {
  return (
    <section id="services" className="page-shell section-gap">
      <SectionHeading eyebrow="Что можно запустить">
        Services
      </SectionHeading>
      <p className="type-lg -mt-10 mb-16 max-w-3xl text-carbon-black">
        Не отдельные часы дизайна, а готовый цифровой продукт под задачу
        бизнеса: привлечь клиента, автоматизировать путь или быстро вывести
        идею на рынок.
      </p>

      <div>
        {services.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </div>

      <div id="pricing" className="mt-20 scroll-mt-28">
        <p className="type-xs text-stone">С чего начать</p>
        <p className="type-lg mt-4 max-w-3xl text-carbon-black">
          Если задача уже понятна, можно зайти через готовый формат. Если нет
          точного пакета, собираю решение под продукт, сценарий и этап запуска.
        </p>
        <div className="mt-8 grid gap-[29px] md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
