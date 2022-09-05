import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { settleUp } from "@/helper/apiHelper/groupApi";
import Spinner from "@/components/utils/Spinner";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export default function Settle({ useSettleUpState }) {
  const [settleUpState, setSettleUpState] = useSettleUpState;

  const [cookies] = useCookies(["accessToken"]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");
  //const [formAamount, setFormAmount] = useState(amount);

  const {
    isLoading: isSettling,
    isError: isSettleError,
    isSuccess: isSettleSuccess,
    mutate: mutateSettle,
  } = useMutation(
    () => {
      return settleUp({
        token: cookies.accessToken,
        ...settleUpState.data,
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("groups");
        setSettleUpState({
          ...settleUpState,
          open: false
        })
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

  useEffect(() => {
    setErrorMsg("");
  }, [settleUpState]);
  const handleSettle = () => {
    mutateSettle();
  };

  return (
    <>
      <div
        className={`grid px-8 place-items-center backdrop-blur bg-slate-400/20 w-full z-100 pb-[50%] inset-0 ${
          settleUpState.open ? "fixed" : "hidden"
        }`}
      >
        <div className="w-full p-4 max-w-[25rem] bg-white">
          <p className="text-left mb-3">
            Are you got the payment of{" "}
            <span className="font-semibold text-indigo-500">
              {settleUpState.data.amount}
            </span>{" "}
            from{" "}
            <span className="font-semibold text-indigo-500">
              {settleUpState.data.senderName}
            </span>{" "}
            and want to settle?
          </p>

          {isSettleError && errorMsg ? (
            <div className="px-2 py-1.5 bg-red-50 text-red-400 border border-red-300 mb-3 text-sm">
              {errorMsg}
            </div>
          ) : null}

          <div className="grid grid-flow-col gap-2">
            <button
              onClick={() =>
                setSettleUpState({
                  ...settleUpState,
                  open: false,
                })
              }
              className="text-white w-full bg-red-500 p-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSettle}
              className="text-white w-full bg-indigo-500 p-1 rounded"
            >
              {isSettling ? (
                <p>
                  Settling...
                  <Spinner className="ml-2 w-5 h-5 text-indigo-200 animate-spin fill-white" />
                </p>
              ) : (
                "Settle Up"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
