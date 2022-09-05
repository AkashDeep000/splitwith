import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useUserStore from "@/store/userStore";

import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function DashboardHeader() {
  const activeHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.activeHeaderTitle
  );
  const user = useUserStore((state) => state.user);

  return (
    <div className="z-50 px-2 py-1.5 bg-white flex items-center justify-between sticky top-0">
      <div className="leftSideContainer flex items-center gap-2">
        {activeHeaderTitle ? (
          <>
            <Link to={-1}>
              <button className="p-[0.2rem] bg-purple-200 rounded-xl border border-white ring-1 ring-purple-300 shadow shadow-purple-300">
                <IoIosArrowBack className="w-6 h-7 mr-1 text-gray-800" />
              </button>
            </Link>
            <h2 className="text-2xl text-indigo-500 font-poppins">
              {activeHeaderTitle}
            </h2>
          </>
        ) : (
          <>
            <img className="w-8 h-8" src="/images/logo.png" />
            <h2 className="text-2xl font-ubuntu text-indigo-500 py-[0.34rem]">
              SplitWith
            </h2>
          </>
        )}
      </div>

      <div className="rightSideContainer">
        <Link to="/dashboard/settings">
          <img
            className="w-11 h-11 p-[.15rem] rounded-full bg-gray-200"
            src={
              user.profileImg
                ? user.profileImg
                : `https://avatars.dicebear.com/api/male/${user.id}.svg?background=%23a7a6ff`
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
