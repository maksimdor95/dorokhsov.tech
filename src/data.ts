export type Project = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  href?: string;
  imageSrc?: string;
  embedSrc?: string;
  imageLabel: string;
  imageTone: string;
};

export type Service = {
  id: string;
  title: string;
  tags: string[];
  description: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  description: string;
  includes: string[];
};

export const profile = {
  name: "Максим Дорохов",
  fullName: "Дорохов Максим",
  shortName: "Dorokhov",
  title: "Руководитель направления / Product Owner",
  role: "Product systems · launch · growth",
  location: "Москва",
  experience: "7+ лет",
  email: "dog_30@mail.ru",
  telegram: "Maksi_D",
  telegramHref: "https://t.me/Maksi_D",
  github: "https://github.com/maksimdor95",
  behance: "https://www.behance.net/maximdorokhov",
  headline: [
    "Делаю цифровые",
    "продукты",
    "для роста бизнеса",
  ],
  tagline: ["Sites · bots · SaaS · AI", "Launch · growth"],
  intro:
    "Сайты, Telegram-боты и IT-продукты под запуск, автоматизацию и рост.",
  about: [
    "Работаю на стыке продукта, интерфейса и новых технологий. Сначала формулирую оффер и путь клиента, потом собираю структуру, визуал и логику, чтобы проект было легко показать рынку и развивать дальше.",
    "Делаю сайты под запуск, Telegram-боты, MVP и IT-продукты для сервисов, экспертов и SaaS. Важны ясность, доверие и следующий шаг для клиента.",
  ],
};

export const projects: Project[] = [
  {
    id: "leo",
    title: "LEO AI",
    tags: ["PRODUCT", "UI/UX", "AI", "WEB DEVELOPMENT"],
    description:
      "Карьерный AI-ассистент: подбор вакансий, сопроводительные и пробное собеседование в диалоге.",
    href: "https://leo-ai.ru",
    imageSrc: "/projects/leo-ai.png",
    imageLabel: "LEO AI",
    imageTone: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: "vizitka",
    title: "Сайт-визитка",
    tags: ["WEB DESIGN", "LANDING", "CONSULTING"],
    description:
      "Editorial-сайт для продуктового лидера: консалтинг, менторство и публикации в единой системе.",
    href: "https://marinadorokhova.ru",
    imageSrc: "/projects/marina-dorokhova.png",
    imageLabel: "Сайт-визитка",
    imageTone: "linear-gradient(135deg, #f0edea 0%, #d6d6d6 50%, #2a2a2a 100%)",
  },
  {
    id: "poznanie",
    title: "Познание",
    tags: ["MOBILE APP", "UI/UX", "EDTECH"],
    description:
      "Мобильное приложение для обучения: спокойная визуальная система и сценарии взаимодействия.",
    href: "https://www.behance.net/gallery/177106705/poznanie",
    embedSrc: "https://www.behance.net/embed/project/177106705?ilo0=1",
    imageLabel: "Poznanie",
    imageTone: "linear-gradient(135deg, #f7f3ee 0%, #e8dfd2 50%, #8b7355 100%)",
  },
  {
    id: "asteri",
    title: "Asteri Design",
    tags: ["MOBILE APP", "INTERIOR", "UI DESIGN"],
    description:
      "iOS-приложение для интерьерного дизайна: каталог, визуализация и сценарии подбора.",
    href: "https://www.behance.net/gallery/177101965/Asteri-Design",
    embedSrc: "https://www.behance.net/embed/project/177101965?ilo0=1",
    imageLabel: "Asteri Design",
    imageTone: "linear-gradient(135deg, #fafafa 0%, #e0e0e0 50%, #5c5c5c 100%)",
  },
  {
    id: "blackhat",
    title: "Black Hat",
    tags: ["MOBILE APP", "BRANDING", "UI/UX"],
    description:
      "Мобильный продукт с контрастной визуальной айдентикой и чистой навигационной логикой.",
    href: "https://www.behance.net/gallery/154404225/Black-Hat",
    embedSrc: "https://www.behance.net/embed/project/154404225?ilo0=1",
    imageLabel: "Black Hat",
    imageTone: "linear-gradient(135deg, #111111 0%, #2a2a2a 50%, #bcbcb4 100%)",
  },
  {
    id: "dordes",
    title: "D&D",
    tags: ["3D", "INTERIOR", "WEB APP"],
    description:
      "Интерактивный 3D-редактор интерьера: план квартиры, мебель, свет и смета в браузере.",
    imageSrc: "/projects/d-and-d.png",
    imageLabel: "D&D",
    imageTone: "linear-gradient(135deg, #111111 0%, #2a2a2a 50%, #1a1a1a 100%)",
  },
];

export const services: Service[] = [
  {
    id: "product",
    title: "Сайт под запуск",
    tags: ["OFFER", "TRUST", "WEB"],
    description:
      "Лендинг, визитка или продуктовый сайт, который понятно объясняет оффер и ведёт к лиду.",
  },
  {
    id: "ux",
    title: "Telegram-бот или агент в процесс",
    tags: ["BOT", "AGENT", "CRM"],
    description:
      "Закрывает рутину в воронке: заявки, запись, ответы клиенту, уведомления команде и передача в CRM. От простого сценария до агента, который сам ведёт диалог.",
  },
  {
    id: "audit",
    title: "От MVP до IT-продукта",
    tags: ["MVP", "SaaS", "PRODUCT"],
    description:
      "Собираю первый рабочий продукт: от гипотезы и сценариев до интерфейса, который можно показать рынку и развивать дальше.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "start",
    name: "Визитка",
    price: "от 45 000 ₽",
    description:
      "Быстрый старт для эксперта, сервиса или личного бренда: упаковать оффер и привести к контакту.",
    includes: [
      "1 страница, до 5 секций",
      "Адаптивная вёрстка",
      "Форма связи",
      "1 раунд правок",
    ],
  },
  {
    id: "telegram",
    name: "Telegram-бот",
    price: "от 55 000 ₽",
    description:
      "Когда нужна не просто кнопка в Telegram, а рабочий процесс: заявки, запись, ответы, уведомления или агент, который ведёт диалог.",
    includes: [
      "Сценарии и логика диалога",
      "Админ / Google Sheets / CRM",
      "Кнопки, меню, рассылки",
      "Деплой и передача",
      "1 раунд правок",
    ],
  },
  {
    id: "studio",
    name: "Лендинг",
    price: "от 75 000 ₽",
    description:
      "Запуск продукта, услуги или кейса с более сильной подачей, визуалом и акцентом на доверие.",
    includes: [
      "Кастомный UI",
      "До 6 секций",
      "Портфолио / кейсы",
      "2 раунда правок",
      "Деплой",
    ],
  },
  {
    id: "product",
    name: "Продуктовый сайт",
    price: "от 120 000 ₽",
    description:
      "Основа для SaaS, AI-сервиса или MVP: несколько сценариев, страницы, интеграции и запас для роста.",
    includes: [
      "UX-прототип",
      "Дизайн-система",
      "Фронтенд",
      "Базовая аналитика",
      "Поддержка запуска",
    ],
  },
];

export const navItems = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
