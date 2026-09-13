export default function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + className}>
      <svg width="32" height="32" viewBox="0 0 30 30" fill="none" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="30" y2="30">
            <stop offset="0" stopColor="#7fb6e8" />
            <stop offset="1" stopColor="#1f4f84" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="26" height="26" rx="6" stroke="url(#lg)" strokeWidth="1.8" />
        <path d="M8 22 L15 7 L22 22" stroke={light ? "#fff" : "#0f1722"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 17 H19" stroke="url(#lg)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className={"font-extrabold tracking-[0.16em] text-[16px] leading-none " + (light ? "text-white" : "text-ink")}>
        AVEO<span className="text-brass">·</span>GLASS
      </span>
    </span>
  );
}
