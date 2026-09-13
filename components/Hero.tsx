"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { asset, site } from "@/lib/site";

/** Слово в заголовке меняется синхронно с видео: 0–10с душевая, 10–17с перегородка, 17–24с лестница */
const phases = [
  { until: 10.2, word: "для душевой", tag: "01 · Душевые конструкции", note: "Закалённое стекло 8 мм, чёрный профиль, поддон вровень с полом" },
  { until: 17.2, word: "для перегородки", tag: "02 · Перегородки", note: "Лофт-раскладка, глухие и с дверью, без потери света" },
  { until: 99, word: "для лестницы", tag: "03 · Ограждения", note: "Цельностеклянные на точечных креплениях, с поручнем и без" },
];

const stats = [
  { v: "12–18", u: "дней", l: "стандартный срок, срочно от 5" },
  { v: "1", u: "год", l: "гарантия на стекло, фурнитуру и монтаж" },
  { v: "7", u: "покрытий", l: "фурнитуры всегда в наличии" },
  { v: "24/7", u: "", l: "принимаем заявки, выезд без выходных" },
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

      {/* Огромное фоновое слово */}
      <div aria-hidden className="pointer-events-none absolute right-[4%] top-[12%] select-none hidden xl:block">
        <span className="outline-text font-extrabold text-[150px] leading-none tracking-[-0.06em] opacity-30">AVEO</span>
      </div>

      {/* Вертикальная подпись слева */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 items-center gap-3 [writing-mode:vertical-rl] rotate-180 text-[12px] font-bold tracking-[0.3em] uppercase text-muted">
        <span>Aveo Glass</span>
        <span className="w-px h-10 bg-line" />
        <span>Москва и область</span>
      </div>

      {/* Контент */}
      <div className="relative flex-1 flex flex-col justify-end px-6 lg:pl-20 pt-[120px] pb-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-[13px] font-bold text-ink">
                <span className="w-2 h-2 rounded-full bg-brass animate-pulse-soft" />
                Изготовление и монтаж
              </span>
              <AnimatePresence mode="wait">
                <motion.span key={p.tag} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="text-[13px] font-bold tracking-[0.14em] uppercase text-brass">
                  {p.tag}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-ink leading-[0.95] tracking-[-0.035em]"
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

            <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-[18px] md:text-[19px] leading-relaxed text-ink-2 max-w-[440px]">
                Замер с чемоданом образцов, три варианта расчёта, производство и монтаж за один выезд.
                <AnimatePresence mode="wait">
                  <motion.span key={p.note} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="block mt-2 text-[15px] text-muted">
                    {p.note}
                  </motion.span>
                </AnimatePresence>
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-col sm:flex-row gap-3">
                <a href="#quote" className="group inline-flex items-center gap-2 rounded-full bg-ink text-white px-7 py-4 text-[16px] font-bold hover:bg-brass transition-colors whitespace-nowrap">
                  Рассчитать стоимость
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href={site.phoneHref} className="glass inline-flex items-center justify-center rounded-full px-7 py-4 text-[16px] font-bold text-ink hover:border-brass transition-colors whitespace-nowrap">
                  {site.phone}
                </a>
              </motion.div>
            </div>
          </div>

          {/* Полоса статов */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 border-t border-line">
            {stats.map((s, i) => (
              <div key={i} className={"pt-4 pr-6 " + (i > 0 ? "md:border-l md:border-line md:pl-6" : "")}>
                <p className="text-ink leading-none">
                  <span className="text-[30px] md:text-[36px] font-extrabold tracking-tight">{s.v}</span>
                  {s.u && <span className="serif-accent text-[22px] md:text-[26px] text-brass ml-1.5">{s.u}</span>}
                </p>
                <p className="mt-1.5 text-[13px] md:text-[14px] text-muted leading-snug">{s.l}</p>
              </div>
            ))}
          </motion.div>

          <div className="mt-5 flex items-center gap-3 text-[13px] font-bold tracking-[0.14em] uppercase text-muted">
            <a href="#catalog" className="inline-flex text-ink/50 hover:text-ink transition-colors animate-bounce"><ArrowDown size={20} /></a>
            Листайте
          </div>
        </div>
      </div>
    </section>
  );
}
