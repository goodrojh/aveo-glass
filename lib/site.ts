export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE}${p}`;

export const site = {
  name: "Авео Гласс",
  legal: "ООО «Авео Гласс»",
  phone: "+7 910 440 07 20",
  phoneHref: "tel:+79104400720",
  email: "info@aveo-glass.ru",
  address: "Москва, ул. Стартовая, д. 25, к. 3, пом. 1/В",
  region: "Москва и Московская область",
  hours: "Пн–Вс 09:00–18:00 · заявки принимаем 24/7",
  telegram: "https://t.me/+79104400720",
  whatsapp: "https://wa.me/79104400720",
  vk: "https://vk.com",
  ogrn: "1237700191662",
  inn: "7716979735",
};

export const hardwareColors = [
  { id: "chrome", label: "Хром глянцевый", short: "Хром", color: "#c9ccd1", hi: "#ffffff" },
  { id: "chrome-matte", label: "Хром матовый (брашированный)", short: "Хром мат", color: "#a9adb3", hi: "#dfe2e6" },
  { id: "black", label: "Чёрный матовый", short: "Чёрный мат", color: "#1c1c1e", hi: "#3d3d42" },
  { id: "gold", label: "Золото глянцевое", short: "Золото", color: "#c99f3f", hi: "#f3d98a" },
  { id: "brass", label: "Латунь брашированная", short: "Латунь", color: "#a68850", hi: "#d6bd88" },
  { id: "graphite", label: "Графит брашированный", short: "Графит", color: "#4b4e54", hi: "#7d8087" },
  { id: "bronze", label: "Бронза античная", short: "Бронза", color: "#6c5237", hi: "#a6825f" },
];

export const glassTypes = [
  { id: "clear", label: "Прозрачное", desc: "Классика. Лёгкий зелёный оттенок на торце.", tint: "rgba(205,228,222,0.18)", blur: 0, reeded: false },
  { id: "ultra", label: "Осветлённое", desc: "Без зелёного оттенка — для белых интерьеров.", tint: "rgba(255,255,255,0.10)", blur: 0, reeded: false },
  { id: "grey", label: "Серое", desc: "Дымчатое, добавляет глубины и прячет лишнее.", tint: "rgba(40,42,48,0.45)", blur: 0, reeded: false },
  { id: "bronze", label: "Бронза", desc: "Тёплый тон, идеален с латунью и деревом.", tint: "rgba(120,80,40,0.42)", blur: 0, reeded: false },
  { id: "matte", label: "Матовое", desc: "Любой из цветов в матовом исполнении: свет проходит, силуэт нет.", tint: "rgba(255,255,255,0.45)", blur: 14, reeded: false },
  { id: "reeded", label: "Рифлёное", desc: "Флютированное. Красиво ломает свет, тренд последних лет.", tint: "rgba(255,255,255,0.14)", blur: 6, reeded: true },
];
