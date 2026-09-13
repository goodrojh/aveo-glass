"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/site";

const glass = [
  { id: "clear", label: "Прозрачное", img: "/img/glass-clear.webp", desc: "Классика. Лёгкий зелёный оттенок на торце — так выглядит обычное закалённое стекло." },
  { id: "ultra", label: "Осветлённое", img: "/img/glass-ultra.webp", desc: "Без зелёного оттенка. Для белых интерьеров и там, где стекло стоит рядом со светлым камнем." },
  { id: "grey", label: "Серое", img: "/img/glass-grey.webp", desc: "Дымчатое. Добавляет глубины, прячет лишнее, хорошо с чёрной и графитовой фурнитурой." },
  { id: "bronze", label: "Бронза", img: "/img/glass-bronze.webp", desc: "Тёплый тон. Сочетается с латунью, золотом, деревом и травертином." },
  { id: "matte", label: "Матовое", img: "/img/glass-matte.webp", desc: "Любой из цветов в матовом исполнении: свет проходит, силуэт — нет. Для приватности." },
  { id: "reeded", label: "Рифлёное", img: "/img/glass-reeded.webp", desc: "Флютированное. Ломает свет на вертикальные полосы, тренд последних лет." },
];

export default function GlassLab() {
  const [i, setI] = useState(0);
  const g = glass[i];

  return (
    <section id="glass" className="bg-card border-y border-line py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-10">
          <h2 className="h2">Четыре цвета стекла. Каждый — в матовом исполнении</h2>
          <p className="lead lg:max-w-md lg:justify-self-end">
            Всегда в наличии прозрачное, осветлённое, серое и бронза. Любой из них можно сделать матовым, отдельно — рифлёное. На замер привезём реальные образцы.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Большая картинка — одна и та же душевая, меняется только стекло */}
          <div className="relative rounded-[28px] overflow-hidden card aspect-[16/9] bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={g.id}
                src={asset(g.img)}
                alt={g.label + " стекло"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute left-5 bottom-5 right-5 md:right-auto md:max-w-md glass rounded-2xl p-5">
              <AnimatePresence mode="wait">
                <motion.div key={g.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                  <p className="text-ink text-[20px] font-extrabold">{g.label}</p>
                  <p className="mt-1 text-[15px] text-ink-2 leading-relaxed">{g.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Список вариантов */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {glass.map((x, k) => (
              <button
                key={x.id}
                onClick={() => setI(k)}
                className={"group flex items-center gap-3 rounded-2xl p-2 pr-4 border-2 text-left transition-colors " + (i === k ? "border-brass bg-brass-soft" : "border-line bg-card hover:border-ink/30")}
              >
                <span className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-paper-2">
                  <img src={asset(x.img)} alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.6] origin-center" />
                </span>
                <span className="text-[15px] font-bold text-ink">{x.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
