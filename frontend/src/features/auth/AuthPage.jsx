import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function AuthPage() {
  const [activeTab, setactiveTab] = useState("login");
  return (
    <>
      <div className="flex justify-center w-full lg:w-1/3 -mt-5 rounded-4xl bg-white mx-auto">
        <div className="flex flex-col items-center gap-6 w-full">
          <img src="/chefHat.png" className="h-50" />
          <div className="flex justify-around w-full">
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
        </div>
      </div>
      <div className="p-6">
        {activeTab === "login" ? <Login /> : <Signup />}
      </div>
    </>
  );
}

export default AuthPage;
