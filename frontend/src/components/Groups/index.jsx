import { useState } from "react";
import CreateGroup from "./CreateGroup";
import GroupCard from "./GroupCard";
import { HiOutlineUserGroup, HiPlusSm } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { listGroups } from "@/helper/apiHelper/groupApi";

function Groups() {
  const [cookies] = useCookies(["accessToken"]);

  const { data, isLoading, isError, error } = useQuery(["groups"], () =>
    listGroups({ token: cookies.accessToken })
  );
  if (isError) {
    console.log(error);
  }

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="grid justify-items-center py-3 px-2">
      <button
        onClick={() => setIsCreateOpen(true)}
        className="flex justify-center w-full bg-white text-lg text-slate-800 px-3 py-2 rounded mb-3"
      >
        <HiOutlineUserGroup className="w-6 h-6" />
        <HiPlusSm className="w-6 h-6 ml-[-.3rem]" />
        Create New Group
      </button>
      <CreateGroup useCreateOpen={[isCreateOpen, setIsCreateOpen]} />
      {isLoading ? "Loading..." : isError ? "Error" : ""}
      <div className="grid gap-3 w-full">
        {data?.map((group) => (
          <GroupCard key={group?.id} data={group} />
        ))}
      </div>
    </div>
  );
}

export default Groups;
