import DashboardHeader from "@/components/DashboardHeader";
import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import AddBill from "@/components/AddBill";

function Dashboard() {
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.accessToken) {
      navigate("/login");
    }
  }, [cookies.accessToken]);

  return (
    <>
      <DashboardHeader />
      <div className="md:grid md:grid-cols-[auto_1fr] md:justify-items-center">
        <SideBar />
        <div className="w-full max-w-[42rem] min-h-screen">
          <Outlet />
          <div className="h-16 md:h-4"></div>
        </div>
      </div>
            <AddBill />
      <BottomBar />
    </>
  );
}

export default Dashboard;
