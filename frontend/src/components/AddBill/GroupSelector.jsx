export default function GroupSelector({ useIsGroupsOpen, useCurrentGroup, data }) {
  
  const [isGroupOpen, setIsGroupOpen] = useIsGroupsOpen;
  const [currentGroup, setCurrentGroup] = useCurrentGroup;

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
      <div
        
        className={`transition-all absolute right-0 top-[100%]  border border-t-0 rounded-b-lg w-[calc(100%_+_2px)] mx-[-1px] bg-white z-10 overflow-y-scroll ${
          isGroupOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {data?.map((el, i) => {
          return (
            <>
              <div 
              onClick={() => {
              setCurrentGroup(el)
              setIsGroupOpen(false)}
              }
              className={`p-1 flex items-center ${el.id === currentGroup.id ? "bg-orange-50" : ""}`}>
                <div className="p-1.5  rounded-full">
                  <img className=" h-5 w-5" src={profileImage(el)}/>
                </div>
                <p className="text-slate-800 line-clamp-1 h-6 text-left">
                  {el.name}
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
