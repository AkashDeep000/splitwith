import create from "zustand";

const useAddBillStore = create((set) => ({
  addBill: {
    open: false,
    groupId: "",
  },
  setAddBill: (addBill) =>
    set((state) => ({
      addBill: { ...state.addBill, ...addBill },
    })),
}));

export default useAddBillStore;
