"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset, glassTypes, hardwareColors } from "@/lib/site";

export default function GlassLab() {
  const [g, setG] = useState(glassTypes[0]);
  const [h, setH] = useState(hardwareColors[2]);
  const frame = { background: `linear-gradient(180deg, ${h.hi} 0%, ${h.color} 16%, ${h.color} 84%, ${h.hi} 100%)` };

  return (
    <section id="glass" className="bg-card border-y border-line py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
        <div>
          <p className="eyebrow">Стекло</p>
          <h2 className="h2 mt-3">Четыре цвета стекла. Каждый — в матовом исполнении</h2>
          <p className="lead mt-4">
            Всегда в наличии прозрачное, осветлённое, серое и бронза. Любой из них можно сделать матовым,
            отдельно — рифлёное. Переключайте, панель справа покажет результат. На замер привезём реальные образцы.
          </p>

          <div className="mt-8">
            <p className="text-[14px] font-bold text-muted mb-3">Тип стекла</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {glassTypes.map((x) => (
                <button key={x.id} onClick={() => setG(x)} className={"text-left rounded-2xl px-4 py-3.5 border-2 transition-colors " + (g.id === x.id ? "border-brass bg-brass-soft text-ink" : "border-line bg-card text-ink-2 hover:border-ink/30")}>
                  <span className="block text-[15px] font-bold">{x.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={g.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-3 text-[15px] text-ink-2">
                {g.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-6">
            <p className="text-[14px] font-bold text-muted mb-3">Цвет профиля и фурнитуры</p>
            <div className="flex flex-wrap gap-2">
              {hardwareColors.map((x) => (
                <button key={x.id} onClick={() => setH(x)} className={"flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 border-2 transition-colors " + (h.id === x.id ? "border-brass bg-brass-soft" : "border-line bg-card hover:border-ink/30")}>
                  <span className="w-7 h-7 rounded-full border border-ink/15" style={{ background: `radial-gradient(circle at 30% 30%, ${x.hi}, ${x.color} 60%)` }} />
                  <span className="text-[14px] font-semibold text-ink">{x.short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-[28px] overflow-hidden card aspect-[4/3]">
          <img src={asset("/img/shower-dawn.webp")} alt="Интерьер ванной" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-y-[8%] left-[10%] w-[44%]">
            <div className="absolute -inset-x-[6px] inset-y-0 rounded-sm" style={frame} />
            <div className="absolute -inset-y-[6px] inset-x-0 rounded-sm" style={frame} />
            <motion.div
              key={g.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 overflow-hidden"
              style={{
                background: g.tint,
                backdropFilter: `blur(${g.blur}px)`,
                WebkitBackdropFilter: `blur(${g.blur}px)`,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.3), inset 0 0 40px rgba(255,255,255,0.1)",
              }}
            >
              {g.reeded && (
                <div className="absolute inset-0 mix-blend-overlay" style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 3px, rgba(0,0,0,0.25) 3px 9px, rgba(255,255,255,0.2) 9px 14px)" }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
              <motion.div animate={{ x: ["-120%", "220%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }} className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-18deg]" />
            </motion.div>
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-2.5 h-24 rounded-full" style={frame} />
          </div>
          <div className="absolute bottom-4 left-4 glass rounded-2xl px-4 py-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted">Сейчас</p>
            <p className="text-ink font-bold text-[16px]">{g.label} · {h.label}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
