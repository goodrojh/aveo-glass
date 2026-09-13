"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { asset } from "@/lib/site";

export default function VideoCard({
  video,
  poster,
  tag,
  className = "",
  autoplayInView = false,
}: {
  video: string;
  poster: string;
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
        if (e.isIntersecting) v.play().then(() => setPlaying(true)).catch(() => {});
        else { v.pause(); setPlaying(false); }
      },
      { threshold: 0.4 }
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [autoplayInView]);

  const play = () => ref.current?.play().then(() => setPlaying(true)).catch(() => {});
  const pause = () => { if (autoplayInView) return; ref.current?.pause(); setPlaying(false); };

  return (
    <div ref={wrap} onMouseEnter={play} onMouseLeave={pause} onTouchStart={play} className={"group relative rounded-[24px] overflow-hidden card aspect-square " + className}>
      <video ref={ref} muted loop playsInline preload="metadata" poster={asset(poster)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]">
        <source src={asset(video)} type="video/mp4" />
      </video>
      {tag && <span className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-[13px] font-bold text-ink">{tag}</span>}
      <span className={"absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-ink transition-opacity " + (playing ? "opacity-0" : "opacity-100")}>
        <Play size={15} className="ml-0.5" />
      </span>
    </div>
  );
}
