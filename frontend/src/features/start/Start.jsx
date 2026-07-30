import React from "react";
import { Button } from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Start() {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative w-full h-screen flex flex-col bg-[#FF4B3A] overflow-hidden">
        <div className="flex flex-col w-full p-6 gap-6 z-10">
          <img
            src="/chefHat.png"
            className="bg-white w-[80px] ml-2 rounded-full"
          />

          <p className="text-5xl text-white font-nunito font-[900]  lg:w-fit w-full">
            Welcome to Foodz
          </p>
        </div>

        <div className="lg:w-1/2 mx-auto my-auto md:h-1/2">
          <DotLottieReact
            className="size-full"
            src="https://lottie.host/13926887-be72-43e9-b066-871f395d4552/E6aH9np0FA.lottie"
            loop
            autoplay
          />
        </div>

        <Button
          onClick={() => navigate("/auth")}
          className="bg-[#fff] mx-auto my-auto mb-12 z-20"
          style={{
            color: "#FA4A0C",
          }}
        >
          Get Started
        </Button>
      </div>
    </>
  );
}

export default Start;
