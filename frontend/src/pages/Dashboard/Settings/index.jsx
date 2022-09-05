import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import { useEffect } from "react";
import LogOut from "@/components/utils/LogOut";

function Settings() {
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("settings");
    setActiveHeaderTitle("Settings");
  }, []);

  return (
    <>
      <LogOut className="mt-2 text-gray-700 text-lg bg-white w-full border px-2 py-4">
        Log Out
      </LogOut>
    </>
  );
}

export default Settings;
