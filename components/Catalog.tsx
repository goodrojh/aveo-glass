"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import VideoCard from "./VideoCard";

const categories = [
  {
    id: "showers",
    n: "01",
    title: "Душевые конструкции",
    text: "Четыре типа: статичные (неподвижное стекло от брызг), распашные с 1–2 дверями, раздвижные и «гармошка» со складывающимися дверями. Закалённое стекло 8 мм, любой цвет фурнитуры.",
    from: "от 15 000 ₽",
    kinds: ["Статичные", "Распашные", "Раздвижные", "Гармошка"],
    video: "/video/shower-dryfloor.mp4",
    poster: "/img/shower-dryfloor.webp",
    more: [
      { video: "/video/shower-reeded.mp4", poster: "/img/shower-reeded.webp" },
      { video: "/video/shower-assemble.mp4", poster: "/img/shower-corner-empty.webp" },
    ],
  },
  {
    id: "partitions",
    n: "02",
    title: "Перегородки из стекла",
    text: "Межкомнатные и офисные. Глухие, с распашной или раздвижной дверью, лофт с чёрной раскладкой. Зонируют без потери света — гардеробные, кабинеты, кухни-гостиные.",
    from: "по расчёту",
    kinds: ["Межкомнатные", "Офисные", "Лофт", "Раздвижные"],
    video: "/video/partition-office.mp4",
    poster: "/img/partition-office.webp",
    more: [
      { video: "/video/partition-wardrobe.mp4", poster: "/img/partition-wardrobe.webp" },
      { video: "/video/partition-assemble.mp4", poster: "/img/partition-kitchen.webp" },
    ],
  },
  {
    id: "railings",
    n: "03",
    title: "Стеклянные ограждения",
    text: "Лестницы, балконы, террасы, второй свет. Цельностеклянные на точечных креплениях или в профиле, с поручнем и без. Безопасное закалённое стекло.",
    from: "по расчёту",
    kinds: ["Лестницы", "Балконы", "Террасы", "Второй свет"],
    video: "/video/railing-pool.mp4",
    poster: "/img/railing-pool.webp",
    more: [
      { video: "/video/railing-stairs.mp4", poster: "/img/railing-stairs.webp" },
      { video: "/video/railing-balcony.mp4", poster: "/img/railing-balcony.webp" },
    ],
  },
];

export default function Catalog() {
  return (
    <section id="catalog" className="bg-paper py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow">Каталог</p>
          <h2 className="h2 mt-3">Что делаем</h2>
          <p className="lead mt-4">
            Три основных направления и всё, что рядом: двери, остекление саун и хаммамов, зеркала.
            Наведите на видео — каждая конструкция показана в движении.
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className={"grid lg:grid-cols-[1.1fr_1fr] gap-6 " + (i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "")}
            >
              <VideoCard video={c.video} poster={c.poster} tag={c.n} className="lg:aspect-auto lg:min-h-[540px]" autoplayInView />

              <div className="flex flex-col gap-6">
                <div className="card rounded-[24px] p-7 md:p-9 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow">{c.n} — направление</span>
                    <span className="rounded-full bg-brass-soft text-brass px-3.5 py-1.5 text-[14px] font-bold">{c.from}</span>
                  </div>
                  <h3 className="mt-4 text-[30px] md:text-[36px] font-extrabold tracking-tight text-ink leading-tight">{c.title}</h3>
                  <p className="mt-4 text-[17px] text-ink-2 leading-relaxed">{c.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.kinds.map((k) => (
                      <span key={k} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] font-semibold text-ink-2">{k}</span>
                    ))}
                  </div>
                  <a href="#quote" className="mt-auto pt-8 inline-flex items-center gap-3 text-[16px] font-bold text-ink group">
                    Получить расчёт
                    <span className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center transition-all group-hover:bg-brass group-hover:rotate-45">
                      <ArrowUpRight size={17} />
                    </span>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {c.more.map((m) => <VideoCard key={m.video} video={m.video} poster={m.poster} />)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 card rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <p className="text-[17px] font-bold text-ink shrink-0">Также делаем:</p>
          <div className="flex flex-wrap gap-2">
            {["Стеклянные двери", "Остекление саун, бань и хаммамов", "Зеркала и зеркальные панно", "Козырьки", "Полки и столешницы", "Изделия по эскизу"].map((t) => (
              <span key={t} className="rounded-full bg-paper border border-line px-4 py-2 text-[15px] font-medium text-ink-2">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
