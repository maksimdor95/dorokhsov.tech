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
  price: string;
  timeline: string;
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
  role: "Product Owner · FinTech · HRTech",
  location: "Москва",
  experience: "7+ лет",
  email: "dog_30@mail.ru",
  telegram: "Maksi_D",
  telegramHref: "https://t.me/Maksi_D",
  github: "https://github.com/maksimdor95",
  behance: "https://www.behance.net/maximdorokhov",
  headline: [
    "Запускаю продукты",
    "от идеи до",
    "масштабирования",
  ],
  tagline: ["Product owner · FinTech · HRTech", "UI/UX"],
  intro:
    "Запускаю и масштабирую B2B, B2B2C и B2E-продукты — от стратегии и гипотез до метрик и релизов.",
  about: [
    "Руковожу цифровыми продуктами: выстраиваю стратегию, клиентский путь и кросс-функциональные команды. Соединяю продукт, аналитику, UX и delivery в одном цикле — с фокусом на конверсию, метрики и time-to-market.",
    "Параллельно создаю собственные проекты: LEO AI — карьерный AI-ассистент, UI/UX-кейсы на Behance, 3D-редактор D&D.",
  ],
  focus: [
    "Product strategy & go-to-market",
    "Customer journey & conversion",
    "Кросс-функциональные команды 12–16+",
    "UX/UI, Figma, прототипирование",
    "Agile, backlog, метрики, CustDev",
    "MVP и AI-продукты",
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
    imageLabel: "D&D",
    imageTone: "linear-gradient(135deg, #f0f0f0 0%, #ccc4b9 50%, #8a8070 100%)",
  },
];

export const services: Service[] = [
  {
    id: "product",
    title: "Продуктовый консалтинг",
    tags: ["STRATEGY", "ROADMAP", "METRICS"],
    description:
      "Аудит продукта, приоритизация бэклога, CJM, гипотезы и метрики. Для FinTech, HRTech и B2B-сервисов.",
    price: "от 8 000 ₽ / час",
    timeline: "по запросу",
  },
  {
    id: "ux",
    title: "UX/UI и прототипирование",
    tags: ["FIGMA", "RESEARCH", "HANDOFF"],
    description:
      "Исследования, CJM, прототипы и UI для веба и мобайла. От концепта до передачи в разработку.",
    price: "от 75 000 ₽",
    timeline: "10–21 день",
  },
  {
    id: "audit",
    title: "Продуктовый аудит",
    tags: ["CJM", "BACKLOG", "ANALYTICS"],
    description:
      "Разбор текущего состояния продукта: воронка, метрики, UX-узкие места и рекомендации по приоритетам.",
    price: "от 45 000 ₽",
    timeline: "5–7 дней",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "start",
    name: "Визитка",
    price: "от 45 000 ₽",
    description:
      "Одностраничный сайт для эксперта или небольшого проекта. Структура, тексты, адаптив.",
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
      "Бот под задачу: лиды, запись, FAQ, уведомления или мини-продукт внутри Telegram.",
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
      "Editorial-лендинг с индивидуальным дизайном: типографика, сетка, портфолио, анимации.",
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
      "Многостраничный сайт для SaaS, AI-сервиса или MVP — со сценариями и интеграциями.",
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
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
