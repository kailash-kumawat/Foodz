import React, { useState } from "react";
import { Login, Signup } from "./index";
// next : fix scroll issue of authpage
function AuthPage() {
  const [activeTab, setactiveTab] = useState("login");
  return (
    <div className="min-h-screen w-full fixed bg-[#EDEDED]">
      <div className="h-[200px] flex w-full justify-center px-6 items-center bg-[#FFFFFF]">
        <img src="/chefHat.png" className="h-full" />
      </div>
      <div className="flex justify-center gap-36 rounded-b-3xl bg-[#FFFFFF]">
        <button
          onClick={() => setactiveTab("login")}
          className={`px-6 p-4 text-center ${
            activeTab === "login"
              ? "border-orange-500 font-semibold border-b-2"
              : "text-gray-400"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setactiveTab("signup")}
          className={`px-6 p-4 text-center ${
            activeTab === "signup"
              ? "border-orange-500 border-b-2 font-semibold"
              : "text-gray-400"
          }`}
        >
          Sign-up
        </button>
      </div>
      <div className="p-6 ">
        {activeTab === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default AuthPage;
