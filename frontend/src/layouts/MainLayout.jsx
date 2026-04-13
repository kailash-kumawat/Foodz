import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, HomeHeader } from "../components";
import Sidebar from "../features/home/Sidebar";

function MainLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="pb-[90px] bg-white">
      <HomeHeader
        className="px-6 py-8"
        onProfileClick={() => setOpenSidebar(true)}
      />
      <Outlet />
      <Sidebar isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />
      <Footer isOpen={openSidebar} />
    </div>
  );
}

export default MainLayout;
