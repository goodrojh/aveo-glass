"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { asset } from "@/lib/site";

const stats = [
  { n: 10, suffix: "+", label: "лет практики у каждого замерщика и монтажника" },
  { n: 18, prefix: "12–", label: "календарных дней — стандартный срок изготовления" },
  { n: 5, prefix: "от ", label: "дней — срочные проекты по договорённости" },
  { n: 24, suffix: "/7", label: "на связи, без выходных" },
];

const advantages = [
  { title: "Удобство работы с нами", text: "Мы на связи 24/7, без выходных. Специалист выезжает с демонстрационным чемоданом образцов в удобное для вас время — на встречи, замеры и монтаж." },
  { title: "Быстрые сроки", text: "Конструкции изготавливаются за 12–18 календарных дней в зависимости от сложности. Срочные проекты реализуем от 5 дней." },
  { title: "Фурнитура от производителя", text: "Напрямую сотрудничаем с ведущими заводами России, Европы и Азии — больше вариантов с оригинальной фурнитурой без переплат." },
  { title: "Профессионализм и опыт", text: "Все сотрудники — из сферы цельностеклянных конструкций. Замеры и монтажи выполняют мастера с опытом от десяти лет." },
  { title: "Индивидуальный подход", text: "Максимальное внимание к пожеланиям каждого заказчика. На постоянной основе действуют программы скидок и подарков при заказе." },
];

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1300);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

export default function Advantages() {
  return (
    <section className="bg-card border-y border-line py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="h2">Пять причин, которые проверяются на объекте</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-[20px] bg-paper border border-line p-6 md:p-7">
              <span className="text-[13px] font-bold text-brass tracking-[0.12em]">0{i + 1}</span>
              <h3 className="mt-2 text-[20px] font-bold text-ink">{a.title}</h3>
              <p className="mt-2 text-[16px] text-ink-2 leading-relaxed">{a.text}</p>
            </motion.div>
          ))}
          <div className="relative rounded-[20px] overflow-hidden border border-line min-h-[220px]">
            <img src={asset("/img/hinge-macro.webp")} alt="Петля на кромке закалённого стекла" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] bg-ink text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-10">
              <div className="text-[52px] md:text-[60px] font-extrabold tracking-tighter leading-none">
                <Counter to={s.n} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-[15px] text-white/75 leading-snug">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
