import { useNavigate, NavLink } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { SiShopee } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  resetUser,
  logout,
} from "../../store/reducers/authReducer";
import { resetCount } from "../../store/reducers/cartReducer";


const ProfileNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(resetUser());
    dispatch(resetCount());
    navigate("/login");
   
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
              to="/dashboard/my-profile"
              className="flex items-center justify-start gap-3 py-1"
            >
              <span>
                <FaUserAlt size={20} />
              </span>
              <span className="md:hidden">Profile</span>
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
            <button
              onClick={handleLogout}
              className="flex items-center justify-start gap-3 py-1"
            >
              <span>
                <AiOutlineLogout size={20} />
              </span>
              <span className="md:hidden">Exit</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNav;
