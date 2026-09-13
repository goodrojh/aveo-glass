"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Briefcase, ArrowRight, ArrowDown } from "lucide-react";
import { asset, site } from "@/lib/site";

const heroes = [
  { id: "shower", video: "/video/hero-shower.mp4", poster: "/img/hero-shower.webp", label: "Душевые" },
  { id: "partition", video: "/video/hero-partition.mp4", poster: "/img/hero-partition.webp", label: "Перегородки" },
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
    <section id="top" className="relative min-h-[100svh] flex flex-col bg-ink overflow-hidden">
      <div className="absolute inset-0">
        <video ref={videoRef} key={heroes[active].id} autoPlay muted loop playsInline poster={asset(heroes[active].poster)} className="absolute inset-0 w-full h-full object-cover">
          <source src={asset(heroes[active].video)} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/80" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-[140px] pb-16">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[13px] font-bold tracking-[0.2em] uppercase text-white/80">
          Москва и Московская область
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-5 font-extrabold text-[42px] md:text-[62px] lg:text-[76px] leading-[1.02] tracking-[-0.03em] text-white max-w-5xl"
        >
          Душевые, перегородки
          <br />
          и ограждения <span className="text-brass-2">из закалённого стекла</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-6 text-[18px] md:text-[20px] leading-relaxed text-white/85 max-w-[640px]">
          Изготовим и установим точно в срок. Приедем с чемоданом образцов, пришлём три варианта расчёта, смонтируем за один день.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#quote" className="group inline-flex items-center gap-2 rounded-full bg-white text-ink px-8 py-4 text-[17px] font-bold hover:bg-brass-2 transition-colors">
            Рассчитать стоимость
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href={site.phoneHref} className="glass-dark inline-flex items-center rounded-full px-8 py-4 text-[17px] font-bold text-white hover:bg-white/20 transition-colors">
            {site.phone}
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-white/85">
          <span className="inline-flex items-center gap-2"><Clock size={17} className="text-brass-2" /> Производство 12–18 дней, срочно от 5</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-brass-2" /> Гарантия 1 год</span>
          <span className="inline-flex items-center gap-2"><Briefcase size={17} className="text-brass-2" /> Выезд с образцами</span>
        </motion.div>
      </div>

      <div className="relative px-6 pb-8 flex items-end justify-between max-w-7xl mx-auto w-full">
        <a href="#catalog" className="text-white/70 hover:text-white transition-colors animate-bounce"><ArrowDown size={22} /></a>
        <div className="glass-dark rounded-full p-1.5 flex gap-1">
          {heroes.map((h, i) => (
            <button key={h.id} onClick={() => setActive(i)} className={"rounded-full px-4 py-2 text-[14px] font-bold transition-colors " + (active === i ? "bg-white text-ink" : "text-white/90 hover:bg-white/15")}>
              {h.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
