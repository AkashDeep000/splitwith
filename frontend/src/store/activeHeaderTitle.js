import create from "zustand";

const useActiveHeaderTitleStore = create((set) => ({
  activeHeaderTitle: "",
  setActiveHeaderTitle: (activeHeaderTitle) =>
    set((state) => ({ 
      activeHeaderTitle:  activeHeaderTitle
    })),
}));


export default useActiveHeaderTitleStore;
