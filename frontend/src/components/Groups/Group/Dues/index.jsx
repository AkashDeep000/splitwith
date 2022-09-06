import useUserStore from "@/store/userStore";
import { useState } from "react";
import { BsDash, BsArrowRight } from "react-icons/bs";
import Settle from "./Settle";
export default function Dues({
  groupId,
  myDues,
  otherDues,
  myAddedMembersDues,
  isAdmin,
}) {
  const user = useUserStore((state) => state.user);
  const [settleUpState, setSettleUpState] = useState({
    open: false,
    data: {},
  });

  return (
    <div className="grid gap-4">
      <h3 className="text-indigo-500 text-center font-semibold">
        Your settlments
      </h3>
      <Settle useSettleUpState={[settleUpState, setSettleUpState]} />
      {!myDues.length ? (
        <p className="text-center text-slate-700">
          {" "}
          You do not have any settlements{" "}
        </p>
      ) : null}
      {myDues.map((due) => {
        return (
          <div
            key={due.sender.id + due.receiver.id}
            className="shadow-[0_0_.3rem_#00000013] p-2 px-3 grid items-center grid-cols-[1fr_auto_1fr] text-slate-700"
          >
            <div className="grid place-items-center">
              <div className="bg-orange-50 rounded-full w-fit p-2">
                <img
                  className="w-12 h-12"
                  src={`https://avatars.dicebear.com/api/male/${due.sender.id}.svg`}
                />
              </div>

              <p className="mt-1 text-center line-clamp-1">
                {user.id === due.sender.id ? "You" : due.sender.name}
              </p>
            </div>

            <div className="grid place-items-center">
              <p className="text-sm"> Will give </p>
              <div className="flex items-center py-2">
                <BsDash className="w-[2rem] h-[2rem] my-[-2rem]" />
                <span
                  className={`font-semibold ${
                    due.sender.id === user.id
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {due.amount}
                </span>
                <BsArrowRight className="w-[2rem] h-[2rem] my-[-3rem]" />
              </div>
              {user.id === due.receiver.id ? (
                <button
                  onClick={() =>
                    setSettleUpState({
                      open: true,
                      data: {
                        groupId,
                        senderId: due.sender.id,
                        senderName: due.sender.name,
                        amount: due.amount,
                      },
                    })
                  }
                  className="px-3 py-1 bg-indigo-500 text-white text-sm rounded"
                >
                  Settle up
                </button>
              ) : null}
            </div>

            <div className="grid place-items-center">
              <div className="bg-orange-50 rounded-full w-fit p-2">
                <img
                  className="w-12 h-12"
                  src={`https://avatars.dicebear.com/api/male/${due.receiver.id}.svg`}
                />
              </div>

              <p className="mt-1 text-center line-clamp-1">
                {user.id === due.receiver.id ? "You" : due.receiver.name}
              </p>
            </div>
          </div>
        );
      })}

      <h3 className="mt-4 text-indigo-500 text-center font-semibold">
        {isAdmin
          ? "Settlments of manually added members"
          : "Settlement of members added by admin"}
      </h3>
      <Settle useSettleUpState={[settleUpState, setSettleUpState]} />
      {!myAddedMembersDues?.length ? (
        <p className="text-center text-slate-700"> There has no sattlement </p>
      ) : null}

      {myAddedMembersDues?.map((due) => {
        return (
          <div
            key={due.sender.id + due.receiver.id}
            className="shadow-[0_0_.3rem_#00000013] p-2 px-3 grid items-center grid-cols-[1fr_auto_1fr] text-slate-700"
          >
            <div className="grid place-items-center">
              <div className="bg-orange-50 rounded-full w-fit p-2">
                <img
                  className="w-12 h-12"
                  src={`https://avatars.dicebear.com/api/male/${due.sender.id}.svg`}
                />
              </div>

              <p className="mt-1 text-center line-clamp-1">{due.sender.name}</p>
            </div>

            <div className="grid place-items-center">
              <p className="text-sm"> Will give </p>
              <div className="flex items-center py-2">
                <BsDash className="w-[2rem] h-[2rem] my-[-2rem]" />
                <span className={`font-semibold text-indigo-500`}>
                  {due.amount}
                </span>
                <BsArrowRight className="w-[2rem] h-[2rem] my-[-3rem]" />
              </div>
              {isAdmin && !due.receiver.email ? (
                <button
                  onClick={() =>
                    setSettleUpState({
                      open: true,
                      data: {
                        groupId,
                        senderId: due.sender.id,
                        receiverId: due.receiver.id,
                        senderName: due.sender.name,
                        amount: due.amount,
                      },
                    })
                  }
                  className="px-3 py-1 bg-indigo-500 text-white text-sm rounded"
                >
                  Settle up
                </button>
              ) : null}
            </div>

            <div className="grid place-items-center">
              <div className="bg-orange-50 rounded-full w-fit p-2">
                <img
                  className="w-12 h-12"
                  src={`https://avatars.dicebear.com/api/male/${due.receiver.id}.svg`}
                />
              </div>

              <p className="mt-1 text-center line-clamp-1">
                {due.receiver.name}
              </p>
            </div>
          </div>
        );
      })}

      <h3 className="text-indigo-500 text-center font-semibold mt-3">
        {"Other's"} settlments
      </h3>
      {!otherDues.length ? (
        <p className="text-center text-slate-700 pb-5">
          {" "}
          Nobody have any settlements{" "}
        </p>
      ) : null}

      {otherDues.map((due) => {
        return (
          <div
            key={due.sender.id + due.receiver.id}
            className="shadow-[0_0_.3rem_#00000013] p-2 px-3 grid items-center grid-cols-[1fr_auto_1fr] text-slate-700"
          >
            <div className="grid place-items-center">
              <div className="bg-orange-50 rounded-full w-fit p-2">
                <img
                  className="w-12 h-12"
                  src={`https://avatars.dicebear.com/api/male/${due.sender.id}.svg`}
                />
              </div>

              <p className="mt-1 text-center line-clamp-1">{due.sender.name}</p>
            </div>

            <div className="grid place-items-center">
              <p className="text-sm"> Will give </p>
              <div className="flex items-center py-2">
                <BsDash className="w-[2rem] h-[2rem] my-[-2rem]" />
                <span className="font-semibold text-indigo-500">
                  {due.amount}
                </span>
                <BsArrowRight className="w-[2rem] h-[2rem] my-[-3rem]" />
              </div>
            </div>

            <div className="grid place-items-center">
              <div className="bg-orange-50 rounded-full w-fit p-2">
                <img
                  className="w-12 h-12"
                  src={`https://avatars.dicebear.com/api/male/${due.receiver.id}.svg`}
                />
              </div>

              <p className="mt-1 text-center line-clamp-1">
                {due.receiver.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
