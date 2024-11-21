import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/navbar/MainNavbar";
import MainSidebar from "../components/sidebar/MainSidebar";

export default function MainLayout() {
  return (
    <div>
      <div className=" w-full min-h-screen flex flex-row gap-0 ">
        <div className=" w-1/6 min-h-screen">
          <div className=" sticky top-0 h-screen">
            <MainSidebar />
          </div>
        </div>
        <div className=" w-5/6 min-h-screen">
          <div className="w-full">
            <MainNavbar />
          </div>
          <div className=" h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
