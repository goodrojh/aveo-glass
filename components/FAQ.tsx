"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/site";

const faqs = [
  {
    q: "Какое стекло вы используете и не разобьётся ли оно?",
    a: "Только закалённое стекло 8–10 мм. Оно в 5–7 раз прочнее обычного, а если всё же разрушится — рассыпается на мелкие тупые гранулы, а не на осколки. Кромка полируется, отверстия под фурнитуру делаются до закалки.",
  },
  {
    q: "Сколько стоит и от чего зависит цена?",
    a: "Экономичные душевые перегородки — от 15 000 ₽ под ключ. Дальше цена зависит от размеров, типа конструкции (статичная, распашная, раздвижная), цвета стекла и покрытия фурнитуры. После замера вы получаете три варианта расчёта с точными суммами.",
  },
  {
    q: "Сколько ждать?",
    a: "Стандартно 12–18 календарных дней от замера до установки. Срочные заказы — от 5 дней, обсуждаем индивидуально. Сам монтаж занимает 2–4 часа.",
  },
  {
    q: "Замер платный?",
    a: "По Москве в пределах МКАД — бесплатно, при заказе. В область — по договорённости. Приезжаем с реальными образцами стекла и фурнитуры, чтобы вы выбирали не по фото.",
  },
  {
    q: "Какая гарантия?",
    a: "Гарантия распространяется на стекло, фурнитуру и монтажные работы. Сроки прописываем в договоре. Фурнитура — напрямую от производителей, поэтому за неё отвечаем спокойно.",
  },
  {
    q: "Можно ли сделать стекло в пол и без профиля?",
    a: "Да. Делаем безрамные конструкции на точечных креплениях и в скрытом профиле, стекло от пола до потолка, нестандартные формы — трапеции, скосы под мансарду.",
  },
  {
    q: "Что такое гидрофобное покрытие и нужно ли оно?",
    a: "Невидимый слой, из-за которого вода собирается в капли и скатывается, а известковый налёт почти не задерживается. Стекло реже нуждается в чистке. Наносим по желанию, в комплектации «Оптимум» — в подарок.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-ink-2 py-24 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-brass">Вопрос — ответ</p>
          <h2 className="mt-3 text-[40px] md:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.05] text-white">
            Спрашивают перед заказом
          </h2>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 md:-inset-8 rounded-[40px] overflow-hidden z-0">
            <img src={asset("/img/drops.webp")} alt="" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[1500ms]" />
            <div className="absolute inset-0 bg-ink/40" />
          </div>
          <div className="relative z-10 glass-strong glass-edge rounded-[32px] overflow-hidden">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={"border-b border-white/10 last:border-b-0 " + (!isOpen ? "hover:bg-white/5" : "")}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left px-7 py-6 flex items-center justify-between gap-6">
                    <span className="text-white text-[16px] font-semibold">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-brass text-2xl leading-none shrink-0">+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-7 pb-7 text-[15px] text-white/70 leading-[1.7]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
