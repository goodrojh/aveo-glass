"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function StickyCall() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 700);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-5 right-5 z-50 flex flex-col gap-2"
        >
          <a href={site.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="w-14 h-14 rounded-full bg-[#2AABEE] text-white flex items-center justify-center shadow-[0_10px_40px_rgba(42,171,238,0.5)] hover:scale-105 transition">
            <MessageCircle size={22} />
          </a>
          <a href={site.phoneHref} aria-label="Позвонить" className="w-14 h-14 rounded-full bg-brass text-ink flex items-center justify-center shadow-[0_10px_40px_rgba(217,164,91,0.45)] hover:scale-105 transition">
            <Phone size={22} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
