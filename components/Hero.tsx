"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Briefcase, ArrowRight, ArrowDown } from "lucide-react";
import { asset, site } from "@/lib/site";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // 1440p для больших экранов, 1080p для остальных
  const [src, setSrc] = useState("/video/hero-assembly.mp4");

  useEffect(() => {
    if (window.innerWidth >= 1280 && window.devicePixelRatio >= 1) setSrc("/video/hero-assembly-2k.mp4");
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [src]);

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col bg-white overflow-hidden">
      <div className="absolute inset-0">
        {/* на десктопе видео занимает правые 2/3, объект оказывается справа от текста; студия белая — края сливаются */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
          {/* object-contain: кадр целиком, без обрезки по вертикали; студия белая, поля не видны */}
          <video ref={videoRef} key={src} autoPlay muted loop playsInline poster={asset("/img/hero-assembly.webp")} className="absolute inset-0 w-full h-full object-contain object-center opacity-55 lg:opacity-100">
            <source src={asset(src)} type="video/mp4" />
          </video>
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent hidden lg:block" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 pt-[140px] pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
              Москва и Московская область
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-extrabold text-[42px] md:text-[60px] lg:text-[72px] leading-[1.02] tracking-[-0.03em] text-ink"
            >
              Душевые, перегородки и&nbsp;ограждения <span className="brass-gradient">из закалённого стекла</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lead mt-6 max-w-[560px]">
              Изготовим и установим точно в срок. Приедем с чемоданом образцов, пришлём три варианта расчёта, смонтируем за один день.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-9 flex flex-col sm:flex-row items-start gap-3">
              <a href="#quote" className="group inline-flex items-center gap-2 rounded-full bg-ink text-white px-8 py-4 text-[17px] font-bold hover:bg-brass transition-colors">
                Рассчитать стоимость
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={site.phoneHref} className="glass inline-flex items-center rounded-full px-8 py-4 text-[17px] font-bold text-ink hover:border-brass transition-colors">
                {site.phone}
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[15px] font-semibold text-ink-2">
              <span className="inline-flex items-center gap-2"><Clock size={17} className="text-brass" /> 12–18 дней, срочно от 5</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-brass" /> Гарантия 1 год</span>
              <span className="inline-flex items-center gap-2"><Briefcase size={17} className="text-brass" /> Выезд с образцами</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-8 max-w-7xl mx-auto w-full">
        <a href="#catalog" className="inline-flex text-ink/50 hover:text-ink transition-colors animate-bounce"><ArrowDown size={22} /></a>
      </div>
    </section>
  );
}
