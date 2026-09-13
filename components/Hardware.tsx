"use client";

import { motion } from "framer-motion";
import { DoorOpen, Ruler, Grip, CircleDot, Shield, Layers } from "lucide-react";
import { hardwareColors } from "@/lib/site";

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
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <div>
            <p className="eyebrow">Фурнитура</p>
            <h2 className="h2 mt-3">Напрямую от заводов. Семь покрытий всегда в наличии</h2>
          </div>
          <p className="lead lg:max-w-md lg:justify-self-end">
            Сотрудничаем с производителями фурнитуры из России, Европы и Азии без посредников —
            поэтому можем предложить больше вариантов с оригинальной фурнитурой и без переплат.
          </p>
        </div>

        {/* Colors */}
        <div className="card rounded-[24px] p-6 md:p-8">
          <p className="text-[14px] font-bold text-muted mb-5">Классические цвета в наличии</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {hardwareColors.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <span className="w-16 h-16 rounded-full border border-ink/10 shadow-inner" style={{ background: `radial-gradient(circle at 30% 30%, ${c.hi}, ${c.color} 62%)` }} />
                <span className="text-[14px] font-semibold text-ink leading-tight">{c.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-[14px] text-muted">…а также другие покрытия под заказ. Всё покажем вживую на замере.</p>
        </div>

        {/* Parts */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
