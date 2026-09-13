"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { asset } from "@/lib/site";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  };

  return (
    <section className="relative bg-ink py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[40px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
            Один угол.
            <br />
            <span className="text-white/40">Две жизни.</span>
          </motion.h2>
          <p className="text-white/60 text-lg max-w-md md:justify-self-end">
            Потяните ползунок. Слева — как было. Справа — что делает одна стеклянная перегородка с тем же самым помещением.
          </p>
        </div>

        <div
          ref={ref}
          onPointerDown={(e) => { drag.current = true; update(e.clientX); }}
          onPointerMove={(e) => drag.current && update(e.clientX)}
          onPointerUp={() => (drag.current = false)}
          onPointerLeave={() => (drag.current = false)}
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/2] max-h-[720px] mx-auto rounded-[32px] overflow-hidden border border-white/10 select-none cursor-ew-resize touch-none shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <img src={asset("/img/shower-corner.webp")} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={asset("/img/shower-corner-empty.webp")} alt="До" className="absolute inset-0 w-full h-full object-cover grayscale-[35%] brightness-90" draggable={false} />
          </div>

          <div className="absolute inset-y-0 w-px bg-white/80" style={{ left: pos + "%" }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white shadow-2xl">
              <MoveHorizontal size={18} />
            </div>
          </div>

          <span className="absolute top-5 left-5 glass rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase text-white/80">Без стекла</span>
          <span className="absolute top-5 right-5 bg-brass text-ink rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase">Со стеклом</span>
        </div>
      </div>
    </section>
  );
}
