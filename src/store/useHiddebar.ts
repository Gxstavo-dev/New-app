import { create } from "zustand";

interface HiddeType {
  hidden: boolean;
  hiddeBar: (condition: boolean) => void;
}

export const useHiddenbar = create<HiddeType>((set) => ({
  hidden: false,
  hiddeBar: (condition) => set({ hidden: condition }),
}));
