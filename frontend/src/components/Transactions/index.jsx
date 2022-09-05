import { useState } from "react";

import TransactionsCard from "./TransactionsCard";
import { HiOutlineUserGroup, HiPlusSm } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { listTransactions } from "@/helper/apiHelper/userApi";

function Transactions() {
  const [cookies] = useCookies(["accessToken"]);

  const { data, isLoading, isError, error } = useQuery(["transactions"], () =>
    listTransactions({ token: cookies.accessToken })
  );
  if (isError) {
    console.log(error);
  }

  return (
    <div className="grid justify-items-center p-1">
      {isLoading ? "Loading..." : isError ? "Error" : ""}

      <div className="grid py-1.5 px-1.5 gap-4 w-full">
        {data?.length <= 0 ? (
          <div className="border border-2 border-dotted p-5 px-8 text-center text-slate-700">
            There is no transaction to show
          </div>
        ) : null}

        {data?.map((transaction) => (
          <TransactionsCard key={transaction?.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default Transactions;
