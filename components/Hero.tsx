"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ShieldCheck, Clock, Ruler } from "lucide-react";
import { asset } from "@/lib/site";
import Configurator from "./Configurator";

const heroes = [
  { id: "shower", video: "/video/hero-shower.mp4", poster: "/img/hero-shower.webp" },
  { id: "partition", video: "/video/hero-partition.mp4", poster: "/img/hero-partition.webp" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.85;
    v.load();
    v.play().catch(() => {});
  }, [active]);

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] flex flex-col bg-ink overflow-hidden">
      {/* Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={heroes[active].id}
          autoPlay
          muted
          loop
          playsInline
          poster={asset(heroes[active].poster)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={asset(heroes[active].video)} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.55)_100%)]" />
      </div>

      {/* Falling droplets decoration */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[12, 28, 47, 63, 81, 92].map((left, i) => (
          <span
            key={i}
            className="absolute top-0 w-[2px] h-10 rounded-full bg-gradient-to-b from-transparent via-white/40 to-white/70 animate-drop"
            style={{ left: left + "%", animationDelay: i * 0.7 + "s", animationDuration: 3 + (i % 3) + "s" }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex flex-col items-center text-center px-6 pt-[150px] md:pt-[170px] pb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-full px-4 py-1.5 text-[12px] font-semibold tracking-[0.2em] uppercase text-white/70 mb-6"
        >
          Москва и область · мастера с опытом от 10 лет
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold text-[44px] md:text-[68px] lg:text-[84px] leading-[0.98] tracking-[-0.03em] text-white max-w-5xl text-glow"
        >
          Стекло, которое
          <br />
          <span className="brass-gradient italic font-bold">меняет пространство</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-white/75 max-w-[560px] leading-relaxed"
        >
          Душевые перегородки, межкомнатные и офисные перегородки, ограждения лестниц и террас
          из закалённого стекла. Замер с образцами, производство 12–18 дней, гарантия на всё.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#quote"
            className="relative overflow-hidden rounded-full px-8 py-4 text-base font-bold bg-mist text-ink hover:bg-white transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_60px_rgba(217,164,91,0.25)]"
          >
            Рассчитать за 2 минуты
            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
          </a>
          <a
            href="#catalog"
            className="glass rounded-full px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
          >
            Смотреть каталог
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px] text-white/60"
        >
          <span className="inline-flex items-center gap-2"><Ruler size={14} className="text-brass" /> Выезд с образцами</span>
          <span className="inline-flex items-center gap-2"><Clock size={14} className="text-brass" /> Срочно — от 5 дней</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-brass" /> Гарантия на стекло, фурнитуру и монтаж</span>
        </motion.div>

        {/* Hero switcher */}
        <div className="mt-8 flex items-center gap-2">
          {heroes.map((h, i) => (
            <button
              key={h.id}
              onClick={() => setActive(i)}
              aria-label={"Сцена " + (i + 1)}
              className={"h-1.5 rounded-full transition-all " + (active === i ? "w-10 bg-brass" : "w-4 bg-white/30 hover:bg-white/60")}
            />
          ))}
        </div>

      </motion.div>

      <div id="quote" className="relative z-10 w-full px-6 pb-12 -mt-2 scroll-mt-28">
        <Configurator />
      </div>

      <a href="#catalog" className="relative z-10 mx-auto mb-6 text-white/40 hover:text-white transition-colors animate-bounce">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
