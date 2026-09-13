"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Droplets, LayoutPanelLeft, Fence, ChevronRight, Sparkles, Check } from "lucide-react";
import { site } from "@/lib/site";

type Product = "shower" | "partition" | "railing";

const products: { id: Product; label: string; icon: React.ReactNode; from: number; perM: number; kinds: { id: string; label: string; k: number }[] }[] = [
  {
    id: "shower",
    label: "Душевая",
    icon: <Droplets size={18} />,
    from: 15000,
    perM: 9000,
    kinds: [
      { id: "static", label: "Статичная шторка", k: 1 },
      { id: "swing", label: "Распашная", k: 1.5 },
      { id: "slide", label: "Раздвижная", k: 1.8 },
      { id: "fold", label: "Гармошка", k: 2.1 },
    ],
  },
  {
    id: "partition",
    label: "Перегородка",
    icon: <LayoutPanelLeft size={18} />,
    from: 22000,
    perM: 14000,
    kinds: [
      { id: "fixed", label: "Глухая", k: 1 },
      { id: "door", label: "С дверью", k: 1.45 },
      { id: "slide", label: "Раздвижная", k: 1.7 },
      { id: "loft", label: "Лофт с раскладкой", k: 1.9 },
    ],
  },
  {
    id: "railing",
    label: "Ограждение",
    icon: <Fence size={18} />,
    from: 18000,
    perM: 16000,
    kinds: [
      { id: "stairs", label: "Лестница", k: 1 },
      { id: "balcony", label: "Балкон / терраса", k: 1.15 },
      { id: "gallery", label: "Второй свет", k: 1.25 },
      { id: "pool", label: "Бассейн", k: 1.35 },
    ],
  },
];

const glasses = [
  { id: "clear", label: "Прозрачное", k: 1, swatch: "linear-gradient(135deg,#dfe7ea,#b9c7cc)" },
  { id: "ultra", label: "Осветлённое", k: 1.12, swatch: "linear-gradient(135deg,#f3f6f7,#d5dfe2)" },
  { id: "grey", label: "Серое", k: 1.18, swatch: "linear-gradient(135deg,#8b9094,#4d5257)" },
  { id: "bronze", label: "Бронза", k: 1.18, swatch: "linear-gradient(135deg,#b58a5a,#6e4e2b)" },
  { id: "matte", label: "Матовое", k: 1.22, swatch: "linear-gradient(135deg,#e8e8e8,#bdbdbd)" },
  { id: "reeded", label: "Рифлёное", k: 1.35, swatch: "repeating-linear-gradient(90deg,#e6ebee 0 4px,#c2cbd0 4px 8px)" },
];

const hardware = [
  { id: "black", label: "Чёрный мат", k: 1, color: "#1b1b1d" },
  { id: "chrome", label: "Хром", k: 0.95, color: "#c9ccd1" },
  { id: "gold", label: "Золото", k: 1.2, color: "#d4a94a" },
  { id: "brass", label: "Латунь", k: 1.2, color: "#b8925a" },
  { id: "graphite", label: "Графит", k: 1.08, color: "#4a4d52" },
  { id: "bronze", label: "Бронза", k: 1.15, color: "#7a5a3a" },
];

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const text = useTransform(spring, (v) => Math.round(v).toLocaleString("ru-RU"));
  const [out, setOut] = useState("0");
  useEffect(() => {
    mv.set(value);
    const unsub = text.on("change", (v) => setOut(v));
    return () => unsub();
  }, [value, mv, text]);
  return <span>{out}</span>;
}

export default function Configurator() {
  const [product, setProduct] = useState<Product>("shower");
  const [kind, setKind] = useState(products[0].kinds[0].id);
  const [glass, setGlass] = useState("clear");
  const [hw, setHw] = useState("black");
  const [width, setWidth] = useState(1.2);
  const [sent, setSent] = useState(false);

  const p = products.find((x) => x.id === product)!;
  useEffect(() => setKind(p.kinds[0].id), [product, p.kinds]);

  const estimate = useMemo(() => {
    const k = p.kinds.find((x) => x.id === kind)?.k ?? 1;
    const g = glasses.find((x) => x.id === glass)?.k ?? 1;
    const h = hardware.find((x) => x.id === hw)?.k ?? 1;
    const raw = (p.from + Math.max(0, width - 1) * p.perM) * k * g * h;
    return Math.round(raw / 500) * 500;
  }, [p, kind, glass, hw, width]);

  const summary = `${p.label} · ${p.kinds.find((x) => x.id === kind)?.label} · ${glasses.find((x) => x.id === glass)?.label} · фурнитура ${hardware.find((x) => x.id === hw)?.label} · ширина ${width.toFixed(1)} м · ориентир от ${estimate.toLocaleString("ru-RU")} ₽`;
  const tgHref = `${site.telegram}?text=${encodeURIComponent("Здравствуйте! Хочу расчёт: " + summary)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass-strong glass-edge noise relative w-full max-w-6xl mx-auto rounded-[32px] md:rounded-[40px] overflow-hidden text-left shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
    >
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        {/* Left: steps */}
        <div className="p-6 md:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-brass">Онлайн-конфигуратор</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Соберите свою конструкцию</h3>
            </div>
            <span className="hidden md:inline-flex items-center gap-2 text-[12px] text-white/50"><Sparkles size={14} className="text-brass" /> 4 шага · 30 секунд</span>
          </div>

          {/* Step 1 */}
          <div>
            <p className="text-[12px] font-semibold text-white/50 mb-3">01 — Что делаем</p>
            <div className="grid grid-cols-3 gap-2">
              {products.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setProduct(x.id)}
                  className={"flex items-center justify-center gap-2 rounded-2xl px-3 py-3.5 text-[14px] font-semibold transition-all border " + (product === x.id ? "bg-mist text-ink border-mist" : "border-white/10 text-white/70 hover:bg-white/5 hover:text-white")}
                >
                  {x.icon}
                  <span className="hidden sm:inline">{x.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <p className="text-[12px] font-semibold text-white/50 mb-3">02 — Тип конструкции</p>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {p.kinds.map((x) => (
                  <motion.button
                    layout
                    key={p.id + x.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setKind(x.id)}
                    className={"rounded-full px-4 py-2 text-[13px] font-semibold border transition-all " + (kind === x.id ? "bg-brass text-ink border-brass" : "border-white/10 text-white/70 hover:bg-white/5")}
                  >
                    {x.label}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-[12px] font-semibold text-white/50 mb-3">03 — Стекло</p>
              <div className="grid grid-cols-3 gap-2">
                {glasses.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGlass(g.id)}
                    className={"group flex flex-col items-start gap-2 rounded-2xl p-2.5 border transition-all " + (glass === g.id ? "border-brass bg-white/5" : "border-white/10 hover:bg-white/5")}
                  >
                    <span className="w-full h-8 rounded-lg border border-white/20" style={{ background: g.swatch }} />
                    <span className="text-[12px] font-medium text-white/80">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white/50 mb-3">04 — Фурнитура</p>
              <div className="grid grid-cols-3 gap-2">
                {hardware.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHw(h.id)}
                    className={"flex items-center gap-2 rounded-2xl p-2.5 border transition-all " + (hw === h.id ? "border-brass bg-white/5" : "border-white/10 hover:bg-white/5")}
                  >
                    <span className="w-6 h-6 rounded-full border border-white/30 shadow-inner shrink-0" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), ${h.color} 55%)` }} />
                    <span className="text-[12px] font-medium text-white/80 leading-tight">{h.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-[12px] text-white/50 mb-2">
                  <span>Ширина проёма</span>
                  <span className="text-white font-semibold">{width.toFixed(1)} м</span>
                </div>
                <input
                  type="range"
                  min={0.6}
                  max={6}
                  step={0.1}
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full accent-[#d9a45b]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: result */}
        <div className="p-6 md:p-10 flex flex-col justify-between bg-gradient-to-b from-white/[0.03] to-transparent">
          <div>
            <p className="text-[12px] font-semibold text-white/50">Ориентировочная стоимость</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-[13px] text-white/50 mb-3">от</span>
              <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                <AnimatedNumber value={estimate} />
              </span>
              <span className="text-2xl font-bold text-brass mb-1">₽</span>
            </div>
            <p className="mt-3 text-[13px] text-white/50 leading-relaxed">
              Под ключ: стекло, фурнитура, доставка и монтаж. Точную цену назовём после
              замера — обычно в тот же день, в трёх вариантах комплектации.
            </p>

            <ul className="mt-6 space-y-2 text-[13px] text-white/75">
              {[
                "Закалённое стекло 8–10 мм",
                "Фурнитура напрямую от производителей",
                "Гарантия на стекло, фурнитуру и монтаж",
                "Производство 12–18 дней, срочно от 5",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><Check size={15} className="text-brass mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-3">
            <a
              href={tgHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setSent(true)}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brass text-ink px-6 py-4 text-[15px] font-bold hover:bg-brass-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              {sent ? "Открыли Telegram — ждём!" : "Получить точный расчёт"}
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={site.phoneHref} className="block text-center text-[13px] text-white/60 hover:text-white">
              или позвоните: <span className="font-semibold text-white">{site.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
