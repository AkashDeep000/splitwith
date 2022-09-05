import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import { useEffect } from "react";
import GroupsComponent from "@/components/Groups";

import { Outlet, useParams } from "react-router-dom";


function Groups() {
  const { groupId } = useParams();
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("groups");
    setActiveHeaderTitle("Groups");
  }, []);

  return <>{!groupId ? <GroupsComponent /> : <Outlet />}</>;
}

export default Groups;
