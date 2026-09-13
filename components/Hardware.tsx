"use client";

import { motion } from "framer-motion";
import { DoorOpen, Ruler, Grip, CircleDot, Shield, Layers } from "lucide-react";
import { asset, hardwareColors } from "@/lib/site";

const parts = [
  { icon: <DoorOpen size={20} />, title: "Петли и коннекторы", text: "Стекло-стена и стекло-стекло, с подъёмом и без, доводчики для тяжёлых дверей." },
  { icon: <Ruler size={20} />, title: "Штанги жёсткости", text: "Обязательны при неподвижном стекле шире 400 мм и когда дверь навешена на панель. Укосина, обвязка, распор — круглые и квадратные." },
  { icon: <Layers size={20} />, title: "Профили", text: "Настенные, напольные, потолочные. Скрытые под плитку или накладные, в цвет фурнитуры." },
  { icon: <Grip size={20} />, title: "Ручки и кнобы", text: "Скобы, кнобы, врезные — под любую руку и любой стиль, в том же покрытии, что и петли." },
  { icon: <CircleDot size={20} />, title: "Ролики и направляющие", text: "Для раздвижных: верхние треки, мягкое закрывание, стопоры." },
  { icon: <Shield size={20} />, title: "Уплотнители", text: "Магнитные, щёточные, силиконовые. Держат воду внутри и не желтеют." },
];

export default function Hardware() {
  return (
    <section id="hardware" className="bg-paper py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-10">
          <h2 className="h2">Напрямую от заводов. Семь покрытий всегда в наличии</h2>
          <p className="lead lg:max-w-md lg:justify-self-end">
            Сотрудничаем с производителями фурнитуры из России, Европы и Азии без посредников — больше вариантов с оригинальной фурнитурой и без переплат.
          </p>
        </div>

        {/* Карточки покрытий — одна и та же петля в семи финишах */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {hardwareColors.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group card rounded-[20px] overflow-hidden hover:border-brass/60 transition-colors"
            >
              <div className="relative aspect-square bg-white">
                <img src={asset(`/img/hw-${c.id}.webp`)} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="px-3.5 py-3 flex items-center gap-2.5 border-t border-line">
                <span className="w-4 h-4 rounded-full border border-ink/10 shrink-0" style={{ background: `radial-gradient(circle at 30% 30%, ${c.hi}, ${c.color} 62%)` }} />
                <span className="text-[13px] font-bold text-ink leading-tight">{c.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-muted">…а также другие покрытия под заказ. Всё покажем вживую на замере.</p>

        {/* Компоненты */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {parts.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card rounded-[20px] p-6 hover:border-brass/60 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-brass-soft text-brass flex items-center justify-center">{p.icon}</span>
              <h3 className="mt-4 text-[18px] font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
