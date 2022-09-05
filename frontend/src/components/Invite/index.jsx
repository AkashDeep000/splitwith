import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getInviteGroup, joinGroup } from "@/helper/apiHelper/groupApi";
import Spinner from "@/components/utils/Spinner";
import { Link, useNavigate } from "react-router-dom";
import useInviteStore from "@/store/inviteStore";
import { useState } from "react";

export default function Invite({ groupId }) {
  const [cookies] = useCookies(["accessToken"]);
  const addInvite = useInviteStore((state) => state?.addInvite);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading, isError, error } = useQuery(
    [`invite-group-${groupId}`],
    () => getInviteGroup({ groupId })
  );

  if (isError) {
    console.log(error);
  }

  const {
    isLoading: isJoining,
    isError: isJoinError,
    isSuccess: isJoinSuccess,
    mutate: mutateJoin,
  } = useMutation(
    (groupId) => {
      return joinGroup({
        token: cookies.accessToken,
        groupId: groupId,
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("groups");
        navigate(`/dashboard/groups/${groupId}`);
      },
      onError: (err) => {
        if (err.response?.data?.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg("Something wrong happened.");
        }
      },
    }
  );

  const profileImage = (data) => {
    if (data.profileImage) {
      return data.profileImage;
    }
    switch (data.category) {
      case "trip":
        return "/images/trip.png";

      case "home":
        return "/images/home.png";

      case "office":
        return "/images/chair.png";

      case "sport":
        return "/images/sport.png";

      default:
        return "/images/group.png";
    }
  };

  const handleJoin = (groupId) => {
    if (!cookies.accessToken) {
      addInvite(data.id);
      navigate("/signup");
    } else {
      mutateJoin(groupId);
    }
  };

  return (
    <>
      <div className="grid px-8 place-items-center bg-slate-400/10 w-full h-screen pb-[50%]">
        <div className="w-full p-4 max-w-[25rem] bg-white">
          {isLoading ? (
            <>
              <p>Wait loading group info...</p>
              <div className="text-center mt-4">
                <Spinner className="w-8 h-8 text-indigo-500 animate-spin fill-indigo-200" />
              </div>
            </>
          ) : isError ? (
            "Failed to load gro info. Please reload or cheak if the invite link is valid."
          ) : (
            <>
              <p className="text-left mb-3">Are you want to join this group?</p>

              <div className="bg-white p-1 bg-orange-50 mb-3">
                <div className="grid grid-cols-[auto_1fr] gap-2">
                  <img
                    className="w-20 p-3 bg-orange-100 rounded"
                    src={profileImage(data)}
                  />
                  <div className="">
                    <h2 className="font-semibold text-slate-700 line-clamp-1 pt-2">
                      {data?.name}
                    </h2>
                    <p className="">Total member: {data.memberIDs.length}</p>
                  </div>
                </div>
              </div>
              {isJoinError ? (
                <div className="px-2 py-1.5 bg-red-50 text-red-400 border border-red-300 mb-3 text-sm">
                  {errorMsg}
                </div>
              ) : null}
              <div className="grid grid-flow-col gap-2">
                <Link
                  to="/dashboard"
                  className="text-center text-white w-full bg-red-500 p-1 rounded"
                >
                  Cancel
                </Link>
                <button
                  onClick={() => handleJoin(data.id)}
                  className="text-white w-full bg-indigo-500 p-1 rounded"
                >
                  {isJoining ? (
                    <p>
                      Joining...
                      <Spinner className="ml-2 w-5 h-5 text-indigo-200 animate-spin fill-white" />
                    </p>
                  ) : (
                    "Join"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
