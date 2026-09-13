"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function StickyCall() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
          <a href={site.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="w-14 h-14 rounded-full bg-[#2AABEE] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(42,171,238,0.4)] hover:scale-105 transition">
            <MessageCircle size={24} />
          </a>
          <a href={site.phoneHref} aria-label="Позвонить" className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center shadow-[0_10px_30px_rgba(21,22,26,0.35)] hover:scale-105 transition">
            <Phone size={24} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
