import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Dashboard from "@/components/Dashboard";

function Overview() {
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);
  const [cookies, setCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    setActiveNav("home");
    setActiveHeaderTitle("");
    //alert(cookies.accessToken);
  }, []);
  return (
<Dashboard/>
  );
}

export default Overview;
