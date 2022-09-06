import useUserStore from "@/store/userStore";

export default function Bills({ data }) {
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
  const getMyBalChange = (bill) => {
    if (user.id === bill.paidById) {
      return floatify((bill.amount || 0) - (bill.myCharge || 0));
    } else {
      return 0 - bill.myCharge || 0;
    }
  };

  return (
    <div className="grid gap-4">
      {!data.length ? (
        <p className="text-slate-700 text-center pb-3">
          This group have no bill
        </p>
      ) : null}
      {data.map((bill) => {
        const myBalChange = getMyBalChange(bill);
        return (
          <div className="shadow-[0_0_.3rem_#00000013] p-2.5 grid items-center grid-cols-[1fr_auto] text-slate-700">
            <div className="flex h-full">
              <div>
                <div className="bg-orange-50 rounded-full w-16 h-16 p-2">
                  <img className="" src="/images/invoice.png" />
                </div>

                <p className="mt-1 text-sm text-center">
                  {getDate(bill.createdAt)}
                </p>
              </div>
              <div className="grid h-full items-center px-3">
                <p className="line-clamp-1 text-slate-700">{bill.title}</p>
                <p className="line-clamp-1 text-sm font-semibold text-indigo-500 font-ubuntu">
                  ₹{bill.amount}
                </p>
                <p className="line-clamp-1 text-sm">
                  Paid by:{" "}
                  <span className="text-indigo-500">
                    {bill.paidById === user?.id
                      ? `You (${bill.paidBy.name})`
                      : bill.paidBy.name}
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
        );
      })}
    </div>
  );
}
