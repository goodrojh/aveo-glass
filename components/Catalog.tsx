"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import VideoCard from "./VideoCard";

const categories = [
  {
    id: "showers",
    tag: "01",
    title: "Душевые перегородки",
    text: "Статичные шторки, распашные, раздвижные и гармошка. Стекло 8–10 мм, поддон или пол в уровень, чёрная, хром, золото или латунь фурнитура.",
    from: "от 15 000 ₽",
    video: "/video/shower-dryfloor.mp4",
    poster: "/img/shower-dryfloor.webp",
    more: [
      { video: "/video/shower-reeded.mp4", poster: "/img/shower-reeded.webp" },
      { video: "/video/shower-assemble.mp4", poster: "/img/shower-corner-empty.webp" },
    ],
  },
  {
    id: "partitions",
    tag: "02",
    title: "Стеклянные перегородки",
    text: "Межкомнатные, офисные, лофт с чёрной раскладкой, гардеробные и кабинеты. Глухие, с дверью, раздвижные. Прозрачные, рифлёные, тонированные.",
    from: "от 22 000 ₽",
    video: "/video/partition-office.mp4",
    poster: "/img/partition-office.webp",
    more: [
      { video: "/video/partition-wardrobe.mp4", poster: "/img/partition-wardrobe.webp" },
      { video: "/video/partition-assemble.mp4", poster: "/img/partition-kitchen.webp" },
    ],
  },
  {
    id: "railings",
    tag: "03",
    title: "Стеклянные ограждения",
    text: "Лестницы, балконы, террасы, второй свет, бассейны. Безрамные на точечных креплениях или в профиле, с поручнем и без.",
    from: "от 18 000 ₽",
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
    <section id="catalog" className="relative bg-ink py-24 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white"
          >
            Три направления.
            <br />
            <span className="text-white/40">Одно стекло.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg leading-relaxed max-w-md md:justify-self-end"
          >
            Наведите на карточку — каждая конструкция показана в движении.
            Так вы увидите, как стекло живёт в интерьере, а не на схеме.
          </motion.p>
        </div>

        <div className="space-y-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={"grid lg:grid-cols-[1.1fr_1fr] gap-6 items-stretch " + (i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "")}
            >
              <VideoCard video={c.video} poster={c.poster} tag={c.tag} className="lg:aspect-auto lg:min-h-[520px]" autoplayInView />

              <div className="flex flex-col gap-6">
                <div className="glass glass-edge rounded-[28px] p-7 md:p-9 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold tracking-[0.22em] text-brass uppercase">{c.tag} — направление</span>
                      <span className="glass rounded-full px-3 py-1 text-[13px] font-bold text-white">{c.from}</span>
                    </div>
                    <h3 className="mt-4 text-3xl md:text-4xl font-extrabold text-white tracking-tight">{c.title}</h3>
                    <p className="mt-4 text-white/65 leading-relaxed">{c.text}</p>
                  </div>
                  <a href="#quote" className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-white group">
                    Рассчитать {c.title.toLowerCase().split(" ")[1] ?? ""}
                    <span className="w-9 h-9 rounded-full bg-mist text-ink flex items-center justify-center transition-transform group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {c.more.map((m) => (
                    <VideoCard key={m.video} video={m.video} poster={m.poster} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {["Остекление саун и хаммамов", "Стеклянные двери", "Зеркала и зеркальные панно", "Стеклянные козырьки", "Столешницы и полки"].map((t) => (
            <span key={t} className="rounded-full border border-white/10 px-4 py-2 text-[13px] text-white/60 hover:text-white hover:border-white/30 transition-colors">
              + {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
