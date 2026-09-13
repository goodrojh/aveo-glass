import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Авео Гласс — душевые кабины, стеклянные перегородки и ограждения на заказ в Москве",
  description:
    "Изготовление и монтаж душевых перегородок, стеклянных перегородок и ограждений из закалённого стекла в Москве и МО. Замер с образцами, производство 12–18 дней, гарантия на стекло, фурнитуру и монтаж.",
  openGraph: {
    title: "Авео Гласс — стекло, которое меняет пространство",
    description: "Душевые, перегородки, ограждения из закалённого стекла. Москва и МО.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable + " " + cormorant.variable}>
      <body>{children}</body>
    </html>
  );
}
