import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Notes from "./Notes";
import Settings from "./Settings";
import Resumen from "./Resumen";

export default function Sidebar() {
  const [index, setIndex] = useState(0);
  const refs = useRef<HTMLDivElement[]>([]);

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

  const ir = (nuevo: number) => {
    setIndex(nuevo);
    refs.current[nuevo]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const recorrerAdelante = () => {
    if (index < divs.length - 1) ir(index + 1);
  };
  const recorrerAtras = () => {
    if (index > 0) ir(index - 1);
  };

  return (
    <section className="h-full w-70 p-2 flex flex-col gap-1 border-l border-l-neutral-800">
      <section className="w-full h-5 flex items-center pl-3 gap-2">
        <button
          className="w-5 h-full cursor-pointer focus:outline-none"
          onClick={recorrerAtras}
        >
          <ArrowLeft color="white" width={11} height={11} />
        </button>
        <button
          className="w-5 h-full cursor-pointer focus:outline-none"
          onClick={recorrerAdelante}
        >
          <ArrowRight color="white" width={11} height={11} />
        </button>
      </section>
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
