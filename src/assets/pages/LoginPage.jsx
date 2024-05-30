import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { loginUserCustomer } from "../store/reducers/authReducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.customerAuth
  );

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    dispatch(loginUserCustomer(credentials));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else {
      return;
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="min-w-screen h-full py-9 my-5 bg-[#e5e1e1] flex items-center justify-center">
      <div className="w-[350px] text-[#fffFFF] bg-[#c1dcd6] shadow-lg p-7 rounded-md">
        <h2 className="text-xl mb-3 font-bold">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmitData}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                onChange={handleInput}
                value={credentials.email}
                type="email"
                name="email"
                autoComplete="email"
                required
                className="appearance-none block text-black w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                onChange={handleInput}
                value={credentials.password}
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full text-black  px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  color="black"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute  right-2 top-2 cursor-pointer"
                  size={25}
                  color="black"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div>
            <button
              disabled={loader ? true : false}
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              {loader ? (
                <ScaleLoader color="#fff" height={22} width={5} radius={2} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          <div className="flex gap-4 text-black">
            <h4>Do not have an account?</h4>
            <Link to="/register" className="text-blue-600 pl-2">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
