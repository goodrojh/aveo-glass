"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset, site } from "@/lib/site";

const faqs = [
  { q: "Какое стекло вы используете и безопасно ли оно?", a: "Закалённое стекло 8 мм. Оно в несколько раз прочнее обычного, а при разрушении рассыпается на мелкие тупые гранулы, а не на острые осколки. Кромка полируется, отверстия под фурнитуру делаются до закалки." },
  { q: "Сколько стоит и от чего зависит цена?", a: "Экономичные душевые перегородки — от 15 000 ₽. Дальше цена зависит от размеров, типа конструкции (статичная, распашная, раздвижная, гармошка), цвета стекла и покрытия фурнитуры. После замера присылаем три варианта расчёта с подробным описанием." },
  { q: "Сколько ждать?", a: "12–18 календарных дней в зависимости от сложности. Срочные проекты оговариваем индивидуально и делаем от 5 календарных дней. Монтаж — один выезд." },
  { q: "Как проходит замер?", a: "Технический специалист приезжает по договорённости в удобное время, без выходных, с демонстрационным чемоданом образцов стекла и фурнитуры. Снимает размеры и сразу консультирует по конструкции." },
  { q: "Какая гарантия?", a: "1 год на материалы и работы с момента подписания акта приёма-передачи. Дефекты материалов и работ устраняем за свой счёт. Не гарантийные случаи — механические повреждения, воздействие агрессивной химии, огня и умышленная порча." },
  { q: "Зачем нужна штанга жёсткости?", a: "Она фиксирует верхний угол неподвижного стекла. Производители фурнитуры рекомендуют её при ширине стационарного стекла более 400 мм и обязательно — когда дверь навешена на неподвижную панель. Делаем в цвет фурнитуры: укосина, обвязка, распор, круглого или квадратного сечения." },
  { q: "Что такое гидрофобное покрытие?", a: "Невидимый слой, из-за которого вода собирается в капли и скатывается, а известковый налёт почти не задерживается. Стекло реже нуждается в чистке. Наносим по желанию на любую душевую." },
  { q: "Закалённое стекло или триплекс?", a: "Для душевых и перегородок — закалённое: прочнее, легче, дешевле. Триплекс (два стекла с плёнкой) нужен там, где стекло при разрушении должно остаться в раме — например, в ограждениях без поручня. Подскажем на замере." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-card border-y border-line py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        {/* Картинка — липкая на десктопе */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:sticky lg:top-28">
          <p className="eyebrow">Вопрос — ответ</p>
          <h2 className="h2 mt-3">Спрашивают перед заказом</h2>
          <p className="lead mt-4 max-w-md">Коротко о стекле, сроках, гарантии и фурнитуре. Не нашли ответ — напишите, ответим в рабочее время за несколько минут.</p>

          <div className="relative mt-8 rounded-[28px] overflow-hidden card aspect-[3/4] max-h-[560px]">
            <img src={asset("/img/faq-bath.webp")} alt="Душевая перегородка с чёрным профилем" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 glass rounded-2xl p-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted">Остались вопросы</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a href={site.phoneHref} className="text-ink text-[18px] font-bold hover:text-brass transition-colors">{site.phone}</a>
                <a href={site.telegram} target="_blank" rel="noreferrer" className="rounded-full bg-ink text-white px-4 py-2 text-[14px] font-bold hover:bg-brass transition-colors">Написать в Telegram</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Аккордеон */}
        <div className="rounded-[24px] border border-line overflow-hidden bg-paper">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-line last:border-b-0">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between gap-6 hover:bg-card transition-colors">
                  <span className="flex items-start gap-4">
                    <span className="serif-accent text-brass text-[22px] leading-none mt-0.5 w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-ink text-[17px] md:text-[18px] font-bold">{f.q}</span>
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-brass text-3xl leading-none shrink-0">+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <p className="px-6 md:px-8 pb-7 md:pl-20 text-[16px] md:text-[17px] text-ink-2 leading-[1.7]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
