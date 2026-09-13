export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + className}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="30" y2="30">
            <stop offset="0" stopColor="#f0c37c" />
            <stop offset="1" stopColor="#b98338" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="26" height="26" rx="6" stroke="url(#lg)" strokeWidth="1.6" />
        <path d="M8 22 L15 7 L22 22" stroke="#e9e6df" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 17 H19" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 5 L12 5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="font-extrabold tracking-[0.18em] text-[15px] text-white leading-none">
        AVEO<span className="text-brass">·</span>GLASS
      </span>
    </span>
  );
}
