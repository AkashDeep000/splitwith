import useUserStore from "@/store/userStore";
import { Link } from "react-router-dom";

export default function TransactionsCard({ transaction }) {
  const user = useUserStore((state) => state.user);
  const getDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("default", {
      day: "numeric",
      month: "short",
    });
  };
  const floatify = (number) => {
    return parseFloat(number.toFixed(10));
  };
  const getMyBalChange = (transaction) => {
    const myCharge = transaction.paidFor.find((x) => x.id === user.id).amount;

    if (user.id === transaction.paidById) {
      return floatify(transaction.amount - myCharge);
    } else {
      return 0 - myCharge;
    }
  };
  const myBalChange = getMyBalChange(transaction);
  return (
    <Link to={`/dashboard/groups/${transaction.group.id}`}>
    <div className="bg-white rounded p-2.5 grid items-center grid-cols-[1fr_auto] text-slate-700">
      <div className="flex h-full">
        <div className="">
          <div className="bg-orange-50 rounded-full w-16 h-16 p-2">
            <img className="" src="/images/invoice.png" />
          </div>

          <p className="mt-1 text-center text-sm">
            {getDate(transaction.createdAt)}
          </p>
        </div>
        <div className="grid h-full items-center px-3">
          <p className="font-semibold text-sm text-slate-700 line-clamp-1">
            {transaction.group.name} ({transaction.title})
          </p>
          <p className="line-clamp-1 text-sm font-semibold text-indigo-500 font-ubuntu">
            ₹{transaction.amount}
          </p>
          <p className="line-clamp-1 text-sm">
            Paid by:{" "}
            <span className="text-indigo-500">
              {transaction.paidById === user?.id
                ? `You (${transaction.paidBy.name})`
                : transaction.paidBy.name}
            </span>
          </p>
        </div>
      </div>

      <div
        className={`${
          myBalChange < 0 ? "text-red-500" : "text-green-500"
        } pr-4 font-ubuntu`}
      >
        ₹{myBalChange > 0 ? myBalChange : 0 - myBalChange}
      </div>
    </div>
    </Link>
  );
}
