import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/reducers/authReducer";
import { ScaleLoader } from "react-spinners";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, userInfo } = useSelector((state) => state.customerAuth);

  const [agree, setAgree] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(state));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else {
      return;
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <div className="min-w-screen h-full  py-9 my-5  flex items-center justify-center">
      <div className="w-[350px]  text-[#fffFFF] bg-[#ebf1f0] p-7 rounded-md shadow-md border border-blue-700">
        <h2 className="text-xl text-black mb-3 font-bold">Register</h2>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                onChange={handleInput}
                value={state.name}
                type="text"
                name="firstName"
                autoComplete="name"
                required
                className="appearance-none block w-full px-3 text-black  py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1">
              <input
                onChange={handleInput}
                value={state.name}
                type="text"
                name="lastName"
                autoComplete="name"
                required
                className="appearance-none block w-full px-3 text-black  py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

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
                value={state.email}
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
                value={state.password}
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

          <div className="flex items-center w-full gap-3 mb-3">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              onChange={() => setAgree(!agree)}
              className="w-4 h-4 text-blue-600 overflow-hidden "
            />
            <label htmlFor="checkbox" className="text-black">
              I agree privacy policy and terms
            </label>
          </div>

          <div>
            <button
              disabled={agree ? false : true}
              type="submit"
              className={` ${
                agree
                  ? "bg-blue-700 hover:bg-blue-600 transition-all duration-300 rounded-lg"
                  : "cursor-not-allowed"
              }  group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-blue-700  rounded-lg `}
            >
              {loader ? (
                <ScaleLoader color="#fff" height={22} width={5} radius={2} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          <div className="flex gap-4 text-black">
            <h4>Already have an account?</h4>
            <Link to="/login" className="text-blue-600 pl-2 ">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
