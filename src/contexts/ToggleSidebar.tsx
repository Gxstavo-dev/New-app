import { createContext, useContext, useState } from 'react';
import type { ToggleSidebarType } from '../interfaces/ToggleSidebarType';
import type { ToggleSidebarProviderTypes } from '../interfaces/ToggleSidebarProviderTypes';

const ToggleSidebarContext = createContext<ToggleSidebarType | undefined>(
  undefined,
);

// proveedor que guarda el estado de ocultar o mostrar la barra lateral
export function ToggleSidebarProvider({
  children,
}: ToggleSidebarProviderTypes) {
  const [hidde, setHidde] = useState(false);

  // invierte el estado de ocultado
  const toggle = () => {
    setHidde(!hidde);
  };

  return (
    <ToggleSidebarContext.Provider value={{ hidde, toggle }}>
      {children}
    </ToggleSidebarContext.Provider>
  );
}

// hook que da acceso al estado de la barra lateral desde cualquier componente
export function useHiddeBar() {
  const context = useContext(ToggleSidebarContext);
  if (!context) {
    throw new Error("Ocurrio un error con el provider de ToggleSidebarContext");
  }
  return context;
}