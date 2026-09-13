const items = [
  "Закалённое стекло 8–10 мм",
  "Замер с образцами",
  "Производство 12–18 дней",
  "Срочно — от 5 дней",
  "Гарантия на стекло, фурнитуру и монтаж",
  "Москва и МО",
  "Заявки 24/7",
  "Фурнитура от производителей",
  "3 варианта расчёта",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-white/10 bg-ink-2 overflow-hidden py-4">
      <div className="flex w-max animate-marquee will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-[13px] font-semibold tracking-[0.12em] uppercase text-white/55 whitespace-nowrap">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-2 to-transparent" />
    </div>
  );
}
