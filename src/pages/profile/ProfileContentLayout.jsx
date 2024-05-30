import React from "react";
import { Outlet } from "react-router-dom";

const ProfileContentLayout = () => {
  return (
    <div className="w-9/12 md:w-full ">
      <Outlet />
    </div>
  );
};

export default ProfileContentLayout;
