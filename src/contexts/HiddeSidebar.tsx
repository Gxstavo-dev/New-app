import { createContext, ReactNode, useContext, useState } from 'react';

interface HiddeSidebarType {
  hidde: boolean;
  toggle: () => void;
}

interface ProviderType {
  children: ReactNode;
}

const HiddeSidebarContexts = createContext<HiddeSidebarType | undefined>(undefined);

export function HiddeSidebarProvider({ children }: ProviderType) {
  const [hidde, setToggle] = useState<boolean>(false);

  const toggle = () => {
    setToggle(!hidde);
  };

  return <HiddeSidebarContexts.Provider value={{ hidde, toggle }}>{children}</HiddeSidebarContexts.Provider>;
}

export function useToggleSidebar() {
  const context = useContext(HiddeSidebarContexts);
  if (!context) throw new Error('Ocurrio un error con el Provider HiddeSidebar');
  return context;
}
