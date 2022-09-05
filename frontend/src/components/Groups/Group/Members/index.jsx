import useUserStore from "@/store/userStore";

export default function Members({ data }) {
  const user = useUserStore((state) => state.user);
  const floatify = (number) => {
    return parseFloat(number.toFixed(10));
  };
  return (
    <div className="grid gap-4">
      {data.map((member) => {
        const balence = floatify(member.give || 0 - member.take || 0);
        return (
          <div
            key={member.id}
            className="shadow-[0_0_.3rem_#00000013] p-2 px-3 grid items-center grid-cols-[1fr_auto] text-slate-700"
          >
            <div className="flex gap-4 items-center">
              <div className="bg-orange-50 rounded-full w-fit p-2">
                <img
                  className="w-12 h-12"
                  src={`https://avatars.dicebear.com/api/male/${member.id}.svg`}
                />
              </div>
              <div>
                <p className="text-slate-700">{member.name}</p>
                <p className="text-slate-600 text-sm">{member.email}</p>
              </div>
            </div>

            <p
              className={`pr-6 ${
                balence < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {balence}
            </p>
          </div>
        );
      })}
    </div>
  );
}
