import { useState } from "react";
import Buttons from "../interface/Button";
import { useHiddeBar } from "../contexts/HiddeBar";
import { EyeClosed } from "lucide-react";

export default function ShowItems() {
  const { hidden, hiddeBar } = useHiddeBar();
  const [hover, setHover] = useState(false);

  const options: Buttons[] = [{ text: "Nueva nota" }, { text: "Opciones" }];

  const BUTTONS = options.map((option, index) => {
    return (
      <button
        key={index}
        className="w-15  text-[11px] text-white hover:bg-neutral-800   cursor-pointer"
      >
        {option.text}
      </button>
    );
  });
  return (
    <section className="w-full h-7 flex items-center gap-3 pl-4">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => hiddeBar(!hidden)}
        className="h-full text-[11px] flex items-center justify-center gap-2 transition-all duration-700  ease-in-out text-neutral-400 cursor-pointer focus:outline-none"
      >
        <EyeClosed width={11} height={11} className="shrink-0" />
        <span
          className={`whitespace-nowrap transition-all duration-500 ease-in-out overflow-hidden ${hover ? "max-w-50 opacity-70" : "max-w-0 opacity-0"}`}
        >
          Ocultar banda de acciones
        </span>
      </button>
      <p className="text-[11px] text-neutral-400 w-25 h-full flex items-center">
        Acciones rapidas:
      </p>
      {BUTTONS}
    </section>
  );
}
