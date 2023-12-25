import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../widgets";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      {/* <Header /> */}
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="flex justify-center items-center h-full w-full bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
