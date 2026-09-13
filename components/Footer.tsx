import { site } from "@/lib/site";
import Logo from "./Logo";

const cols = [
  { title: "Каталог", links: ["Душевые перегородки", "Стеклянные перегородки", "Ограждения", "Остекление саун", "Стеклянные двери", "Зеркала"] },
  { title: "Компания", links: ["О компании", "Фото работ", "Отзывы", "Для дизайнеров", "Контакты"] },
  { title: "Полезное", links: ["Правила эксплуатации", "Гидрофобное покрытие", "Типы стекла", "Типы конструкций", "Вопрос — ответ"] },
];

export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-[13px] text-white/50 max-w-xs leading-relaxed">
            Изготовление и монтаж конструкций из закалённого стекла. {site.region}.
          </p>
          <a href={site.phoneHref} className="mt-5 block text-white text-lg font-bold hover:text-brass transition-colors">{site.phone}</a>
          <a href={"mailto:" + site.email} className="text-white/60 text-[14px] hover:text-white">{site.email}</a>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-bold text-[14px] mb-4">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-white/40">
          <span>© {new Date().getFullYear()} {site.legal}. ОГРН {site.ogrn}, ИНН {site.inn}</span>
          <span>{site.address}</span>
          <a href="#" className="hover:text-white">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
