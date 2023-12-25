import { Outlet, redirect } from "react-router-dom";
import { auth } from "../firestore";
import { useState } from "react";
import { Calendar, Header, Sidebar } from "../widgets";

export async function loader() {
  console.log(auth.currentUser);
  if (auth.currentUser === null) {
    return redirect("/login");
  }
  return null;
}

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="flex justify-center items-center h-full w-full">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
