"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { asset } from "@/lib/site";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="bg-card border-y border-line py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow">До и после</p>
          <h2 className="h2 mt-3">Один угол — до и после стекла</h2>
          <p className="lead mt-4">Потяните ползунок. Одна перегородка превращает открытый угол в полноценную душевую, не отнимая ни сантиметра.</p>
        </div>

        <div
          ref={ref}
          onPointerDown={(e) => { drag.current = true; update(e.clientX); }}
          onPointerMove={(e) => drag.current && update(e.clientX)}
          onPointerUp={() => (drag.current = false)}
          onPointerLeave={() => (drag.current = false)}
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/2] max-h-[720px] mx-auto rounded-[28px] overflow-hidden card select-none cursor-ew-resize touch-none"
        >
          <img src={asset("/img/shower-corner.webp")} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={asset("/img/shower-corner-empty.webp")} alt="До" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          </div>
          <div className="absolute inset-y-0 w-[2px] bg-white" style={{ left: pos + "%" }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-xl">
              <MoveHorizontal size={20} />
            </div>
          </div>
          <span className="absolute top-5 left-5 glass rounded-full px-4 py-1.5 text-[14px] font-bold text-ink">Без стекла</span>
          <span className="absolute top-5 right-5 bg-ink text-white rounded-full px-4 py-1.5 text-[14px] font-bold">Со стеклом</span>
        </div>
      </div>
    </section>
  );
}
