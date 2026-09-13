"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, LayoutPanelLeft, Fence, ArrowRight, Check } from "lucide-react";
import { site, glassTypes, hardwareColors } from "@/lib/site";

type Product = "shower" | "partition" | "railing";

const products: { id: Product; label: string; icon: React.ReactNode; from: number; perM: number; kinds: { id: string; label: string; k: number }[] }[] = [
  { id: "shower", label: "Душевая", icon: <Droplets size={20} />, from: 15000, perM: 9000, kinds: [
    { id: "static", label: "Статичная", k: 1 }, { id: "swing", label: "Распашная", k: 1.5 }, { id: "slide", label: "Раздвижная", k: 1.8 }, { id: "fold", label: "Гармошка", k: 2.1 } ] },
  { id: "partition", label: "Перегородка", icon: <LayoutPanelLeft size={20} />, from: 22000, perM: 14000, kinds: [
    { id: "fixed", label: "Глухая", k: 1 }, { id: "door", label: "С дверью", k: 1.45 }, { id: "slide", label: "Раздвижная", k: 1.7 }, { id: "loft", label: "Лофт с раскладкой", k: 1.9 } ] },
  { id: "railing", label: "Ограждение", icon: <Fence size={20} />, from: 18000, perM: 16000, kinds: [
    { id: "stairs", label: "Лестница", k: 1 }, { id: "balcony", label: "Балкон / терраса", k: 1.15 }, { id: "gallery", label: "Второй свет", k: 1.25 } ] },
];

const glassK: Record<string, number> = { clear: 1, ultra: 1.12, grey: 1.18, bronze: 1.18, matte: 1.22, reeded: 1.35 };
const hwK: Record<string, number> = { chrome: 0.95, "chrome-matte": 1, black: 1, gold: 1.2, brass: 1.2, graphite: 1.08, bronze: 1.15 };

export default function Configurator() {
  const [product, setProduct] = useState<Product>("shower");
  const [kind, setKind] = useState("static");
  const [glass, setGlass] = useState("clear");
  const [hw, setHw] = useState("black");
  const [width, setWidth] = useState(1.2);

  const p = products.find((x) => x.id === product)!;
  useEffect(() => setKind(p.kinds[0].id), [product, p.kinds]);

  const estimate = useMemo(() => {
    const k = p.kinds.find((x) => x.id === kind)?.k ?? 1;
    const raw = (p.from + Math.max(0, width - 1) * p.perM) * k * (glassK[glass] ?? 1) * (hwK[hw] ?? 1);
    return Math.round(raw / 500) * 500;
  }, [p, kind, glass, hw, width]);

  const gl = glassTypes.find((x) => x.id === glass)!;
  const hc = hardwareColors.find((x) => x.id === hw)!;
  const summary = `${p.label} · ${p.kinds.find((x) => x.id === kind)?.label} · стекло ${gl.label.toLowerCase()} · фурнитура ${hc.label.toLowerCase()} · ширина ${width.toFixed(1)} м · ориентир от ${estimate.toLocaleString("ru-RU")} ₽`;
  const tgHref = `${site.telegram}?text=${encodeURIComponent("Здравствуйте! Хочу расчёт: " + summary)}`;

  const Step = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
    <div>
      <p className="text-[14px] font-bold text-muted mb-3"><span className="text-brass">{n}</span> — {title}</p>
      {children}
    </div>
  );

  return (
    <section id="quote" className="bg-paper py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <h2 className="h2">Соберите конструкцию — получите ориентир за минуту</h2>
          <p className="lead mt-4">Ответьте на несколько вопросов, и мы отправим точный расчёт стоимости в трёх вариантах.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card rounded-[28px] overflow-hidden grid lg:grid-cols-[1.35fr_1fr]">
          <div className="p-6 md:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-line">
            <Step n="01" title="Что делаем">
              <div className="grid grid-cols-3 gap-2">
                {products.map((x) => (
                  <button key={x.id} onClick={() => setProduct(x.id)} className={"flex items-center justify-center gap-2 rounded-2xl px-3 py-4 text-[16px] font-bold border-2 transition-colors " + (product === x.id ? "bg-ink text-white border-ink" : "border-line text-ink hover:border-ink/40")}>
                    {x.icon}<span className="hidden sm:inline">{x.label}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step n="02" title="Тип конструкции">
              <div className="flex flex-wrap gap-2">
                {p.kinds.map((x) => (
                  <button key={x.id} onClick={() => setKind(x.id)} className={"rounded-full px-5 py-2.5 text-[15px] font-bold border-2 transition-colors " + (kind === x.id ? "bg-brass text-white border-brass" : "border-line text-ink hover:border-ink/40")}>
                    {x.label}
                  </button>
                ))}
              </div>
            </Step>

            <div className="grid md:grid-cols-2 gap-8">
              <Step n="03" title="Стекло">
                <div className="grid grid-cols-2 gap-2">
                  {glassTypes.map((g) => (
                    <button key={g.id} onClick={() => setGlass(g.id)} className={"text-left rounded-xl px-3.5 py-3 text-[15px] font-semibold border-2 transition-colors " + (glass === g.id ? "border-brass bg-brass-soft text-ink" : "border-line text-ink-2 hover:border-ink/40")}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </Step>
              <Step n="04" title="Фурнитура">
                <div className="grid grid-cols-2 gap-2">
                  {hardwareColors.map((h) => (
                    <button key={h.id} onClick={() => setHw(h.id)} className={"flex items-center gap-2.5 rounded-xl px-3 py-2.5 border-2 transition-colors " + (hw === h.id ? "border-brass bg-brass-soft" : "border-line hover:border-ink/40")}>
                      <span className="w-6 h-6 rounded-full border border-ink/15 shrink-0" style={{ background: `radial-gradient(circle at 30% 30%, ${h.hi}, ${h.color} 60%)` }} />
                      <span className="text-[14px] font-semibold text-ink leading-tight">{h.short}</span>
                    </button>
                  ))}
                </div>
              </Step>
            </div>

            <Step n="05" title="Ширина проёма">
              <div className="flex items-center gap-4">
                <input type="range" min={0.6} max={6} step={0.1} value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} className="w-full" />
                <span className="text-[18px] font-extrabold text-ink w-16 text-right">{width.toFixed(1)} м</span>
              </div>
            </Step>
          </div>

          <div className="p-6 md:p-10 flex flex-col justify-between bg-paper-2">
            <div>
              <p className="text-[14px] font-bold text-muted">Ориентировочно, под ключ</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-[16px] text-muted mb-3">от</span>
                <span className="text-[52px] md:text-[60px] font-extrabold tracking-tight text-ink leading-none">{estimate.toLocaleString("ru-RU")}</span>
                <span className="text-[26px] font-bold text-brass mb-1">₽</span>
              </div>
              <p className="mt-4 text-[15px] text-ink-2 leading-relaxed">
                Стекло, фурнитура, доставка и монтаж. Точную цену назовём после замера — в трёх вариантах комплектации.
              </p>
              <ul className="mt-6 space-y-2.5 text-[15px] text-ink">
                {["Закалённое стекло 8 мм", "Сертифицированная фурнитура от заводов", "Гарантия 1 год", "Производство 12–18 дней, срочно от 5"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5"><Check size={17} className="text-brass mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 space-y-3">
              <a href={tgHref} target="_blank" rel="noreferrer" className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-4 text-[16px] font-bold hover:bg-brass transition-colors">
                Отправить на точный расчёт
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={site.phoneHref} className="block text-center text-[15px] text-ink-2">
                или позвоните: <span className="font-bold text-ink">{site.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
