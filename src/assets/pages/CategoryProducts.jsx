import React, { useEffect, useState } from "react";
import { BreadCrumbs, Cart, Pagination } from "../components";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { Products } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import {
  getProductsPriceRange,
  queryProduct,
} from "../store/reducers/homeReducer";
import { useSearchParams } from "react-router-dom";

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCategory = searchParams.get("category");

  const {
    latestProduct,
    priceRange,
    categories,
    products,
    totalProducts,
    parPage,
    isLoading,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getProductsPriceRange());
  }, [dispatch]);

  useEffect(() => {
    setValue({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);

  const [filter, setFilter] = useState(true);
  const [rating, setRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(5);
  // **

  const [value, setValue] = useState({
    values: [priceRange.low, priceRange.high],
  });

  // product querying
  useEffect(() => {
    dispatch(
      queryProduct({
        low: value.values[0] || "",
        high: value.values[1] || "",
        searchCategory,
        rating,
        sortPrice,
        currentPage,
      })
    );
  }, [value.values, searchCategory, rating, sortPrice, currentPage, dispatch]);

  const resetFilter = () => {
    setRating("");
    setSortPrice("");
    setCurrentPage(1);
    setValue({ values: [priceRange.low, priceRange.high] });
  };

  return (
    <>
      <div className="bg-[url('http://localhost:3000/images/banner/shop.png')]  h-[220px] mt-6 bg-cover bg-no-repeat bg-left">
        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-black">
          <h2 className="text-3xl font-bold">Category Page</h2>
          <div className="flex justify-center items-center gap-2 text-2xl w-full">
            <BreadCrumbs
              from="/"
              fromPage="Home"
              to="/shop"
              iconSize={27}
              toPage={searchCategory}
              iconColor="black"
            />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-gray-400 text-white"
            >
              Filter Product
            </button>
          </div>
          <div className="w-full flex flex-wrap">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-7 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              }`}
            >
              <div className="py-2 flex flex-col gap-5">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Price
                </h2>

                <Range
                  step={1}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={value.values}
                  onChange={(values) => setValue({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[3px] bg-slate-400 rounded-full cursor-pointer"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      className="w-[12px] cursor-default h-[12px] bg-[#059473] rounded-full"
                      {...props}
                    />
                  )}
                />
                <div>
                  <span className="text-slate-800 font-bold text-lg flex justify-between">
                    <span className="block">
                      ${Math.floor(value.values[0])}
                    </span>
                    <span className="block">
                      ${Math.floor(value.values[1])}
                    </span>
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="py-3 flex flex-col gap-4">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Rating{" "}
                </h2>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setRating(5)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(4)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(3)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(2)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>

                  <div
                    onClick={() => setRating(1)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                    <span>
                      <CiStar />{" "}
                    </span>
                  </div>
                </div>
              </div>
              {/* latest */}

              <div className="py-5 flex flex-col gap-4 md:hidden">
                <Products title="New Arrivals" products={latestProduct} />
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600">
                    {totalProducts === 0
                      ? "No products found"
                      : `${totalProducts} ${
                          totalProducts === 1 ? "Product" : "Products"
                        }`}
                  </h2>

                  <div className="flex justify-center items-start gap-3">
                    <button
                      onClick={resetFilter}
                      className="py-[2px] px-2 border outline-0 bg-slate-300 rounded-sm text-slate-600 font-semibold"
                    >
                      Clear Filter
                    </button>

                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      className="p-1 border outline-0 text-slate-600 font-semibold"
                      name=""
                      id=""
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High Price</option>
                      <option value="high-to-low">High to Low Price </option>
                    </select>
                  </div>
                </div>

                {/* Products */}
                {/* <div className="grid pb-8 gap-4 grid-cols-4 md:grid-cols-3 md:gap-3 md-lg:grid-cols-2  sm:grid-cols-1"> */}
                {isLoading ? (
                  <div className="flex flex-wrap justify-center items-center mt-[250px]">
                    <GridLoader margin={3} size={39} />
                  </div>
                ) : (
                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {products.map((product, index) => (
                      <Cart product={product} index={index} />
                    ))}
                  </div>
                )}
                <div className="flex justify-end">
                  {totalProducts > parPage && (
                    <Pagination
                      pageNumber={currentPage}
                      setPageNumber={setCurrentPage}
                      totalItem={totalProducts}
                      pages={pages}
                      showItem={2}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
