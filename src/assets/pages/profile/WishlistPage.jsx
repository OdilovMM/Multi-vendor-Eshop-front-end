import React, { useEffect } from "react";
import { Rating } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMyWishlists,
  removeWishlist,
} from "../../store/reducers/cartReducer";
import {  AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import saleIcon from "../../assets/icon/icons8-sale.gif";
import { RxCross2 } from "react-icons/rx";

const WishlistPage = ({ product, index }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.customerAuth);
  const { wishlist } = useSelector(
    (state) => state.cart
  );
  

  useEffect(() => {
    dispatch(getAllMyWishlists(userInfo.id));
  }, [dispatch, userInfo]);

  return (
    <div className="bg-white shadow-lg p-2 gap-2 rounded-md w-full flex flex-row flex-wrap">
      {wishlist.length === 0 ? (
        <div className="min-h-[40vh] w-full flex flex-col items-center justify-center">
         

          <h2 className="mt-4 px-4 py-2 font-mono font-bold rounded-[15px]">
            You have not added any products to your wishlist yet.
          </h2>
          <Link to='/shop' className="bg-slate-400 mt-6 px-4 py-1 rounded-2xl text-yellow-50 font-mono font-bold">
            Go to Store
          </Link>
        </div>
      ) : (
        wishlist.map((product, ind) => {
          return (
            <div
              key={ind}
              className="w-[232px] h-[400px] flex flex-col justify-between md:w-[210px] overflow-hidden border-[0.5px] border-grey-200 md-lg:w-[290px] group  rounded-[6px] shadow-md  relative cursor-pointer"
            >
              <div className="relative h-[300px] overflow-hidden   ">
                <Link className=" h-full w-full   flex justify-center items-center transition-transform duration-500 transform scale-105 group-hover:scale-110">
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                {/* sale */}
                <div className="flex flex-col  absolute top-0 gap-3 ">
                  {product?.discount > 0 ? (
                    <>
                      <img src={saleIcon} alt="" />
                    </>
                  ) : (
                    <span className="bg-red-500 text-[14px] shadow-sm pl-2"></span>
                  )}

                  {product?.discount ? (
                    <span className="bg-black text-white px-2 shadow-sm text-[14px]">
                      -{product?.discount}%
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                {/* link */}
                <div className="absolute top-2 right-1 flex flex-col gap-2 transform translate-x-9  opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500">
                  <button
                    onClick={() => dispatch(removeWishlist(product._id))}
                    className="p-2 bg-white  hover:bg-pink-500 transition ease-in-out"
                  >
                    <RxCross2 color="black" size={22} />

                    {/* <AiOutlineHeart size={22} /> */}
                  </button>
                  <Link
                    to={`/product/details/${product?.slug}`}
                    className="p-2 bg-white  hover:bg-pink-500 transition ease-in-out"
                  >
                    <AiOutlineEye size={22} />
                  </Link>
                </div>

                {/* add cart */}
                <div
                  style={{
                    zIndex: "1",
                  }}
                  className="absolute  bottom-0 w-full transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500"
                >
                  <button
                    // onClick={() => handleAddToCart(product?._id)}
                    className="flex h-[40px] bg-[#5b5555] hover:bg-[#141111] transition duration-900 ease-in-out w-full flex-row gap-2 items-center justify-center"
                  >
                    <span className="text-white font-Poppins">Add To Cart</span>
                  </button>
                </div>
              </div>
              {/* bottom info */}
              <div className="flex flex-col h-[100px] overflow-hidden bg-[#d0dae3] ">
                <div className="px-3 py-3">
                  <h2>{product?.name.slice(0, 10)}...</h2>
                  <div className="flex flex-row items-center justify-between">
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      $ {product?.price}
                      <span className="pl-2 line-through text-red-600">
                        {product?.discount > 0 &&
                          product?.price +
                            Math.floor(
                              (product.price * product.discount) / 100
                            )}{" "}
                      </span>
                    </p>
                    <div className="flex ">
                      <Rating ratings={product?.rating} />
                    </div>
                  </div>
                  <div className="flex  justify-between items-center">
                    <h2 className="text-red-600 font-semibold text-[13px]">
                      {product?.brand}
                    </h2>
                    <h2 className="text-blue-600 font-semibold">
                      {product?.shopName}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default WishlistPage;
