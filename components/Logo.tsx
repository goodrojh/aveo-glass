import { asset } from "@/lib/site";

/** Оригинальный логотип Aveo Glass Systems (aveo-glass.ru). Синий — читается и на светлом, и на тёмном. */
export default function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={"inline-flex items-center " + className}>
      <img
        src={asset("/img/logo.png")}
        alt="Aveo Glass Systems"
        className={"h-9 md:h-10 w-auto " + (light ? "brightness-125" : "")}
        draggable={false}
      />
    </span>
  );
}
