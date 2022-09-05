import { HiOutlineUser, HiPlusSm } from "react-icons/hi";
import { useState } from "react";
import Invite from "../Invite";

function Overview({ groupId, data }) {
  const [isInviteOpen, setIsInviteOpen] = useState();

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
  
  return (
    <div className="bg-white w-full rounded-lg p-1.5">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <img
          className="w-20 p-3 bg-orange-50 rounded-lg"
          src={profileImage(data)}
        />
        <div className="">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <h2 className="font-ubuntu font-semibold text-slate-700 line-clamp-1 pt-2">
              {data?.name}
            </h2>
            <button
              onClick={() => setIsInviteOpen(true)}
              className="float text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg"
            >
              <HiOutlineUser className="inline w-5 h-5" />
              <HiPlusSm className="inline w-5 h-5 ml-[-.5rem]" />
              Add member
            </button>
            <Invite
              groupId={groupId}
              useInviteOpen={[isInviteOpen, setIsInviteOpen]}
            />
          </div>
          <p className="mt-2 text-slate-700">
            members : {"  " + data?.totalMembers}
          </p>
        </div>
      </div>
      <div className="mt-2 mb-1 bg-orange-50 rounded-lg">
        <div className="grid grid-cols-[1fr_auto_1fr]">
          <div className="p-4">
            <p className="text-slate-600 mb-2">Total Bill</p>
            <p className="text-indigo-500 text-4xl font-bold font-ubuntu">
              {data.totalBill}
            </p>
          </div>
          <div className="w-0 h-full border border-dotted border-white border-4 border-r-0 y-3"></div>
          <div className="p-4">
            <p className="text-slate-600">Your Expenses</p>
            <p className="text-indigo-500 text-xl font-bold font-ubuntu">
              {data.yourBill}
            </p>
          <div className="h-0 border border-dotted border-white border-4 border-b-0 y-3"></div>
            <p className="text-slate-600">Your Balance</p>
            <p
              className={`${
                data.yourBal < 0 ? "text-red-500" : "text-green-500"
              } text-xl font-bold font-ubuntu`}
            >
              {data.yourBal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
