"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import Logo from "./Logo";

const links = [
  { label: "Каталог", href: "#catalog" },
  { label: "Стекло", href: "#glass" },
  { label: "Как работаем", href: "#process" },
  { label: "Цены", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className={
            "glass glass-edge relative flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 " +
            (scrolled ? "shadow-[0_20px_60px_rgba(0,0,0,0.5)]" : "")
          }
        >
          <a href="#top" className="flex items-center gap-2 pl-2">
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-white/65 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden xl:flex items-center gap-2 text-[14px] font-semibold text-white/80 hover:text-white px-3 py-2 transition-colors"
            >
              <Phone size={15} className="text-brass" />
              {site.phone}
            </a>
            <a
              href="#quote"
              className="hidden sm:inline-flex rounded-full bg-mist text-ink px-5 py-2.5 text-[14px] font-bold hover:bg-white transition-all hover:scale-[1.03] active:scale-95"
            >
              Рассчитать
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10"
              aria-label="Меню"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong glass-edge mt-2 rounded-3xl p-4 flex flex-col gap-1 lg:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-[15px] font-medium text-white/80 hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a href={site.phoneHref} className="px-4 py-3 rounded-2xl text-[15px] font-semibold text-brass">
              {site.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
