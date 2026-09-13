"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, PenTool, Factory, Wrench, ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";

const steps = [
  {
    tab: "Замер",
    icon: <Briefcase className="w-5 h-5" />,
    badge: "Шаг 1 · в удобное время",
    heading: "Приезжаем с демо-чемоданом образцов",
    text: "Технический специалист выезжает на объект по договорённости — в удобное вам время, без выходных. Снимает размеры, смотрит стены и пол, показывает образцы стекла и фурнитуры вживую: цвет на экране всегда врёт.",
    image: "/img/shower-corner-empty.webp",
    facts: ["Лазерный замер", "Образцы стекла и всех покрытий", "Выезд без выходных"],
  },
  {
    tab: "Три расчёта",
    icon: <PenTool className="w-5 h-5" />,
    badge: "Шаг 2 · без навязывания",
    heading: "Присылаем три варианта расчёта с описанием",
    text: "Если не знаете, что выбрать — не страшно. Готовим три комплектации с подробным описанием, чтобы не осталось вопросов. Честно показываем, где можно сэкономить, а где лучше не стоит. Цену фиксируем в договоре.",
    image: "/img/partition-office.webp",
    facts: ["Чертёж и схема креплений", "3 варианта комплектации", "Цена в договоре"],
  },
  {
    tab: "Производство",
    icon: <Factory className="w-5 h-5" />,
    badge: "Шаг 3 · 12–18 дней",
    heading: "Закалка, полировка кромки, отверстия под фурнитуру",
    text: "Стекло 8 мм закаливается после раскроя, поэтому размеры должны быть точными с первого раза — за это отвечает замер. Фурнитура — сертифицированная, напрямую от заводов-изготовителей. Срочные проекты — от 5 дней.",
    image: "/img/shower-reeded.webp",
    facts: ["Закалённое стекло 8 мм", "Полированная кромка", "Срочно — от 5 дней"],
  },
  {
    tab: "Монтаж",
    icon: <Wrench className="w-5 h-5" />,
    badge: "Шаг 4 · один день",
    heading: "Ставим мастера с опытом от 10 лет",
    text: "Выставляем по уровню, ставим штанги жёсткости где нужно, герметизируем, регулируем двери и проверяем ход. Убираем за собой. Гарантия 1 год на стекло, фурнитуру и монтаж по акту приёма-передачи.",
    image: "/img/shower-corner.webp",
    facts: ["Опыт мастеров от 10 лет", "Чистый монтаж", "Гарантия 1 год"],
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const s = steps[active];

  return (
    <section id="process" className="bg-paper py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h2 className="h2">От звонка до стекла — четыре шага</h2>
        </div>

        <div className="card rounded-[28px] overflow-hidden">
          <div className="flex overflow-x-auto no-scrollbar border-b border-line p-2 bg-paper-2">
            {steps.map((st, i) => (
              <button
                key={st.tab}
                onClick={() => setActive(i)}
                className={"flex-1 min-w-[170px] py-3.5 px-5 flex items-center justify-center gap-3 rounded-2xl transition-colors " + (active === i ? "bg-card text-ink shadow-sm" : "text-ink-2 hover:text-ink")}
              >
                <span className={"w-9 h-9 rounded-xl flex items-center justify-center " + (active === i ? "bg-brass text-white" : "bg-card border border-line text-ink-2")}>{st.icon}</span>
                <span className="text-[16px] font-bold whitespace-nowrap">{i + 1}. {st.tab}</span>
              </button>
            ))}
          </div>

          <div className="p-6 md:p-12 min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center"
              >
                <div>
                  <h3 className="text-[28px] md:text-[36px] font-extrabold text-ink leading-[1.15] tracking-tight">{s.heading}</h3>
                  <p className="mt-5 text-[17px] text-ink-2 leading-relaxed">{s.text}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.facts.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[16px] font-medium text-ink">
                        <span className="w-2 h-2 rounded-full bg-brass shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => setActive((active + 1) % steps.length)} className="group inline-flex items-center gap-2 rounded-full bg-ink text-white px-7 py-3.5 text-[16px] font-bold hover:bg-brass transition-colors">
                      {active === steps.length - 1 ? "Сначала" : "Следующий шаг"}
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <a href="#contact" className="inline-flex items-center rounded-full border-2 border-line px-7 py-3.5 text-[16px] font-bold text-ink hover:border-ink transition-colors">
                      Вызвать замерщика
                    </a>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-line">
                  <img src={asset(s.image)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
