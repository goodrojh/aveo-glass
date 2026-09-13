"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { asset } from "@/lib/site";

export default function VideoCard({
  video,
  poster,
  title,
  subtitle,
  tag,
  className = "",
  autoplayInView = false,
}: {
  video: string;
  poster: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  className?: string;
  autoplayInView?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!autoplayInView || !wrap.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = ref.current;
        if (!v) return;
        if (e.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.45 }
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [autoplayInView]);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    if (autoplayInView) return;
    const v = ref.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  return (
    <motion.div
      ref={wrap}
      whileHover={{ y: -6 }}
      onMouseEnter={play}
      onMouseLeave={pause}
      onTouchStart={play}
      className={"group relative rounded-[28px] overflow-hidden border border-white/10 bg-ink-3 aspect-square " + className}
    >
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={asset(poster)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]"
      >
        <source src={asset(video)} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      {tag && (
        <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-white/80">
          {tag}
        </span>
      )}
      <span
        className={"absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white transition-opacity " + (playing ? "opacity-0" : "opacity-100")}
      >
        <Play size={14} className="ml-0.5" />
      </span>
      {(title || subtitle) && (
        <div className="absolute inset-x-0 bottom-0 p-5">
          {title && <h4 className="text-white font-bold text-lg leading-tight">{title}</h4>}
          {subtitle && <p className="text-white/60 text-[13px] mt-1">{subtitle}</p>}
        </div>
      )}
    </motion.div>
  );
}
