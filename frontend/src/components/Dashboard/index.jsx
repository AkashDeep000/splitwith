import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { listGroupsMinimal } from "@/helper/apiHelper/groupApi";
import { listTransactions } from "@/helper/apiHelper/userApi";
import { Link } from "react-router-dom";
import useUserStore from "@/store/userStore";
import TransactionsCard from "@/components/Transactions/TransactionsCard";
export default function Dashboard() {
  const [cookies] = useCookies(["accessToken"]);
  const user = useUserStore((state) => state.user);
  const {
    data: groups,
    isLoading: isGroupLoading,
    isError: isGroupError,
    error: groupsError,
  } = useQuery(["groups-minimal"], () =>
    listGroupsMinimal({ token: cookies.accessToken })
  );

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
    error: transactionsError,
  } = useQuery(["transactions"], () =>
    listTransactions({ token: cookies.accessToken })
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

  return (
    <>
      <div className="px-2 w-full py-2 overflow-x-scroll">
        <div className="p-4 w-full grid bg-white rounded-lg">
          <p className="text-gray-500 font-semibold font-ubuntu py-2">
            Hi {user?.name?.split(" ", 2)[0]}
          </p>
          <p className="text-gray-700 font-semibold mb-3">
            Simplify Bill Split
          </p>
          <div className="bg-orange-100 relative w-full aspect-[880/442]">
            <img
              className="border border-2 border-orange-50 absolute top-[-.5rem] right-[-.5rem] w-full"
              src="/images/simplify.jpg"
            />
          </div>
        </div>
        {isGroupLoading || isTransactionsLoading ? (
          <center className="py-4">Loading...</center>
        ) : isGroupError || isTransactionsError ? (
          <center className="py-4">Something went wrong</center>
        ) : (
          <>
            <div className="p-3 pt-6  text-gray-800 flex justify-between">
              <p className="font-semibold">Groups</p>
              <Link to="/dashboard/groups" className="">
                See All
              </Link>
            </div>
            <div className="grid grid-cols-3 px-.5 gap-2">
              {groups.map((group, index) => {
                if (index > 2) {
                  return null;
                }
                return (
                  <Link key={group.id} to={`/dashboard/groups/${group.id}`}>
                    <div className="bg-white rounded-lg p-[10%] text-center">
                      <div className="bg-orange-50 m-[15%] p-[15%] rounded-full">
                        <img className="w-full" src={profileImage(group)} />
                      </div>
                      <p className="line-clamp-1 text-slate-700 mb-3">
                        {group.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="p-3 pt-6  text-gray-800 flex justify-between">
              <p className="font-semibold">Recent Transactions</p>
              <Link to="/dashboard/transactions" className="">
                See All
              </Link>
            </div>
            <div className="grid gap-4">
              {transactions?.map((transaction, index) => {
                if (index > 4) {
                  return null;
                }
                return (
                  <TransactionsCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
