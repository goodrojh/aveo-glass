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
  hours: "Пн–Вс 09:00–18:00 · заявки 24/7",
  telegram: "https://t.me/+79104400720",
  whatsapp: "https://wa.me/79104400720",
  vk: "https://vk.com",
  ogrn: "1237700191662",
  inn: "7716979735",
};
