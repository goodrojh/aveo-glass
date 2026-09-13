"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { asset } from "@/lib/site";

const pairs = [
  { id: "kitchen", before: "/img/partition-kitchen-empty.webp", after: "/img/partition-kitchen.webp", title: "Кухня-гостиная", text: "Лофт-перегородка с чёрной раскладкой отделяет кухню от гостиной, оставляя весь свет из окон." },
  { id: "shower", before: "/img/shower-corner-empty.webp", after: "/img/shower-corner.webp", title: "Душевой угол", text: "Угловая душевая на распашной двери — брызги остаются внутри, ванная выглядит собранной." },
];

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const p = pairs[idx];

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="bg-card border-y border-line py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-10 items-center">
        <div>
          <p className="eyebrow">До и после</p>
          <h2 className="h2 mt-3">Что меняет одна перегородка</h2>
          <p className="lead mt-4">Потяните ползунок влево и вправо. Слева — помещение как есть, справа — оно же со стеклом.</p>

          <div className="mt-8 space-y-3">
            {pairs.map((x, i) => (
              <button key={x.id} onClick={() => { setIdx(i); setPos(50); }} className={"w-full text-left rounded-2xl px-5 py-4 border-2 transition-colors " + (idx === i ? "border-brass bg-brass-soft" : "border-line hover:border-ink/30")}>
                <span className="block text-[17px] font-bold text-ink">{x.title}</span>
                <span className="block mt-1 text-[15px] text-ink-2">{x.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={ref}
          onPointerDown={(e) => { drag.current = true; update(e.clientX); }}
          onPointerMove={(e) => drag.current && update(e.clientX)}
          onPointerUp={() => (drag.current = false)}
          onPointerLeave={() => (drag.current = false)}
          className="relative w-full aspect-square rounded-[28px] overflow-hidden card select-none cursor-ew-resize touch-none"
        >
          <img key={p.after} src={asset(p.after)} alt="После" className="absolute inset-0 w-full h-full object-contain bg-paper-2" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img key={p.before} src={asset(p.before)} alt="До" className="absolute inset-0 w-full h-full object-contain bg-paper-2" draggable={false} />
          </div>
          <div className="absolute inset-y-0 w-[3px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: pos + "%" }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white text-ink flex items-center justify-center shadow-xl border border-line">
              <MoveHorizontal size={22} />
            </div>
          </div>
          <span className="absolute top-5 left-5 bg-white rounded-full px-4 py-1.5 text-[14px] font-bold text-ink shadow">До</span>
          <span className="absolute top-5 right-5 bg-ink text-white rounded-full px-4 py-1.5 text-[14px] font-bold shadow">После</span>
        </div>
      </div>
    </section>
  );
}
