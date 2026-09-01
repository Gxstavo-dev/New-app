// este es el componente principal de la app
// es como el arbol que une todas las partes de la interfaz

// importamos los componentes de la interfaz
import MainApp from "./components/MainApp";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";

// exportamos la funcion que dibuja toda la app
export default function App() {
  return (
    // el contenedor ocupa todo el alto de la pantalla y organiza en fila (flex)
    <div className="w-full h-screen flex">
      {/* la parte izquierda se apila en columna: barra superior y el contenido */}
      <div className="w-full h-full flex flex-col">
        <Titlebar />
        <MainApp />
      </div>
      {/* la barra lateral se pone a la derecha */}
      <Sidebar />
    </div>
  );
}
