"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";

/** Слово меняется, когда в видео собрался очередной объект: душевая ~0–14с, перегородка ~14–21с, лестница ~21–24с */
const phases = [
  { until: 13.8, word: "для душевой" },
  { until: 20.8, word: "для перегородки" },
  { until: 99, word: "для лестницы" },
];

const facts = [
  { v: "12–18 дней", l: "производство, срочно от 5" },
  { v: "1 год", l: "гарантия на стекло, фурнитуру и монтаж" },
  { v: "1 день", l: "монтаж за один выезд" },
  { v: "Замер с образцами", l: "стекло и фурнитура вживую" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState("/video/hero-assembly.mp4");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.innerWidth >= 1280) setSrc("/video/hero-assembly-2k.mp4");
  }, []);

  const onTime = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const t = e.currentTarget.currentTime;
    const i = phases.findIndex((p) => t < p.until);
    if (i !== -1 && i !== phase) setPhase(i);
  };

  const p = phases[phase];

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col bg-white overflow-hidden">
      {/* Видео справа */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[66%]">
          <video
            ref={videoRef}
            key={src}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
            onTimeUpdate={onTime}
            poster={asset("/img/hero-assembly.webp")}
            className="absolute inset-0 w-full h-full object-contain object-center opacity-50 lg:opacity-100"
          >
            <source src={asset(src)} type="video/mp4" />
          </video>
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent hidden lg:block" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent lg:hidden" />
      </div>

      {/* Контент */}
      <div className="relative flex-1 flex flex-col justify-center px-6 pt-[110px] md:pt-[120px] pb-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-ink leading-[0.95] tracking-[-0.035em]"
            >
              <span className="block font-extrabold text-[60px] md:text-[88px] lg:text-[108px]">Стекло</span>
              <span className="block h-[1.05em] text-[50px] md:text-[74px] lg:text-[92px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={p.word}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="serif-accent block brass-gradient pb-2"
                  >
                    {p.word}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <div className="mt-8 flex flex-col gap-7 items-start">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-[18px] md:text-[19px] leading-relaxed text-ink-2 max-w-[440px]">
                Для уникальных интерьеров. Покрытие антиналёт. Приедем с чемоданом образцов, смонтируем за один день.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-col gap-8">
                <a href="#quote" className="group self-start inline-flex items-center gap-3 rounded-full bg-ink text-white pl-8 pr-2 py-2 text-[17px] font-bold hover:bg-brass transition-colors">
                  Получить расчёт
                  <span className="w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={18} />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Полоса фактов — на всю ширину, под видео */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative -mt-px border-t border-line bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.v} className={"py-5 md:py-6 " + (i > 0 ? "md:pl-8 md:border-l md:border-line" : "") + (i > 0 ? " pl-4 md:pl-8" : "")}>
              <p className="text-[17px] md:text-[19px] font-extrabold tracking-tight text-ink leading-none">{f.v}</p>
              <p className="mt-1.5 text-[13px] md:text-[14px] text-muted leading-snug">{f.l}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
