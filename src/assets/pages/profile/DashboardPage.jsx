import React from "react";
import { ProfileNav } from "../../components";
import ProfileContentLayout from "./ProfileContentLayout";

const DashboardPage = () => {
  return (
    <div className="w-full bg-slate-300  mx-auto mt-3  flex flex-row  justify-center items-center">
      <div className="w-[85%]  my-5 gap-3 flex flex-row md:flex-col">
        <ProfileNav />
        <ProfileContentLayout />
      </div>
    </div>
  );
};

export default DashboardPage;
