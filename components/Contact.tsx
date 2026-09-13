"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { site } from "@/lib/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Здравствуйте! Меня зовут ${name || "—"}, телефон ${phone || "—"}. ${msg || "Хочу консультацию по стеклу."}`;
    window.open(`${site.telegram}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const rows = [
    { icon: <Phone size={19} />, label: "Телефон", value: site.phone, href: site.phoneHref },
    { icon: <Mail size={19} />, label: "Email", value: site.email, href: "mailto:" + site.email },
    { icon: <MapPin size={19} />, label: "Офис", value: site.address },
    { icon: <Clock size={19} />, label: "Режим", value: site.hours },
  ];

  return (
    <section id="contact" className="bg-card border-t border-line py-20 md:py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="eyebrow">Контакты</p>
          <h2 className="h2 mt-3">Заявка на замер</h2>
          <p className="lead mt-4 max-w-md">Напишите или позвоните. Заявки принимаем круглосуточно, отвечаем в рабочее время — обычно за несколько минут.</p>

          <div className="mt-8 space-y-4">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-brass-soft text-brass flex items-center justify-center shrink-0">{r.icon}</span>
                <div>
                  <p className="text-[13px] font-bold text-muted uppercase tracking-[0.08em]">{r.label}</p>
                  {r.href ? <a href={r.href} className="text-ink text-[18px] font-bold hover:text-brass transition-colors">{r.value}</a> : <p className="text-ink text-[17px] font-semibold">{r.value}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.telegram} target="_blank" rel="noreferrer" className="rounded-full bg-[#2AABEE] text-white px-5 py-3 text-[15px] font-bold hover:brightness-110 transition">Telegram</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] text-white px-5 py-3 text-[15px] font-bold hover:brightness-110 transition">WhatsApp</a>
            <a href={site.vk} target="_blank" rel="noreferrer" className="rounded-full bg-[#0077FF] text-white px-5 py-3 text-[15px] font-bold hover:brightness-110 transition">ВКонтакте</a>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[28px] bg-paper border border-line p-7 md:p-10 flex flex-col gap-4">
          <h3 className="text-[24px] font-extrabold text-ink">Перезвоним и договоримся о времени</h3>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className="w-full rounded-2xl bg-card border-2 border-line px-5 py-4 text-[16px] text-ink placeholder-muted outline-none focus:border-brass transition-colors" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" inputMode="tel" className="w-full rounded-2xl bg-card border-2 border-line px-5 py-4 text-[16px] text-ink placeholder-muted outline-none focus:border-brass transition-colors" />
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Что нужно: душевая, перегородка, ограждение… размеры, если знаете" rows={4} className="w-full rounded-2xl bg-card border-2 border-line px-5 py-4 text-[16px] text-ink placeholder-muted outline-none focus:border-brass transition-colors resize-none" />
          <button type="submit" className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-7 py-4 text-[16px] font-bold hover:bg-brass transition-colors">
            Отправить в Telegram
            <Send size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
          <p className="text-[13px] text-muted text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
        </form>
      </div>
    </section>
  );
}
