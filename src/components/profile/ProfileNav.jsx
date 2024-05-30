import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { SiShopee } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import api from "../../api/api";
import { resetUser } from "../../store/reducers/authReducer";
import { resetCount } from "../../store/reducers/cartReducer";

const ProfileNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");
      dispatch(resetUser());
      dispatch(resetCount());
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="w-3/12 md:w-full h-[100%] shadow-lg">
      <div className="py-3 w-full  bg-[#fff] rounded-md">
        <ul className="flex flex-col h-[100%]  md:flex-row justify-between items-start text-slate-600 font-bold ">
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2 transition-all duration-200 ">
            <NavLink
              to="/dashboard"
              className="flex items-center justify-start gap-3 py-1 "
            >
              <span>
                <RxDashboard size={20} />
              </span>
              <span className="md:hidden">Dashboard</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200 ">
            <NavLink
              to="/dashboard/my-orders"
              className="flex items-center justify-start gap-3 py-1"
            >
              <span>
                <SiShopee size={20} />
              </span>
              <span className="md:hidden">My Orders</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 transition-all duration-200">
            <NavLink
              to="/dashboard/my-wishlist"
              className="flex items-center justify-start gap-3 py-1"
            >
              <span>
                <IoHeartOutline size={20} />
              </span>
              <span className="md:hidden">Wishlist</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <NavLink
              to="/dashboard/chat"
              className="flex items-center justify-start gap-3 py-1"
            >
              <span>
                <IoChatbubblesOutline size={20} />
              </span>
              <span className="md:hidden">Chat</span>
            </NavLink>
          </li>

          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <button
              onClick={handleLogout}
              className="flex items-center justify-start gap-3 py-1"
            >
              <span>
                <AiOutlineLogout size={20} />
              </span>
              <span className="md:hidden">Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNav;
