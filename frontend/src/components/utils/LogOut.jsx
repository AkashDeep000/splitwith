import { useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export default function LogOut(props) {
  const { className, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const logOutHandler = () => {
    removeCookie("accessToken", { path: "/" });
    navigate("/login");
  };
  const askConfirmation = () => {
    setIsOpen(true);
  };

  return (
    <button disabled={isOpen} className={className} onClick={askConfirmation}>
      {children}

      <div
        className={`grid px-8 place-items-center backdrop-blur bg-slate-400/10 w-full z-10 pb-[50%] ${
          isOpen ? "fixed inset-0" : "hidden"
        }`}
      >
        <div className="w-full p-4 max-w-[25rem] bg-white">
          <p className="text-left mb-3">Are you realy want to log out? </p>
          <div className="grid grid-flow-col gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white w-full bg-indigo-500 p-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={logOutHandler}
              className="text-white w-full bg-red-500 p-1 rounded"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}
