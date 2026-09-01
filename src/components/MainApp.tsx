// este componente es el contenedor central de la app
// aqui se va a mostrar el contenido principal mas adelante

// importamos el componente que contiene el area de contenido
import ContentBox from "./Content";

// exportamos el componente principal de la vista central
export default function MainApp() {
  return (
    // es una seccion que ocupa todo y organiza en fila
    <section className="w-full h-full flex gap-1">
      <ContentBox />
    </section>
  );
}
