import Overview from "./Overview";
import Bills from "./Bills";
import Dues from "./Dues";
import Members from "./Members";
import { useQuery } from "@tanstack/react-query";
import { getGroup } from "@/helper/apiHelper/groupApi";
import { useCookies } from "react-cookie";
import useAddBillStore from "@/store/addBillStore";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";

function Group({ groupId }) {
  const [cookies] = useCookies(["accessToken"]);
  const setAddBillStore = useAddBillStore((state) => state.setAddBill);
  const [activeBtn, setActiveBtn] = useState("bills");
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setAddBillStore({ groupId });
  }, []);

  const { data, isLoading, isError, error } = useQuery(
    [`group-${groupId}`],
    () => getGroup({ token: cookies.accessToken, groupId })
  );
  if (isError) {
    console.log(error);
  }

  return (
    <div className="p-1.5 pt-2 w-full">
      {isLoading ? (
        <center> Loading.. </center>
      ) : isError ? (
        <center>Error</center>
      ) : (
        <>
          <Overview groupId={groupId} data={data} />
          <div className="bg-white mt-2 rounded-lg overflow-x-auto p-1.5">
            <div className="bg-gray-100 rounded-lg m-2 mb-5  p-1   grid grid-cols-3 gap-1  font-ubuntu">
              <button
                onClick={() => setActiveBtn("bills")}
                className={`rounded-lg py-1 ${
                  activeBtn === "bills"
                    ? "bg-indigo-500 text-white"
                    : "text-indigo-500 hover:bg-indigo-100"
                }`}
              >
                Bills
              </button>
              <button
                onClick={() => setActiveBtn("settelements")}
                className={`rounded-lg py-1 ${
                  activeBtn === "settelements"
                    ? "bg-indigo-500 text-white"
                    : "text-indigo-500 hover:bg-indigo-100"
                }`}
              >
                Settelements
              </button>
              <button
                onClick={() => setActiveBtn("members")}
                className={`rounded-lg py-1 ${
                  activeBtn === "members"
                    ? "bg-indigo-500 text-white"
                    : "text-indigo-500 hover:bg-indigo-100"
                }`}
              >
                Members
              </button>
            </div>
            {activeBtn === "bills" ? (
              <Bills data={data.bills} />
            ) : activeBtn === "settelements" ? (
              <Dues
                groupId={groupId}
                myDues={data.myDues}
                otherDues={data.otherDues}
                myAddedMembersDues={data.myAddedMembersDues}
                isAdmin={data.isAdmin}
              />
            ) : activeBtn === "members" ? (
              <Members
                data={data.members}
                isAdmin={data.isAdmin}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default Group;
