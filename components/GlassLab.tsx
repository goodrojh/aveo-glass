"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/site";

const products = [
  { id: "s", label: "Душевая" },
  { id: "p", label: "Перегородка" },
  { id: "r", label: "Ограждение" },
];

const glass = [
  { id: "clear", label: "Прозрачное", desc: "Классика. Лёгкий зелёный оттенок на торце — так выглядит обычное закалённое стекло." },
  { id: "ultra", label: "Осветлённое", desc: "Без зелёного оттенка. Для белых интерьеров и рядом со светлым камнем." },
  { id: "grey", label: "Серое", desc: "Дымчатое. Добавляет глубины, прячет лишнее, хорошо с чёрной и графитовой фурнитурой." },
  { id: "bronze", label: "Бронза", desc: "Тёплый тон. Сочетается с латунью, золотом, деревом и травертином." },
  { id: "matte", label: "Матовое", desc: "Любой из четырёх цветов в матовом исполнении: свет проходит, силуэт — нет." },
  { id: "reeded", label: "Рифлёное", desc: "Флютированное. Ломает свет на вертикальные полосы, тренд последних лет." },
];

export default function GlassLab() {
  const [pi, setPi] = useState(0);
  const [gi, setGi] = useState(0);
  const p = products[pi];
  const g = glass[gi];
  const img = (pid: string, gid: string) => `/img/glass-${pid}-${gid}.webp`;

  return (
    <section id="glass" className="bg-card border-y border-line py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-10">
          <h2 className="h2">Шесть вариантов стекла</h2>
          <p className="lead lg:max-w-md lg:justify-self-end">
            Четыре цвета — прозрачное, осветлённое, серое, бронза — каждый можно сделать матовым. Отдельно — рифлёное. Посмотрите, как стекло выглядит на разных конструкциях.
          </p>
        </div>

        {/* Переключатель продукта */}
        <div className="inline-flex rounded-full border border-line bg-paper p-1 mb-6">
          {products.map((x, k) => (
            <button key={x.id} onClick={() => setPi(k)} className={"rounded-full px-5 py-2 text-[15px] font-bold transition-colors " + (pi === k ? "bg-ink text-white" : "text-ink-2 hover:text-ink")}>
              {x.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Картинка — чистая, без плашек */}
          <div className="relative rounded-[28px] overflow-hidden border border-line aspect-[16/9] bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={p.id + g.id}
                src={asset(img(p.id, g.id))}
                alt={`${g.label} стекло — ${p.label.toLowerCase()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Список стекла + описание под ним */}
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {glass.map((x, k) => (
                <button
                  key={x.id}
                  onClick={() => setGi(k)}
                  className={"flex items-center gap-3 rounded-2xl p-2 pr-4 border-2 text-left transition-colors " + (gi === k ? "border-brass bg-brass-soft" : "border-line bg-card hover:border-ink/30")}
                >
                  <span className="relative w-14 h-11 rounded-xl overflow-hidden shrink-0 bg-paper-2">
                    <img src={asset(img(p.id, x.id))} alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.7] origin-center" />
                  </span>
                  <span className="text-[15px] font-bold text-ink">{x.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={g.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="mt-5 text-[15px] text-ink-2 leading-relaxed">
                <span className="font-bold text-ink">{g.label}. </span>{g.desc}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
