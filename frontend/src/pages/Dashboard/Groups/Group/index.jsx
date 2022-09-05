import { useParams } from "react-router-dom";
import Group from "@/components/Groups/Group";
import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import { useEffect } from "react";

function GroupPage() {
  const { groupId } = useParams();
  
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  
  /*
 useEffect(() => {
    setActiveHeaderTitle("");
  }, []);
  */

  return (
    <div className="">
      <Group  groupId={groupId}/> 
    </div>
  );
}

export default GroupPage;
