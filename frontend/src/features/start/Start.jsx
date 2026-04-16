import React from "react";
import femaleFace from "../../assets/startPageAssets/ToyFaces_Tansparent_BG_49.png";
import maleFace from "../../assets/startPageAssets/ToyFaces_Tansparent_BG_29.png";
import { Button } from "../../components/index.js";
import { useNavigate } from "react-router-dom";

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

          <p className="text-5xl text-white font-nunito font-[900] ml-2 w-3/5">
            Food for Everyone
          </p>
        </div>

        {/* Characters Section */}
        <div className="flex w-full items-end mt-auto z-10">
          <img src={femaleFace} className="w-[358px] h-[434px] z-50" />

          <img
            src={maleFace}
            className="w-[225px] h-[348px] -translate-x-25 mb-4 z-0"
          />
        </div>

        {/* Bottom Button */}
        <Button
          onClick={() => navigate("/auth")}
          className="bg-white text-[#FF460A] mx-auto mb-12 z-20"
        >
          Get Started
        </Button>

        {/* Bottom Blur Gradient (Method 1) */}
        <div
          className="
      absolute bottom-0 left-0 
      w-full h-40
      bg-gradient-to-t
      from-[#FF4B3A]
      via-[#FF4B3A]/50
      to-transparent
      backdrop-blur-md
      z-10
      pointer-events-none
    "
        />
      </div>
    </>
  );
}

export default Start;
