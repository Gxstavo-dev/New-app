import { Menu } from "lucide-react";
import { useState } from "react";
import { useHiddeBar } from "../contexts/HiddeBar";
import Buttons from "../interface/Button";

export default function ShowMenu() {
  const [hover, setHover] = useState(false);
  const { hiddeBar } = useHiddeBar();

  const options: Buttons[] = [{ text: "Mostrar Banda de acciones rapidas" }];

  const BUTTONS = options.map((option, index) => {
    return (
      <button
        key={index}
        className="w-47  text-[11px] text-neutral-400 hover:bg-neutral-800   cursor-pointer"
        onClick={() => hiddeBar(false)}
      >
        {option.text}
      </button>
    );
  });

  return (
    <section className="w-full h-7 flex items-center gap-3 pl-4 border-b border-b-neutral-700">
      <button
        className="h-full text-[11px] flex items-center justify-center gap-2 transition-all duration-700  ease-in-out text-neutral-400 cursor-pointer focus:outline-none"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Menu width={11} height={11} color="white" />

        <span
          className={`whitespace-nowrap transition-all duration-500 ease-in-out overflow-hidden ${hover ? "max-w-50 opacity-70" : "max-w-0 opacity-0"}`}
        >
          Menu
        </span>
      </button>
      {BUTTONS}
    </section>
  );
}
