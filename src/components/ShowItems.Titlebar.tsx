// este componente muestra los botones de acciones rapidas en la barra superior
// incluye el boton para ocultar la barra de acciones

// useState sirve para saber si el mouse esta encima de un boton
import { useState } from "react";
// interfaz que define los botones
import Buttons from "../interface/Button";
// icono de ojo cerrado para el boton de ocultar
import { EyeClosed } from "lucide-react";
// store de zustand para cambiar el estado de la barra
import { useHiddenbar } from "../store/useHiddebar";

export default function ShowItems() {
  // leemos el estado y la funcion para ocultar/mostrar la barra
  const { hidden, hiddeBar } = useHiddenbar();
  // guarda si el mouse esta encima del boton de ocultar
  const [hover, setHover] = useState(false);

  // lista de acciones rapidas (cada una es un boton)
  const options: Buttons[] = [{ text: "Nueva nota" }, { text: "Opciones" }];

  // convertimos cada opcion en un boton
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
    // barra de acciones rapidas
    <section className="w-full h-7 flex items-center gap-3 pl-4">
      {/* boton para ocultar la barra; cuando el mouse lo toca, se expande su texto */}
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => hiddeBar(!hidden)}
        className="h-full text-[11px] flex items-center justify-center gap-2 transition-all duration-700  ease-in-out text-neutral-400 cursor-pointer focus:outline-none"
      >
        <EyeClosed width={11} height={11} className="shrink-0" />
        {/* el texto se muestra solo cuando el mouse esta encima (max-w cambia) */}
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
