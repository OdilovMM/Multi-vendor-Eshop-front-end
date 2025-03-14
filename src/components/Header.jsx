import React, { useEffect, useState } from 'react';
import { IoIosMail } from 'react-icons/io';
import { MdAddIcCall, MdFacebook } from 'react-icons/md';
import {
  FaTelegram,
  FaUserCircle,
  FaLinkedin,
  FaGithub,
  FaLock,
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoHeart } from 'react-icons/io5';
import { SiShopify } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../store/reducers/homeReducer';
import { getMyCart } from '../store/reducers/cartReducer';

const Header = () => {
  const [showBar, setShowBar] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.customerAuth);
  const { categories } = useSelector((state) => state.home);
  const { cardProductCount, wishlist_count } = useSelector(
    (state) => state.cart
  );

  // cardProductCount
  useEffect(() => {
    if (userInfo) {
      dispatch(getMyCart());
      dispatch(getAllCategories());
    }
  }, [dispatch, userInfo.id, userInfo]);

  const searchItem = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  const redirectCart = () => {
    if (userInfo) {
      navigate('/my-cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="w-full bg-white border-b-[1px] border-[#e3e4e6] pb-[26px]">
      {/* top */}
      <div className="header-top bg-[#233a95] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[35px]">
            <h2 className="text-white">
              <span>
                Due to the <strong>harsh weather</strong>, orders may be
                processed with a slight delay
              </span>
            </h2>
            <div>
              <div className="flex justify-center items-center gap-8">
                <ul className="flex justify-center items-center gap-4 text-black">
                  <li>
                    <Link to="https://github.com/OdilovMM">
                      <MdFacebook size={20} color="white" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://t.me/Makhmudovichk">
                      <FaTelegram size={20} color="white" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://github.com/OdilovMM">
                      <FaLinkedin size={20} color="white" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://github.com/OdilovMM">
                      <FaGithub size={20} color="white" />
                    </Link>
                  </li>
                </ul>

                {userInfo ? (
                  <>
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                      to="/dashboard"
                    >
                      <span>
                        {' '}
                        <FaUserCircle color="white" size={22} />{' '}
                      </span>
                      <span className="text-white">{userInfo?.firstName}</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                      to="/login"
                    >
                      <span>
                        {' '}
                        <FaLock color="white" />{' '}
                      </span>
                      <span className="text-white">Login</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}

      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-start">
                <Link to="/">
                  <h1 className="text-lg font-bold cursor-pointer">My Shop</h1>
                </Link>
                <div
                  onClick={() => setShowBar(false)}
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-500 border border-slate-400 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                >
                  <GiHamburgerMenu />
                </div>
              </div>
            </div>

            {/* Desktop Views */}
            <div className="md:lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-7 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === '/' ? 'text-[#059473]' : 'text-black'
                      }`}
                    >
                      home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className={`p-2 block ${
                        pathname === '/shop' ? 'text-[#059473]' : 'text-black'
                      }`}
                    >
                      shop
                    </Link>
                  </li>
                </ul>

                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div
                      onClick={() =>
                        navigate(userInfo ? '/dashboard/my-wishlist' : '/login')
                      }
                      className="relative flex justify-center hover:bg-[#bdc9c5] hover:text-white  items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl  text-green-500">
                        <IoHeart color="black" />
                      </span>
                      {wishlist_count > 0 && (
                        <div className="w-[20px]  h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                          {wishlist_count}
                        </div>
                      )}
                    </div>

                    <div
                      onClick={redirectCart}
                      className="relative flex hover:bg-[#bdc9c5] hover:text-white  justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-green-500">
                        <Link>
                          <SiShopify color="black" />
                        </Link>
                      </span>
                      {cardProductCount > 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                          {cardProductCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main menu  */}

      <div className="hidden md-lg:block z-[9999999]">
        <div
          onClick={() => setShowBar(true)}
          className={`fixed duration-300 transition-all ${
            showBar ? 'invisible' : 'visible'
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-300 fixed ${
            showBar ? '-left-[300px] top-0  z-[999]' : 'left-0 top-0 z-[999]'
          } overflow-y-auto bg-white h-screen py-6 px-8 z-[999]`}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <h1 className="text-lg font-bold cursor-pointer">My Shop</h1>
            </Link>

            {/* Mobile views */}
            <ul className="flex flex-col justify-start items-start text-sm font-bold uppercase ">
              <li>
                <Link
                  to="/"
                  className={`py-2 block ${
                    pathname === '/' ? 'text-[#059473]' : 'text-black'
                  }`}
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={`py-2 block ${
                    pathname === '/shop' ? 'text-[#059473]' : 'text-black'
                  }`}
                >
                  shop
                </Link>
              </li>
            </ul>
            {/* icons */}

            <div className="flex justify-start items-center gap-4 text-black">
              <Link to="https://github.com/OdilovMM">
                <MdFacebook size={18} />
              </Link>
              <Link to="https://github.com/OdilovMM">
                <FaTelegram size={18} />
              </Link>
              <Link to="https://github.com/OdilovMM">
                <FaLinkedin size={18} />
              </Link>
              <Link to="https://github.com/OdilovMM">
                <FaGithub size={18} />
              </Link>
            </div>

            <ul className="flex flex-col justify-start items-start gap-3 font-semibold text-black">
              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <IoIosMail color="blue" size={18} />
                </span>
                <span>dssrinman@gmail.com</span>
              </li>
              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <MdAddIcCall color="blue" size={18} />
                </span>
                <span>+(998) 90 532 99 14</span>
              </li>
            </ul>

            <div className="flex justify-center gap-5">
              <div
                onClick={() =>
                  navigate(userInfo ? '/dashboard/my-wishlist' : '/login')
                }
                className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
              >
                <span className="text-xl text-green-500">
                  <IoHeart color="black" />
                </span>
                {cardProductCount !== 0 && (
                  <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                    {cardProductCount}
                  </div>
                )}
              </div>

              <div
                onClick={redirectCart}
                className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
              >
                <span className="text-xl text-green-500">
                  <SiShopify color="black" />
                </span>
                <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                  {cardProductCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom header */}

      <div className="w-[85%] lg:w-[90%] mx-auto ">
        <div className="flex w-full flex-wrap items-center justify-between  md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full relative">
            <div className="">
              <button
                onClick={() => setShowCategory(!showCategory)}
                className="py-2 rounded-lg w-[160px] bg-[#4258af] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer"
              >
                All Categories
              </button>

              {showCategory && (
                <div className="w-full dropdown-scroll bg-white absolute top-[66px] border-[1px] border-[#e3e4e6] rounded-b-sm z-[88888] max-h-[450px] overflow-y-auto">
                  <ul className="flex flex-col items-start w-full mb-0">
                    {categories?.map((cat, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setShowCategory(!showCategory)}
                          to={`/products?category=${cat.name}`}
                          className="text-sm flex items-center justify-between gap-2 capitalize w-full h-full p-2"
                        >
                          <img
                            src={cat.image}
                            alt=""
                            className="h-[33px] w-[33px] rounded-full object-cover"
                          />
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* search */}
          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className="flex border rounded-lg py-1 items-center relative gap-5">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md-lg:hidden">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-[150px] text-slate-500 pl-2 font-semibold bg-transparent outline-0 border-none"
                      name="category"
                      id="category"
                    >
                      <option value="">Category</option>
                      {categories.map((ctg, ind) => (
                        <option key={ind} className='dropdown-scroll' value={ctg.name}>
                          {ctg.name}{' '}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    name="value"
                    id="value"
                    placeholder="What are you looking for..."
                    className="w-full  relative bg-transparent text-slate-500 outline-0 px-3 h-full"
                  />

                  <button
                    onClick={searchItem}
                    className="bg-blue-700 dropdown-scroll hover:bg-blue-600 transition-all duration-300 rounded-lg right-0 absolute px-4 py-1 font-semibold uppercase text-white"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/*  */}
              <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
