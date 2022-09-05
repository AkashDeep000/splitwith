import create from "zustand";

const useActiveNav = create((set) => ({
  activeNav: "",
  setActiveNav: (activeNav) =>
    set((state) => ({
      activeNav: activeNav,
    })),
}));

export default useActiveNav;
