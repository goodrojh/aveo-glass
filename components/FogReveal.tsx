"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

/** Запотевшее стекло: протрите его курсором или пальцем. */
export default function FogReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cleared, setCleared] = useState(0);
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  const paintFog = () => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const r = w.getBoundingClientRect();
    c.width = r.width * devicePixelRatio;
    c.height = r.height * devicePixelRatio;
    c.style.width = r.width + "px";
    c.style.height = r.height + "px";
    const ctx = c.getContext("2d")!;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const grad = ctx.createLinearGradient(0, 0, r.width, r.height);
    grad.addColorStop(0, "rgba(226,231,234,0.96)");
    grad.addColorStop(1, "rgba(196,204,210,0.98)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, r.width, r.height);
    // условные капли
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * r.width;
      const y = Math.random() * r.height;
      const rad = 1 + Math.random() * 3;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fill();
    }
    setCleared(0);
  };

  useEffect(() => {
    paintFog();
    const ro = new ResizeObserver(() => paintFog());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wipe = (clientX: number, clientY: number) => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const r = w.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    const ctx = c.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 70;
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    const last = lastRef.current ?? { x, y };
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    lastRef.current = { x, y };
    setCleared((v) => Math.min(100, v + 0.6));
  };

  return (
    <section className="relative bg-ink-2 py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-brass">Протрите стекло</p>
          <h2 className="mt-3 text-[36px] md:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
            Наше стекло не запотевает так долго.
            <br />
            <span className="text-white/40">Но это — попробуйте протереть.</span>
          </h2>
        </div>

        <div
          ref={wrapRef}
          onPointerMove={(e) => e.buttons !== undefined && (e.pointerType === "mouse" || e.buttons > 0) && wipe(e.clientX, e.clientY)}
          onPointerDown={(e) => { lastRef.current = null; wipe(e.clientX, e.clientY); }}
          onPointerLeave={() => (lastRef.current = null)}
          onPointerUp={() => (lastRef.current = null)}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/10 touch-none cursor-crosshair shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <img src={asset("/img/drops.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[12px] font-bold tracking-[0.3em] uppercase text-white/70">Гидрофобное покрытие</p>
            <p className="mt-3 text-3xl md:text-5xl font-extrabold text-white text-glow max-w-3xl leading-tight">
              Вода скатывается, известь не липнет, стекло остаётся чистым
            </p>
            <p className="mt-4 text-white/70 max-w-lg">Наносим по желанию на любую душевую. Протирать придётся заметно реже.</p>
          </div>
          <canvas ref={canvasRef} className="absolute inset-0" />
          {cleared < 3 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="glass rounded-full px-5 py-2.5 text-[13px] font-semibold text-ink bg-white/70 animate-pulse-soft">
                Проведите по стеклу ✋
              </span>
            </div>
          )}
          <button
            onClick={paintFog}
            className="absolute bottom-4 right-4 glass rounded-full px-4 py-2 text-[12px] font-semibold text-white/80 hover:text-white"
          >
            Запотеть заново
          </button>
        </div>
      </div>
    </section>
  );
}
