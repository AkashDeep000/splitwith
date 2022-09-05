import { useCookies } from "react-cookie";
import { createGroup } from "@/helper/apiHelper/groupApi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import Spinner from "@/components/utils/Spinner";
import { HiClipboardCopy, HiClipboardCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function Invite({ groupId, useInviteOpen }) {
  const [isInviteOpen, setIsInviteOpen] = useInviteOpen;
  const [cookies] = useCookies(["accessToken"]);
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div
      className={`grid px-8 place-items-center backdrop-blur-sm bg-slate-400/20 w-full z-10 overflow-y-auto ${
        isInviteOpen ? "fixed inset-0" : "hidden"
      }`}
    >
      <div className="w-full p-4 max-w-[25rem] overflow-x-auto bg-white">
        <div className="grid grid-cols-[1fr_auto]">
          <p className="text-left mb-3 text-indigo-500 font-semibold font-ubuntu py-1">
            Add new group member
          </p>

          <IoClose
            onClick={() => setIsInviteOpen(false)}
            className="text-indigo-500 w-7 h-7"
          />
        </div>
        <div className="text-center">
          <p className="p-3">Share this link to invite new member</p>
          <div className="p-2 m-3 bg-gray-100 overflow-x-auto">
            {import.meta.env.VITE_APP_URL}/invite/{groupId}
          </div>
          <button className="bg-indigo-500 text-white px-3 py-1 rounded my-3">
            <CopyToClipboard
              className="text-center"
              text={`${import.meta.env.VITE_APP_URL}/invite/${groupId}`}
              onCopy={() => setIsCopied(true)}
            >
              <span>
                {isCopied ? (
                  <div className="flex">
                    <HiClipboardCheck className="w-5 h-5" />
                    <p>Copied</p>
                  </div>
                ) : (
                  <div className="flex">
                    <HiClipboardCopy className="w-5 h-5" />
                    Copy
                  </div>
                )}
              </span>
            </CopyToClipboard>
          </button>
        </div>
      </div>
    </div>
  );
}
