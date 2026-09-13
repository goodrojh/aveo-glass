"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/site";

/** Видео играет автоматически, пока карточка в зоне видимости. */
export default function VideoCard({ video, poster, tag, className = "" }: { video: string; poster: string; tag?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = ref.current;
        if (!v) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={"relative rounded-[24px] overflow-hidden card aspect-square " + className}>
      <video ref={ref} muted loop playsInline autoPlay preload="metadata" poster={asset(poster)} className="absolute inset-0 w-full h-full object-cover">
        <source src={asset(video)} type="video/mp4" />
      </video>
      {tag && <span className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-[13px] font-bold text-ink">{tag}</span>}
    </div>
  );
}
