import { createContext, ReactNode, useContext, useState } from "react";

interface ToggleSidebarType {
  hidde: boolean;
  toggle: () => void;
}

interface ToggleSidebarProviderTypes {
  children: ReactNode;
}

const ToggleSidebarContext = createContext<ToggleSidebarType | undefined>(
  undefined,
);

export function ToggleSidebarProvider({
  children,
}: ToggleSidebarProviderTypes) {
  const [hidde, setHidde] = useState(false);

  const toggle = () => {
    setHidde(!hidde);
  };

  return (
    <ToggleSidebarContext.Provider value={{ hidde, toggle }}>
      {children}
    </ToggleSidebarContext.Provider>
  );
}

export function useHiddeBar() {
  const context = useContext(ToggleSidebarContext);
  if (!context) {
    throw new Error("Ocurrio un error con el provider de ToggleSidebarContext");
  }
  return context;
}