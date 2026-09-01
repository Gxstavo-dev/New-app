// este es el componente de la barra superior de la app
// cambia entre mostrar el menu de acciones o los botones de acciones rapidas

// framer-motion sirve para crear animaciones de entrada y salida
import { AnimatePresence, motion } from "framer-motion";
// los dos componentes que se pueden mostrar en la barra
import ShowItems from "./ShowItems.Titlebar";
import ShowMenu from "./ShowMenu.Titlebar";
// el store de zustand que guarda si la barra esta oculta o no
import { useHiddenbar } from "../store/useHiddebar";

export default function Titlebar() {
  // leemos el estado "hidden" desde el store de zustand
  const hidden = useHiddenbar((state) => state.hidden);

  return (
    // contenedor de la barra superior (alto de 8)
    <div className="relative w-full h-8 overflow-hidden">
      {/* animatepresence controla cuando un componente aparece o desaparece */}
      <AnimatePresence mode="wait">
        {/* si la barra esta oculta, mostramos el menu */}
        {hidden ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ShowMenu />
          </motion.div>
        ) : (
          // si no esta oculta, mostramos los botones de acciones rapidas
          <motion.div
            key="items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ShowItems />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
