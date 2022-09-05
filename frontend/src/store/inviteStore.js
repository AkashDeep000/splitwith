import create from "zustand";
import { persist } from "zustand/middleware";

const useInviteStore = create(
  persist(
    (set, get) => ({
      invite: "",
      addInvite: (groupId) => {
        set({
          invite: groupId,
        });
      },
      removeInvite: () => {
        set(() => {
          invite: "";
        });
      },
    }),

    {
      name: "invite",
    }
  )
);

export default useInviteStore;
