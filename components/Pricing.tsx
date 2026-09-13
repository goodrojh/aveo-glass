"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/site";

const tiers = [
  {
    name: "Эконом",
    price: "от 15 000 ₽",
    text: "Статичная душевая шторка или простая перегородка. Прозрачное стекло 8 мм, хром или чёрный профиль.",
    features: ["Закалённое стекло 8 мм", "Хром / чёрный мат", "Стандартные петли и профиль", "Монтаж 2 часа"],
    dark: false,
  },
  {
    name: "Оптимум",
    price: "от 28 000 ₽",
    text: "Распашные и раздвижные душевые, перегородки с дверью, ограждения лестниц. Любой цвет стекла.",
    features: ["Стекло 8–10 мм, любой оттенок", "6 покрытий фурнитуры", "Доводчики, магнитные уплотнители", "Гидрофобное покрытие в подарок"],
    dark: false,
    highlight: true,
  },
  {
    name: "Премиум",
    price: "индивидуально",
    text: "Безрамные ограждения, лофт-перегородки с раскладкой, рифлёное и осветлённое стекло, нестандартные формы.",
    features: ["Optiwhite, рифлёное, тонированное", "Точечные крепления, скрытый профиль", "Латунь, золото, бронза", "Персональный менеджер проекта"],
    dark: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink-2 py-24 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-brass">Цены</p>
          <h2 className="mt-3 text-[40px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
            Три комплектации.
            <br />
            <span className="text-white/40">Без скрытых доплат.</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            После замера вы получаете все три варианта с точной суммой. Выбираете сами — мы не навязываем.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid lg:grid-cols-3 gap-5"
        >
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className={"relative rounded-[28px] p-8 flex flex-col justify-between min-h-[520px] overflow-hidden " + (t.dark ? "" : "glass glass-edge") + (t.highlight ? " ring-1 ring-brass/60" : "")}
            >
              {t.dark && (
                <>
                  <img src={asset("/img/partition-wardrobe.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-ink/75" />
                </>
              )}
              {t.highlight && (
                <span className="absolute top-5 right-5 bg-brass text-ink rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">Выбирают чаще</span>
              )}
              <div className="relative z-10">
                <h3 className="text-[26px] font-bold text-white">{t.name}</h3>
                <p className="mt-2 text-[14px] text-white/65 leading-relaxed">{t.text}</p>
                <div className="mt-6 text-[40px] font-extrabold tracking-tight text-white">{t.price}</div>
                <div className="my-6 h-px w-full bg-white/10" />
                <ul className="space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[15px] text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#quote" className={"relative z-10 mt-10 inline-flex justify-center rounded-2xl px-7 py-4 text-[15px] font-bold transition-all hover:scale-[1.02] " + (t.highlight ? "bg-brass text-ink hover:bg-brass-2" : "bg-mist text-ink hover:bg-white")}>
                Получить расчёт
              </a>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-6 text-center text-[12px] text-white/40">
          Стоимость зависит от размеров, типа стекла и фурнитуры. Точная цена фиксируется в договоре после замера.
        </p>
      </div>
    </section>
  );
}
