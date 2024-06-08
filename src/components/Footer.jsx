import { Link } from "react-router-dom";
import { FaFacebookF, FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700">
      <div className="w-[85%] flex text-white flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold">Address</h2>
            <ul className="flex flex-col gap-2 text-white">
              <li>Address : 150100, Fergana, Uzbekistan</li>
              <li>Phone : +998905329914</li>
              <li>Email : dssrinman@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2">Usefull Links </h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-white text-sm font-semibold">
                  <li>
                    <Link>About Us </Link>
                  </li>

                  <li>
                    <Link>Privacy Policy </Link>
                  </li>
                  <li>
                    <Link>Blogs </Link>
                  </li>
                </ul>

                <ul className="flex flex-col gap-2 text-slate-600 text-sm font-semibold">
                  <li className="px-2 py-1 bg-slate-300 rounded-md">
                    <Link to="https://admin-dashboard-eshop.vercel.app/admin/login">
                      Go to Admin Dashboard{" "}
                    </Link>
                  </li>
                  <li className="px-2 py-1 bg-slate-300 rounded-md">
                    <Link to="https://admin-dashboard-eshop.vercel.app/login">
                      Go to Seller Dashboard{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Contact Us</h2>
            <div className="h-[40px]  relative">
              <ul className="flex justify-start items-center gap-4">
                <li>
                  <Link
                    className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                    to="https://github.com/OdilovMM"
                  >
                    <FaFacebookF color="black" size={22} />{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                    to="https://t.me/Makhmudovichk"
                  >
                    <FaTelegram color="black" size={22} />{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                    to="https://github.com/OdilovMM"
                  >
                    <FaLinkedin color="black" size={22} />{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                    to="https://github.com/OdilovMM"
                  >
                    <FaGithub size={22} color="black" />{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] flex flex-wrap justify-center items-center text-white mx-auto py-5 text-center">
        <span>Copiright @ 2024 All Rights Reserved </span>
      </div>
    </footer>
  );
};

export default Footer;
