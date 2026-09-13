const items = [
  "Закалённое стекло 8 мм",
  "Выезд с образцами",
  "Производство 12–18 дней",
  "Срочно — от 5 дней",
  "Гарантия 1 год",
  "Москва и область",
  "Фурнитура от заводов-изготовителей",
  "Покрытие антиналёт",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-line bg-card overflow-hidden py-4">
      <div className="flex w-max animate-marquee will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 px-8 text-[13px] font-semibold tracking-[0.12em] uppercase text-muted whitespace-nowrap">
            {t}
            <span className="w-px h-3.5 bg-line" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card to-transparent" />
    </div>
  );
}
