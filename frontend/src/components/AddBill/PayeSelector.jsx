export default function MemberSelector({
  useIsPayeOpen,
  useCurrentMember,
  data,
  user,
}) {
  const [isPayeOpen, setIsPayeOpen] = useIsPayeOpen;
  const [currentMember, setCurrentMember] = useCurrentMember;

  return (
    <>
      <div
        className={`transition-all absolute right-0 top-[100%]  border border-t-0 rounded-b-lg w-[calc(100%_+_2px)] mx-[-1px] bg-white z-10 overflow-y-scroll ${
          isPayeOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {data?.map((el, i) => {
          return (
            <>
              <div
              key={el.id}
                onClick={() => {
                  setCurrentMember(el);
                  setIsPayeOpen(false);
                }}
                className={`p-1 flex items-center ${
                  el.id === currentMember.id ? "bg-orange-50" : ""
                }`}
              >
                <div className="p-1.5  rounded-full">
                  <img
                    className=" h-5 w-5"
                    src={
                      el.profileImg ||
                      `https://avatars.dicebear.com/api/male/${el.id}.svg`
                    }
                  />
                </div>
                <p className="text-slate-800 line-clamp-1 h-6 text-left">
                {el.id === user?.id
                  ? `You (${el.name})`
                  : el.name}
                </p>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </>
  );
}
