import { create } from "zustand";

type NavbarType = {
  isOpen: boolean;
  toggle: () => void;
  navSelected: "home" | "kamus" | "kuis";
  setNavSelected: (nav: "home" | "kamus" | "kuis") => void;
};

const useNavbarStore = create<NavbarType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  navSelected: "home",
  setNavSelected: (nav) => set({ navSelected: nav }),
}));

export default useNavbarStore;
