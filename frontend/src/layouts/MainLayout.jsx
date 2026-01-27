import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components";

function MainLayout() {
  return (
    <div className="min-h-screen pb-[90px] bg-white">
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
