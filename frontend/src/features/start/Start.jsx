import React from "react";
import femaleFace from "../../assets/startPageAssets/ToyFaces_Tansparent_BG_49.png";
import maleFace from "../../assets/startPageAssets/ToyFaces_Tansparent_BG_29.png";
import { Button } from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Start() {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative w-full h-screen flex flex-col bg-[#FF4B3A] overflow-hidden">
        {/* Top Section */}
        <div className="flex flex-col w-full p-6 gap-6 z-10">
          <img
            src="/chefHat.png"
            className="bg-white w-[80px] ml-2 rounded-full"
          />

          <p className="text-5xl text-white font-nunito font-[900]  lg:w-fit w-full">
            Welcome to Foodz
          </p>
        </div>

        {/* Characters Section */}
        {/* <div className="flex w-full items-end mt-auto z-10 lg:hidden">
          <img src={femaleFace} className="w-[358px] h-[434px] z-50" />

          <img
            src={maleFace}
            className="w-[225px] h-[348px] -translate-x-24 mb-4 z-0"
          />
        </div> */}

        <div className="lg:w-1/2 mx-auto my-auto md:h-1/2">
          {/* <p className="lg:w-fit lg:mx-auto lg:text-5xl lg:text-white lg:font-nunito lg:font-[900]">
            Welcome to Foodz!
          </p> */}

          <DotLottieReact
            className="size-full"
            src="https://lottie.host/13926887-be72-43e9-b066-871f395d4552/E6aH9np0FA.lottie"
            loop
            autoplay
          />
        </div>

        {/* Bottom Button */}
        <Button
          onClick={() => navigate("/auth")}
          className="bg-[#fff] mx-auto my-auto mb-12 z-20"
          style={{
            color: "#FA4A0C",
          }}
        >
          Get Started
        </Button>

        {/* Bottom Blur Gradient (Method 1) */}
        {/* <div
          className="absolute bottom-0 left-0 w-full h-60 backdrop-blur-md z-10 pointer-events-none lg:hidden"
          style={{
            maskImage: "linear-gradient(to top, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 90%, transparent 100%)",
          }}
        /> */}
      </div>
    </>
  );
}

export default Start;
