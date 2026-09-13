"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { site, asset } from "@/lib/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Здравствуйте! Меня зовут ${name || "—"}, телефон ${phone || "—"}. ${msg || "Хочу консультацию по стеклу."}`;
    window.open(`${site.telegram}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="relative bg-ink py-24 md:py-32 px-6 scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={asset("/img/railing-balcony.webp")} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 items-stretch">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-brass">Контакты</p>
          <h2 className="mt-3 text-[40px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
            Давайте
            <br />
            <span className="text-white/40">посчитаем ваше стекло.</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-md leading-relaxed">
            Напишите в мессенджер или позвоните. Заявки принимаем круглосуточно, отвечаем в рабочее время — обычно за несколько минут.
          </p>

          <div className="mt-8 space-y-4">
            <a href={site.phoneHref} className="flex items-center gap-4 group">
              <span className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brass"><Phone size={18} /></span>
              <div>
                <p className="text-[12px] text-white/50">Телефон</p>
                <p className="text-white text-lg font-bold group-hover:text-brass transition-colors">{site.phone}</p>
              </div>
            </a>
            <a href={"mailto:" + site.email} className="flex items-center gap-4 group">
              <span className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brass"><Mail size={18} /></span>
              <div>
                <p className="text-[12px] text-white/50">Email</p>
                <p className="text-white font-semibold group-hover:text-brass transition-colors">{site.email}</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brass"><MapPin size={18} /></span>
              <div>
                <p className="text-[12px] text-white/50">Офис</p>
                <p className="text-white font-semibold">{site.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brass"><Clock size={18} /></span>
              <div>
                <p className="text-[12px] text-white/50">Режим</p>
                <p className="text-white font-semibold">{site.hours}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.telegram} target="_blank" rel="noreferrer" className="rounded-full bg-[#2AABEE] text-white px-5 py-2.5 text-[14px] font-bold hover:brightness-110 transition">Telegram</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] text-ink px-5 py-2.5 text-[14px] font-bold hover:brightness-110 transition">WhatsApp</a>
            <a href={site.vk} target="_blank" rel="noreferrer" className="rounded-full bg-[#0077FF] text-white px-5 py-2.5 text-[14px] font-bold hover:brightness-110 transition">ВКонтакте</a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-strong glass-edge rounded-[32px] p-7 md:p-10 flex flex-col gap-4"
        >
          <h3 className="text-2xl font-extrabold text-white">Заявка на замер</h3>
          <p className="text-[13px] text-white/55 -mt-2">Перезвоним и договоримся о времени. Приедем с образцами.</p>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className="w-full glass rounded-2xl px-5 py-4 text-white placeholder-white/40 outline-none focus:border-brass/60 transition-colors" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" inputMode="tel" className="w-full glass rounded-2xl px-5 py-4 text-white placeholder-white/40 outline-none focus:border-brass/60 transition-colors" />
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Что нужно: душевая, перегородка, ограждение… размеры, если знаете" rows={4} className="w-full glass rounded-2xl px-5 py-4 text-white placeholder-white/40 outline-none focus:border-brass/60 transition-colors resize-none" />
          <button type="submit" className="group mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-brass text-ink px-7 py-4 text-[15px] font-bold hover:bg-brass-2 transition-all hover:scale-[1.02] active:scale-95">
            Отправить в Telegram
            <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
          <p className="text-[11px] text-white/40 text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
        </motion.form>
      </div>
    </section>
  );
}
