import create from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: {},
      setUser: (user) => {
        
        const currentState = get().user;
        set({
          user: { ...currentState, ...user },
        });
      },
      removeUser: () => {
        set(() => {
          user: {
          }
        });
      },
    }),

    {
      name: "userDetails",
    }
  )
);

export default useUserStore;
