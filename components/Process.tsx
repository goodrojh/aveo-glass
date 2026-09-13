"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, PenTool, Factory, Wrench, ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";

const steps = [
  {
    id: "measure",
    tab: "1. Замер",
    icon: <Ruler className="w-5 h-5" />,
    badge: "Шаг 01 · бесплатно по Москве",
    heading: "Приезжаем с образцами стекла и фурнитуры.",
    text: "Снимаем размеры лазером, смотрим уровень стен и пола, проверяем, куда открывать дверь и где проходят коммуникации. Показываем образцы вживую — цвет стекла и покрытия фурнитуры на фото врут.",
    image: "/img/shower-corner-empty.webp",
    facts: ["Лазерный замер", "Образцы 6 стёкол и 6 покрытий", "В день обращения — по договорённости"],
  },
  {
    id: "design",
    tab: "2. Проект и расчёт",
    icon: <PenTool className="w-5 h-5" />,
    badge: "Шаг 02 · в тот же день",
    heading: "Три варианта расчёта — эконом, оптимум, премиум.",
    text: "Подготовим чертёж с точными размерами, схему креплений и три комплектации на выбор. Расскажем честно, где можно сэкономить без потери качества, а где — лучше не стоит.",
    image: "/img/partition-office.webp",
    facts: ["Чертёж и схема креплений", "3 варианта комплектации", "Фиксируем цену в договоре"],
  },
  {
    id: "make",
    tab: "3. Производство",
    icon: <Factory className="w-5 h-5" />,
    badge: "Шаг 03 · 12–18 дней",
    heading: "Закалка, полировка кромки, отверстия под фурнитуру.",
    text: "Стекло 8–10 мм закаливается после раскроя — поэтому размеры должны быть идеальны с первого раза. Фурнитуру берём напрямую у производителей, без посредников и подделок.",
    image: "/img/shower-reeded.webp",
    facts: ["Закалённое стекло 8–10 мм", "Полированная кромка", "Срочно — от 5 дней"],
  },
  {
    id: "install",
    tab: "4. Монтаж",
    icon: <Wrench className="w-5 h-5" />,
    badge: "Шаг 04 · 2–4 часа",
    heading: "Ставим за несколько часов. Убираем за собой.",
    text: "Монтажники с опытом от 10 лет. Выставляем по уровню, герметизируем, регулируем двери, проверяем ход и примыкания. Гарантия на стекло, фурнитуру и работы.",
    image: "/img/shower-corner.webp",
    facts: ["Мастера от 10 лет опыта", "Чистый монтаж", "Гарантия на всё"],
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const s = steps[active];

  return (
    <section id="process" className="relative bg-ink py-24 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-brass">Как мы работаем</p>
          <h2 className="mt-3 text-[40px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
            От звонка до стекла — четыре шага
          </h2>
        </div>

        <div className="glass rounded-t-[32px] flex overflow-x-auto no-scrollbar p-2 border-b-0">
          {steps.map((st, i) => (
            <button
              key={st.id}
              onClick={() => setActive(i)}
              className={"flex-1 min-w-[190px] py-4 px-5 flex items-center justify-center gap-3 rounded-[22px] transition-all duration-400 " + (active === i ? "bg-mist text-ink" : "text-white/60 hover:text-white hover:bg-white/5")}
            >
              <span className={"w-10 h-10 rounded-xl flex items-center justify-center transition-all " + (active === i ? "bg-brass text-ink" : "border border-white/15 text-white/70")}>
                {st.icon}
              </span>
              <span className={"text-[15px] whitespace-nowrap " + (active === i ? "font-bold" : "font-medium")}>{st.tab}</span>
            </button>
          ))}
        </div>

        <div className="glass rounded-b-[32px] border-t-0 min-h-[520px] p-6 md:p-14 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-[45%_55%] gap-10 lg:gap-16 items-center"
            >
              <div className="flex flex-col gap-6">
                <span className="self-start rounded-full border border-brass/30 bg-brass/10 px-4 py-1 text-[11px] font-bold tracking-[2px] uppercase text-brass">
                  {s.badge}
                </span>
                <h3 className="text-3xl md:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight">{s.heading}</h3>
                <p className="text-white/65 leading-[1.7] max-w-[460px]">{s.text}</p>
                <ul className="space-y-2">
                  {s.facts.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-brass" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setActive((active + 1) % steps.length)}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-mist text-ink px-7 py-4 text-[15px] font-bold hover:bg-white transition-all"
                  >
                    {active === steps.length - 1 ? "Сначала" : "Следующий шаг"}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <a href="#quote" className="inline-flex items-center rounded-2xl border border-white/15 px-7 py-4 text-[15px] font-semibold text-white hover:bg-white/5 transition-all">
                    Вызвать замерщика
                  </a>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10">
                <img src={asset(s.image)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div className="text-[64px] md:text-[96px] font-extrabold leading-none text-white/15">0{active + 1}</div>
                  <div className="flex gap-1.5">
                    {steps.map((_, i) => (
                      <span key={i} className={"h-1.5 rounded-full transition-all " + (i === active ? "w-8 bg-brass" : "w-3 bg-white/30")} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
