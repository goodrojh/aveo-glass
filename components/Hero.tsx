"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Briefcase, ArrowRight } from "lucide-react";
import { asset, site } from "@/lib/site";

const heroes = [
  { id: "shower", video: "/video/hero-shower.mp4", poster: "/img/hero-shower.webp", label: "Душевые", caption: "Walk-in душевая с чёрным профилем" },
  { id: "partition", video: "/video/hero-partition.mp4", poster: "/img/hero-partition.webp", label: "Перегородки", caption: "Лофт-перегородка с чёрной раскладкой" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.85;
    v.load();
    v.play().catch(() => {});
  }, [active]);

  return (
    <section id="top" className="relative bg-paper pt-[140px] md:pt-[170px] pb-10 px-6 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brass/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
          Москва и Московская область
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-4 font-extrabold text-[40px] md:text-[58px] lg:text-[68px] leading-[1.04] tracking-[-0.03em] text-ink max-w-4xl mx-auto"
        >
          Душевые, перегородки
          <br />
          и ограждения <span className="brass-gradient">из закалённого стекла</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lead mt-6 max-w-[640px] mx-auto">
          Изготовим и установим точно в срок. Приедем с чемоданом образцов стекла и фурнитуры,
          пришлём три варианта расчёта, смонтируем за один день.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#quote" className="group inline-flex items-center gap-2 rounded-full bg-ink text-white px-8 py-4 text-[17px] font-bold hover:bg-brass transition-colors">
            Рассчитать стоимость
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full card px-8 py-4 text-[17px] font-bold text-ink hover:border-brass transition-colors">
            {site.phone}
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-ink-2">
          <span className="inline-flex items-center gap-2"><Clock size={17} className="text-brass" /> Производство 12–18 дней, срочно от 5</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-brass" /> Гарантия 1 год на стекло, фурнитуру и монтаж</span>
          <span className="inline-flex items-center gap-2"><Briefcase size={17} className="text-brass" /> Выезд с образцами</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative mt-12 md:mt-16 rounded-[28px] md:rounded-[40px] overflow-hidden card aspect-[16/10] md:aspect-[21/10]"
        >
          <video ref={videoRef} key={heroes[active].id} autoPlay muted loop playsInline poster={asset(heroes[active].poster)} className="absolute inset-0 w-full h-full object-cover">
            <source src={asset(heroes[active].video)} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

          <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="glass-dark rounded-2xl px-5 py-4 text-left max-w-md">
              <p className="text-[13px] font-bold tracking-[0.16em] uppercase text-white/75">Душевые от 15 000 ₽</p>
              <p className="mt-1 text-white text-[17px] md:text-[19px] font-bold leading-snug">{heroes[active].caption}</p>
            </div>
            <div className="glass-dark rounded-full p-1.5 flex gap-1">
              {heroes.map((h, i) => (
                <button key={h.id} onClick={() => setActive(i)} className={"rounded-full px-4 py-2 text-[14px] font-bold transition-colors " + (active === i ? "bg-white text-ink" : "text-white/90 hover:bg-white/15")}>
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
