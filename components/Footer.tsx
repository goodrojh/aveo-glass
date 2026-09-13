import { site } from "@/lib/site";
import Logo from "./Logo";

const cols = [
  { title: "Каталог", links: [["Душевые конструкции", "#catalog"], ["Перегородки из стекла", "#catalog"], ["Ограждения лестниц", "#catalog"], ["Прочие изделия", "#catalog"]] },
  { title: "Компания", links: [["Как работаем", "#process"], ["Гарантии", "#faq"], ["Цены", "#pricing"], ["Дизайнерам", "#process"], ["Контакты", "#contact"]] },
  { title: "Полезное", links: [["Стекло", "#glass"], ["Фурнитура", "#hardware"], ["Штанги жёсткости", "#hardware"], ["Гидрофобное покрытие", "#faq"], ["Вопрос — ответ", "#faq"]] },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <Logo light />
          <p className="mt-4 text-[15px] text-white/65 max-w-xs leading-relaxed">Изготовление и монтаж конструкций из закалённого стекла. {site.region}.</p>
          <a href={site.phoneHref} className="mt-5 block text-white text-[20px] font-bold hover:text-brass-2 transition-colors">{site.phone}</a>
          <a href={"mailto:" + site.email} className="text-white/70 text-[15px] hover:text-white">{site.email}</a>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-bold text-[15px] mb-4">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.links.map(([l, h]) => (
                <li key={l}><a href={h} className="text-[15px] text-white/65 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-white/50">
          <span>© {new Date().getFullYear()} {site.legal} · ОГРН {site.ogrn} · ИНН {site.inn}</span>
          <span>{site.address}</span>
        </div>
      </div>
    </footer>
  );
}
