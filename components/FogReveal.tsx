"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

/** Запотевшее стекло — протрите курсором или пальцем. */
export default function FogReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cleared, setCleared] = useState(0);
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  const paintFog = () => {
    const c = canvasRef.current, w = wrapRef.current;
    if (!c || !w) return;
    const r = w.getBoundingClientRect();
    c.width = r.width * devicePixelRatio;
    c.height = r.height * devicePixelRatio;
    c.style.width = r.width + "px";
    c.style.height = r.height + "px";
    const ctx = c.getContext("2d")!;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const grad = ctx.createLinearGradient(0, 0, r.width, r.height);
    grad.addColorStop(0, "rgba(228,232,235,0.97)");
    grad.addColorStop(1, "rgba(203,210,216,0.98)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, r.width, r.height);
    for (let i = 0; i < 90; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * r.width, Math.random() * r.height, 1 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.75)";
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
    const c = canvasRef.current, w = wrapRef.current;
    if (!c || !w) return;
    const r = w.getBoundingClientRect();
    const x = clientX - r.left, y = clientY - r.top;
    const ctx = c.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 70;
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    const last = lastRef.current ?? { x, y };
    ctx.moveTo(last.x, last.y); ctx.lineTo(x, y); ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    lastRef.current = { x, y };
    setCleared((v) => Math.min(100, v + 0.6));
  };

  return (
    <section className="bg-paper py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow">Гидрофобное покрытие</p>
          <h2 className="h2 mt-3">Протрите стекло — и узнайте, зачем оно нужно</h2>
          <p className="lead mt-4">Проведите по панели курсором или пальцем.</p>
        </div>

        <div
          ref={wrapRef}
          onPointerMove={(e) => (e.pointerType === "mouse" || e.buttons > 0) && wipe(e.clientX, e.clientY)}
          onPointerDown={(e) => { lastRef.current = null; wipe(e.clientX, e.clientY); }}
          onPointerLeave={() => (lastRef.current = null)}
          onPointerUp={() => (lastRef.current = null)}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[28px] overflow-hidden card touch-none cursor-crosshair"
        >
          <img src={asset("/img/drops.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[28px] md:text-[44px] font-extrabold text-white max-w-3xl leading-tight drop-shadow-lg">
              Вода скатывается, известковый налёт не задерживается
            </p>
            <p className="mt-4 text-[17px] text-white/90 max-w-lg drop-shadow">Невидимый слой на стекле душевой. Протирать придётся заметно реже. Наносим по желанию.</p>
          </div>
          <canvas ref={canvasRef} className="absolute inset-0" />
          {cleared < 3 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="rounded-full bg-white px-5 py-2.5 text-[15px] font-bold text-ink shadow-lg animate-pulse-soft">Проведите по стеклу ✋</span>
            </div>
          )}
          <button onClick={paintFog} className="absolute bottom-4 right-4 glass rounded-full px-4 py-2 text-[14px] font-bold text-ink">Запотеть заново</button>
        </div>
      </div>
    </section>
  );
}
