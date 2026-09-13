const items = [
  "Закалённое стекло 8 мм",
  "Выезд с образцами",
  "Производство 12–18 дней",
  "Срочно — от 5 дней",
  "Гарантия 1 год",
  "Москва и область",
  "Заявки 24/7",
  "Фурнитура от заводов-изготовителей",
  "3 варианта расчёта",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-line bg-card overflow-hidden py-4">
      <div className="flex w-max animate-marquee will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-[14px] font-bold tracking-[0.1em] uppercase text-ink-2 whitespace-nowrap">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card to-transparent" />
    </div>
  );
}
