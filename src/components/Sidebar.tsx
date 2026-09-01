// este es el panel lateral (sidebar) de la app
// tiene un carrusel que deja cambiar entre secciones

// iconos de flechas para moverse entre secciones
import { ArrowLeft, ArrowRight } from "lucide-react";
// useref guarda referencias de elementos y usestate guarda el indice actual
import { useRef, useState } from "react";
// las secciones que se muestran dentro del carrusel
import Notes from "./Notes";
import Settings from "./Settings";
import Resumen from "./Resumen";

export default function Sidebar() {
  // guarda el numero de la seccion que se esta mostrando (empieza en 0)
  const [index, setIndex] = useState(0);
  // guarda las referencias de cada seccion para poder hacer scroll a ellas
  const refs = useRef<HTMLDivElement[]>([]);

  // aqui se definen las secciones del carrusel
  const divs = [
    {
      styles: "min-w-full h-full shrink-0",
      data: "section1",
      content: <Resumen />,
    },
    {
      styles: "min-w-full h-full shrink-0",
      data: "section2",
      content: <Notes />,
    },
    {
      styles: "min-w-full h-full shrink-0",
      data: "section3",
      content: <Settings />,
    },
  ];

  // esta funcion cambia a la seccion que se pida y hace scroll hasta ella
  const ir = (nuevo: number) => {
    // guardamos el nuevo indice
    setIndex(nuevo);
    // movemos el scroll hasta esa seccion de forma suave
    refs.current[nuevo]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  // avanza a la siguiente seccion si no es la ultima
  const recorrerAdelante = () => {
    if (index < divs.length - 1) ir(index + 1);
  };
  // retrocede a la seccion anterior si no es la primera
  const recorrerAtras = () => {
    if (index > 0) ir(index - 1);
  };

  return (
    // seccion lateral con ancho fijo y borde izquierdo
    <section className="h-full w-70  flex flex-col gap-1 border-l border-l-neutral-800">
      {/* barra de botones para navegar entre secciones */}
      <section className="w-full h-6 flex pl-3 items-center border-b border-b-neutral-800">
        {/* boton para ir atras */}
        <button
          className="w-5 h-full cursor-pointer focus:outline-none"
          onClick={recorrerAtras}
        >
          <ArrowLeft color="white" width={11} height={11} />
        </button>
        {/* boton para ir adelante */}
        <button
          className="w-5 h-full cursor-pointer focus:outline-none"
          onClick={recorrerAdelante}
        >
          <ArrowRight color="white" width={11} height={11} />
        </button>
      </section>
      {/* contenedor del carrusel: no deja saltar de linea y corta el desborde */}
      <section className="flex-1 flex flex-nowrap gap-1  overflow-hidden">
        {divs.map((div, i) => (
          <div
            key={i}
            data-name={div.data}
            className={div.styles}
            ref={(el) => {
              refs.current[i] = el!;
            }}
          >
            {div.content}
          </div>
        ))}
      </section>
    </section>
  );
}
