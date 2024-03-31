import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="h-[calc(100vh)] w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-richblack-500"></div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-richblack-900">
        <div className="py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
