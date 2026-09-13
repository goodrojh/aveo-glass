"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/site";

const glasses = [
  { id: "clear", label: "Прозрачное", desc: "Классика. Лёгкий зеленоватый оттенок на торце.", tint: "rgba(210,230,225,0.10)", blur: 0, reeded: false, frost: 0 },
  { id: "ultra", label: "Осветлённое", desc: "Optiwhite без зелени — для белых интерьеров.", tint: "rgba(255,255,255,0.06)", blur: 0, reeded: false, frost: 0 },
  { id: "grey", label: "Серое", desc: "Дымчатое, скрывает лишнее, добавляет глубины.", tint: "rgba(30,32,36,0.45)", blur: 0, reeded: false, frost: 0 },
  { id: "bronze", label: "Бронза", desc: "Тёплый тон, идеален с латунью и деревом.", tint: "rgba(120,80,40,0.42)", blur: 0, reeded: false, frost: 0 },
  { id: "matte", label: "Матовое", desc: "Сатин: свет проходит, силуэт — нет.", tint: "rgba(255,255,255,0.35)", blur: 14, reeded: false, frost: 1 },
  { id: "reeded", label: "Рифлёное", desc: "Флютированное. Тренд №1, красиво ломает свет.", tint: "rgba(255,255,255,0.12)", blur: 6, reeded: true, frost: 0 },
];

const hardware = [
  { id: "black", label: "Чёрный мат", color: "#1a1a1c", hi: "#3a3a3e" },
  { id: "chrome", label: "Хром", color: "#b9bcc2", hi: "#ffffff" },
  { id: "gold", label: "Золото", color: "#c9a04a", hi: "#f2d68a" },
  { id: "brass", label: "Латунь", color: "#a98650", hi: "#dbc08a" },
  { id: "graphite", label: "Графит", color: "#45484d", hi: "#7a7e85" },
  { id: "bronze", label: "Бронза", color: "#6e5237", hi: "#a98263" },
];

export default function GlassLab() {
  const [g, setG] = useState(glasses[0]);
  const [h, setH] = useState(hardware[0]);

  const frameStyle = { background: `linear-gradient(180deg, ${h.hi} 0%, ${h.color} 18%, ${h.color} 82%, ${h.hi} 100%)` };

  return (
    <section id="glass" className="relative bg-ink-2 py-24 md:py-32 px-6 scroll-mt-20 overflow-hidden">
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-brass/10 blur-[160px] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-brass">Лаборатория стекла</p>
          <h2 className="mt-3 text-[40px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
            Подберите стекло
            <br />
            <span className="text-white/40">под свой интерьер</span>
          </h2>
          <p className="mt-5 text-white/60 leading-relaxed max-w-md">
            Шесть типов стекла и шесть покрытий фурнитуры. Переключайте — панель справа
            показывает, как это будет выглядеть на вашей стене. На замер привезём реальные образцы.
          </p>

          <div className="mt-8">
            <p className="text-[12px] font-semibold text-white/50 mb-3">Стекло</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {glasses.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setG(x)}
                  className={"text-left rounded-2xl px-4 py-3 border transition-all " + (g.id === x.id ? "border-brass bg-white/5 text-white" : "border-white/10 text-white/65 hover:bg-white/5")}
                >
                  <span className="block text-[14px] font-semibold">{x.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={g.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-3 text-[13px] text-white/55">
                {g.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-6">
            <p className="text-[12px] font-semibold text-white/50 mb-3">Фурнитура и профиль</p>
            <div className="flex flex-wrap gap-2">
              {hardware.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setH(x)}
                  className={"flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 border transition-all " + (h.id === x.id ? "border-brass bg-white/5" : "border-white/10 hover:bg-white/5")}
                >
                  <span className="w-7 h-7 rounded-full border border-white/25" style={{ background: `radial-gradient(circle at 30% 30%, ${x.hi}, ${x.color} 60%)` }} />
                  <span className="text-[13px] font-medium text-white/80">{x.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-[4/3] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <img src={asset("/img/shower-dawn.webp")} alt="Интерьер" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />

          {/* Glass pane */}
          <div className="absolute inset-y-[8%] left-[10%] w-[44%]">
            <div className="absolute -inset-x-[6px] inset-y-0 rounded-sm" style={frameStyle} />
            <div className="absolute -inset-y-[6px] inset-x-0 rounded-sm" style={frameStyle} />
            <motion.div
              key={g.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 overflow-hidden"
              style={{
                background: g.tint,
                backdropFilter: `blur(${g.blur}px) saturate(${g.frost ? 0.7 : 1.05})`,
                WebkitBackdropFilter: `blur(${g.blur}px)`,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25), inset 0 0 40px rgba(255,255,255,0.08)",
              }}
            >
              {g.reeded && (
                <div
                  className="absolute inset-0 mix-blend-overlay"
                  style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 3px, rgba(0,0,0,0.25) 3px 9px, rgba(255,255,255,0.2) 9px 14px)" }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
              <motion.div
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-18deg]"
              />
            </motion.div>
            {/* handle */}
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-2.5 h-24 rounded-full" style={frameStyle} />
          </div>

          <div className="absolute bottom-4 left-4 glass rounded-2xl px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">Сейчас</p>
            <p className="text-white font-bold">{g.label} · {h.label}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
