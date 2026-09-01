// este es el store de zustand que guarda si la barra de acciones esta oculta
// zustand deja compartir datos entre varios componentes sin pasarlos por props

import { create } from "zustand";

// definimos la forma del store (que datos y funciones tiene)
interface HiddeType {
  // true si la barra esta oculta, false si esta visible
  hidden: boolean;
  // funcion para cambiar el estado de la barra
  hiddeBar: (condition: boolean) => void;
}

// creamos el store
// set es la funcion que actualiza el estado
export const useHiddenbar = create<HiddeType>((set) => ({
  // empieza visible (hidden es false)
  hidden: false,
  // esta funcion recibe un valor y lo guarda como estado
  hiddeBar: (condition) => set({ hidden: condition }),
}));
