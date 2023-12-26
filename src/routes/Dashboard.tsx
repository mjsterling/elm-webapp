import { Outlet } from "react-router-dom";
import { Sidebar } from "../widgets";
import { useAuthHandler } from "../hooks/useAuthHandler";

const Dashboard = () => {
  useAuthHandler();
  return (
    <div className="flex flex-col w-full h-screen">
      {/* <Header /> */}
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="flex justify-center items-center h-full w-full bg-gray-100 pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
