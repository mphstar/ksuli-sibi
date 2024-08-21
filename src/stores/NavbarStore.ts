import { create } from "zustand";

type NavbarType = {
  isOpen: boolean;
  toggle: () => void;
};

const useNavbarStore = create<NavbarType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useNavbarStore;
