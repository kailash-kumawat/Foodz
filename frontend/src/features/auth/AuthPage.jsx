import React, { useState } from "react";
import { Login, Signup } from "./index";

function AuthPage() {
  const [activeTab, setactiveTab] = useState("login");
  return (
    <div className="min-h-screen w-2xl">
      {/* <div className="w-[414px] h-[200px] left-0 top-[-15px] bg-[#FFFFFF] rounded-2xl"> */}
      <div className="flex justify-end items-center">
        <button
          onClick={() => setactiveTab("login")}
          className={`flex-1 p-4 text-center ${
            activeTab === "login"
              ? "border-b-2 border-orange-500 font-semibold"
              : "text-gray-400"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setactiveTab("signup")}
          className={`flex-1 p-4 text-center ${
            activeTab === "signup"
              ? "border-b-2 border-orange-500 font-semibold"
              : "text-gray-400"
          }`}
        >
          Sign-up
        </button>
      </div>
      <div className="p-6">
        {activeTab === "login" ? <Login /> : <Signup />}
      </div>
      {/* </div> */}
    </div>
  );
}

export default AuthPage;
