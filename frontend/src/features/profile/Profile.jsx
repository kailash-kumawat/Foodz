import React from "react";
import { BackButton } from "../../components/index.js";
import ProfileItem from "./ProfileItem";
import { Button } from "../../components/index.js";

function Profile() {
  return (
    <>
      <div className="flex justify-between p-6">
        <BackButton />
        <p className="text-2xl font-semibold mx-auto">Profile</p>
      </div>

      <div className="w-5/6 mx-auto lg:w-1/3 mt-5">
        <div className="flex justify-between w-full">
          <p className="text-lg font-semibold">Personal details</p>
          <p className="text-lg text-[#F47B0A] cursor-pointer">change</p>
        </div>

        <div className="flex gap-4 lg:justify-around bg-white rounded-[20px] mt-2 p-4">
          <div className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]">
            <img
              src="https://plus.unsplash.com/premium_photo-1731535536703-7ec9e7c4cb5e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile-photo"
              className="h-full w-full rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2 w-3/5">
            <p className="text-xl font-semibold">Marvis Kparobo</p>
            <p className="text-black/50">Dosamarvis@gmail.com</p>
            <hr className="border-t border-black/30" />
            <p className="text-black/50">+234 9011039271</p>
            <hr className="border-t border-black/30" />
            <p className="text-black/50">
              Km 5 refinery road oppsite re public road, effurun, delta state
            </p>
          </div>
        </div>
      </div>

      <ProfileItem title={"Orders"} path={"/orders"} />
      <ProfileItem title={"Pending reviews"} path={"/reviews"} />
      <ProfileItem title={"Faq"} path={"/faq"} />
      <ProfileItem title={"Help"} path={"/help"} />

      <div className="w-fit mx-auto my-6">
        <Button className="cursor-pointer">Logout</Button>
      </div>
    </>
  );
}

export default Profile;
