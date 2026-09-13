"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import Logo from "./Logo";

const links = [
  { label: "Каталог", href: "#catalog" },
  { label: "Стекло", href: "#glass" },
  { label: "Фурнитура", href: "#hardware" },
  { label: "Как работаем", href: "#process" },
  { label: "Цены", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
        <div className={"glass relative flex items-center justify-between rounded-full px-3 py-2 transition-shadow duration-500 " + (scrolled ? "shadow-[0_16px_50px_-12px_rgba(21,22,26,0.25)]" : "")}>
          <a href="#top" className="flex items-center pl-2">
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[15px] font-semibold text-ink-2 hover:text-ink transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-brass transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="hidden xl:flex items-center gap-2 text-[15px] font-bold text-ink px-3 py-2">
              <Phone size={16} className="text-brass" />
              {site.phone}
            </a>
            <a href="#quote" className="hidden sm:inline-flex rounded-full bg-ink text-white px-5 py-2.5 text-[15px] font-bold hover:bg-brass transition-colors">
              Рассчитать
            </a>
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-ink/5" aria-label="Меню">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="glass mt-2 rounded-3xl p-3 flex flex-col lg:hidden shadow-xl">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 rounded-2xl text-[16px] font-semibold text-ink hover:bg-ink/5">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="px-4 py-3 rounded-2xl text-[16px] font-semibold text-ink hover:bg-ink/5">Контакты</a>
            <a href={site.phoneHref} className="px-4 py-3 rounded-2xl text-[16px] font-bold text-brass">{site.phone}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
