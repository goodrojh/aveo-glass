"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Эконом",
    price: "от 15 000 ₽",
    text: "Статичная душевая шторка. Прозрачное закалённое стекло 8 мм, хром или чёрный матовый профиль.",
    features: ["Закалённое стекло 8 мм", "Хром / чёрный матовый", "Настенный профиль", "Монтаж за один выезд"],
  },
  {
    name: "Оптимум",
    price: "по расчёту",
    text: "Распашные и раздвижные душевые, перегородки с дверью, ограждения лестниц. Любой из 4 цветов стекла.",
    features: ["Любой цвет стекла, в т.ч. матовый", "7 покрытий фурнитуры", "Доводчики, магнитные уплотнители", "Штанги жёсткости в цвет"],
    highlight: true,
  },
  {
    name: "Премиум",
    price: "по расчёту",
    text: "Цельностеклянные ограждения на точечных креплениях, лофт-перегородки с раскладкой, рифлёное стекло, нестандартные формы.",
    features: ["Рифлёное, осветлённое, тонированное", "Точечные крепления, скрытый профиль", "Латунь, золото, бронза античная", "Изделия по эскизу дизайнера"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-card border-y border-line py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow">Цены</p>
          <h2 className="h2 mt-3">Три комплектации — три варианта расчёта</h2>
          <p className="lead mt-4">
            Стоимость экономичных душевых перегородок начинается от 15 000 рублей. После замера вы получаете все три варианта с точными суммами и подробным описанием — выбираете сами.
          </p>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="grid lg:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className={"relative rounded-[24px] p-8 flex flex-col " + (t.highlight ? "bg-ink text-white" : "bg-paper border border-line")}
            >
              {t.highlight && <span className="absolute top-6 right-6 bg-brass text-white rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em]">Выбирают чаще</span>}
              <h3 className={"text-[26px] font-extrabold " + (t.highlight ? "text-white" : "text-ink")}>{t.name}</h3>
              <p className={"mt-2 text-[16px] leading-relaxed " + (t.highlight ? "text-white/80" : "text-ink-2")}>{t.text}</p>
              <div className={"mt-6 text-[38px] font-extrabold tracking-tight " + (t.highlight ? "text-white" : "text-ink")}>{t.price}</div>
              <div className={"my-6 h-px w-full " + (t.highlight ? "bg-white/15" : "bg-line")} />
              <ul className="space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className={"flex items-start gap-3 text-[16px] " + (t.highlight ? "text-white/90" : "text-ink")}>
                    <Check size={18} className="text-brass mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#quote" className={"mt-8 inline-flex justify-center rounded-full px-7 py-4 text-[16px] font-bold transition-colors " + (t.highlight ? "bg-brass text-white hover:bg-brass-2" : "bg-ink text-white hover:bg-brass")}>
                Получить расчёт
              </a>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-6 text-[14px] text-muted max-w-3xl">
          Итоговая стоимость зависит от размеров, типа конструкции, цвета стекла и фурнитуры. Точная цена фиксируется в договоре после замера. Действуют программы скидок и подарков при заказе.
        </p>
      </div>
    </section>
  );
}
