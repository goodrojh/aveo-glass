"use client";

import { motion } from "framer-motion";
import { PenTool, Percent, FileText, Layers } from "lucide-react";
import { asset } from "@/lib/site";

const perks = [
  { icon: <Percent size={18} />, title: "Партнёрская программа", text: "Постоянный процент с каждого объекта и специальные условия для студий." },
  { icon: <FileText size={18} />, title: "Чертежи и DWG", text: "Отдаём узлы, схемы креплений и спецификации — вставляйте прямо в проект." },
  { icon: <Layers size={18} />, title: "Образцы в студию", text: "Привезём линейку стёкол и покрытий фурнитуры к вам, чтобы показать заказчику." },
  { icon: <PenTool size={18} />, title: "Нестандарт — наше", text: "Трапеции, косые резы, скрытый профиль, стекло в потолок. Скажите, что хотите." },
];

export default function Designers() {
  return (
    <section className="relative bg-ink py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] md:aspect-square rounded-[32px] overflow-hidden border border-white/10"
        >
          <img src={asset("/img/partition-bedroom.webp")} alt="Рифлёная перегородка в спальне" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">Проект дизайнера</p>
            <p className="text-white font-bold mt-1">Рифлёное стекло за изголовьем — свет из ванной проходит, силуэт остаётся тайной.</p>
          </div>
        </motion.div>

        <div>
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-brass">Дизайнерам и архитекторам</p>
          <h2 className="mt-3 text-[40px] md:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
            Вы рисуете —
            <br />
            <span className="text-white/40">мы делаем ровно так.</span>
          </h2>
          <p className="mt-5 text-white/60 leading-relaxed max-w-md">
            Работаем с дизайн-студиями и частными архитекторами. Держим сроки, не спорим с концепцией и не подменяем фурнитуру «аналогом».
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5 hover:bg-white/[0.07] transition-colors"
              >
                <span className="w-10 h-10 rounded-xl bg-brass/15 text-brass flex items-center justify-center">{p.icon}</span>
                <h4 className="mt-4 text-white font-bold">{p.title}</h4>
                <p className="mt-1.5 text-[13px] text-white/60 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
