"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { asset } from "@/lib/site";

const stats = [
  { n: 10, suffix: "+", label: "лет опыта у каждого мастера", bars: [40, 60, 30, 80], lit: 1 },
  { n: 18, prefix: "12–", label: "дней от замера до монтажа", bars: [30, 50, 80, 40], lit: 2 },
  { n: 5, prefix: "от ", label: "дней — срочный заказ", bars: [20, 40, 60, 90], lit: 3 },
  { n: 24, suffix: "/7", label: "принимаем заявки, отвечаем быстро", bars: [30, 50, 70, 100], lit: 4 },
];

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="relative w-full bg-ink py-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[40px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
          Цифры, за которые
          <br />
          <span className="text-white/40">отвечаем.</span>
        </motion.h2>
        <p className="text-white/60 max-w-sm md:text-right leading-relaxed">
          Никаких «более 10 000 довольных клиентов». Только то, что прописано в договоре и проверяется на объекте.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="relative h-[520px] md:h-[440px] w-full">
          <img src={asset("/img/railing-terrace.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/40" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-strong glass-edge w-full max-w-7xl rounded-[24px] overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
            >
              {stats.map((s, i) => (
                <div key={i} className="px-8 py-10 flex flex-col justify-between min-h-[200px]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-medium text-white/40 tracking-widest">00{i + 1}</span>
                    <div className="flex items-end gap-[3px] h-4">
                      {s.bars.map((h, j) => (
                        <div key={j} className="w-[3px] rounded-full" style={{ height: h + "%", backgroundColor: j < s.lit ? "#d9a45b" : "rgba(255,255,255,0.15)" }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
                      <Counter to={s.n} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <div className="mt-3 text-[11px] font-bold text-white/50 tracking-[0.15em] uppercase leading-snug">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
