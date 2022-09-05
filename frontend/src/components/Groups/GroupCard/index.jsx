import { Link } from "react-router-dom";

function GroupCard({ data }) {
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
    <Link to={`./${data.id}`}>
      <div className="rounded bg-white w-full p-1.5 grid grid-cols-[auto_1fr] items-center gap-2">
        <img
          className="bg-orange-50 w-20 p-4 rounded"
          src={profileImage(data)}
        />
        <div className="w-full">
          <p className="text-slate-700 font-semibold">{data.name}</p>
          <p className="text-slate-700 text-sm">
            total members: {data.memberIDs.length}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default GroupCard;
