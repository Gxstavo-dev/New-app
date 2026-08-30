import { createContext, useState, ReactNode, useContext } from "react";

interface HiddeType {
  hidden: boolean;
  hiddeBar: (condition: boolean) => void;
}

const HiddeBarContext = createContext<HiddeType | undefined>(undefined);

export function HiddeBarProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidde] = useState<boolean>(false);

  const hiddeBar = (condition: boolean) => {
    setHidde(condition);
  };

  return (
    <HiddeBarContext.Provider value={{ hidden, hiddeBar }}>
      {children}
    </HiddeBarContext.Provider>
  );
}

export function useHiddeBar() {
  const context = useContext(HiddeBarContext);
  if (!context) {
    throw new Error("Ocurrio un error con el provider");
  }
  return context;
}
