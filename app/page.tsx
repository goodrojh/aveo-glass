import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Catalog from "@/components/Catalog";
import GlassLab from "@/components/GlassLab";
import Hardware from "@/components/Hardware";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import Advantages from "@/components/Advantages";
import FogReveal from "@/components/FogReveal";
import Pricing from "@/components/Pricing";
import Designers from "@/components/Designers";
import FAQ from "@/components/FAQ";
import Configurator from "@/components/Configurator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <Catalog />
      <GlassLab />
      <Hardware />
      <BeforeAfter />
      <Process />
      <Advantages />
      <FogReveal />
      <Pricing />
      <Designers />
      <FAQ />
      <Configurator />
      <Contact />
      <Footer />
      <StickyCall />
    </main>
  );
}
