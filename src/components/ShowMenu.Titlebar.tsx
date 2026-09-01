// este componente se muestra cuando la barra de acciones esta oculta
// permite volver a mostrar la barra de acciones rapidas

// icono de menu
import { Menu } from "lucide-react";
// useState para saber si el mouse esta encima
import { useState } from "react";
// interfaz de los botones
import Buttons from "../interface/Button";
// store de zustand para cambiar el estado de la barra
import { useHiddenbar } from "../store/useHiddebar";

export default function ShowMenu() {
  // guarda si el mouse esta encima del boton de menu
  const [hover, setHover] = useState(false);
  // la funcion que vuelve a mostrar la barra de acciones
  const { hiddeBar } = useHiddenbar();

  // opciones del menu (en este caso solo una)
  const options: Buttons[] = [{ text: "Mostrar Banda de acciones rapidas" }];

  // convertimos las opciones en botones
  const BUTTONS = options.map((option, index) => {
    return (
      <button
        key={index}
        className="w-47  text-[11px] text-neutral-400 hover:bg-neutral-800   cursor-pointer"
        // al darle click, volvemos a mostrar la barra de acciones
        onClick={() => hiddeBar(false)}
      >
        {option.text}
      </button>
    );
  });

  return (
    // barra del menu
    <section className="w-full h-7 flex items-center gap-3 pl-4">
      {/* boton de menu; al tocar con el mouse se expande el texto */}
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
