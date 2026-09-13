"use client";

import { motion } from "framer-motion";
import { PenTool, Percent, FileText, Layers } from "lucide-react";
import { asset } from "@/lib/site";

const perks = [
  { icon: <Percent size={20} />, title: "Партнёрские условия", text: "Специальные условия для дизайн-студий и частных архитекторов на постоянной основе." },
  { icon: <FileText size={20} />, title: "Чертежи и узлы", text: "Отдаём схемы креплений и спецификации — вставляйте прямо в проект." },
  { icon: <Layers size={20} />, title: "Образцы в студию", text: "Привезём чемодан со стеклом и покрытиями фурнитуры, чтобы показать заказчику." },
  { icon: <PenTool size={20} />, title: "Нестандарт — наше", text: "Трапеции, косые резы, скрытый профиль, стекло в потолок. Реализуем самые смелые задумки." },
];

export default function Designers() {
  return (
    <section className="bg-paper py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[4/5] md:aspect-square rounded-[28px] overflow-hidden card">
          <img src={asset("/img/partition-bedroom.webp")} alt="Рифлёная перегородка в спальне" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted">Проект дизайнера</p>
            <p className="mt-1 text-ink font-bold text-[16px] leading-snug">Рифлёное стекло за изголовьем: свет из ванной проходит, силуэт остаётся скрытым.</p>
          </div>
        </motion.div>

        <div>
          <p className="eyebrow">Дизайнерам и архитекторам</p>
          <h2 className="h2 mt-3">Вы рисуете — мы делаем ровно так</h2>
          <p className="lead mt-4">
            Держим сроки, не спорим с концепцией и не подменяем фурнитуру «аналогом». Работаем с дизайн-студиями и частными архитекторами.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {perks.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="card rounded-[20px] p-6">
                <span className="w-11 h-11 rounded-xl bg-brass-soft text-brass flex items-center justify-center">{p.icon}</span>
                <h3 className="mt-4 text-[18px] font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[15px] text-ink-2 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
