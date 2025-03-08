import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {
  BreadCrumbs,
  Cart,
  ProductDescription,
  ProductReviews,
  Rating,
} from "../components";
import "react-multi-carousel/lib/styles.css";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../store/reducers/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoBagAddSharp } from "react-icons/io5";
import { ImageSlider } from "../components";
import { addRemoveCart } from "../store/reducers/cartReducer";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const [state, setState] = useState("reviews");
  const [qty, setQty] = useState(1);
  const [alarm, setAlarm] = useState(false);
  const {
    product,
    categoryRelatedProducts,
    totalReviews,
    sellerRelatedProducts,
  } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.customerAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProductDetail(slug));
  }, [dispatch, slug]);

  const stock = 2;

  const increment = () => {
    if (qty >= product.stock) {
      setAlarm(true);
    } else {
      setQty(qty + 1);
    }
  };
  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      setAlarm(false);
    }
  };

  const handleAddToCart = (id) => {
    if (userInfo) {
      dispatch(
        addRemoveCart({
          userId: userInfo?.id,
          quantity: qty,
          productId: product?._id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const buyNow = () => {
    if (!userInfo) {
      toast.error('Login first')
      navigate("/login");
      return;
    }
  
    let price = product?.discount !== 0 
      ? product?.price - Math.floor((product?.price * product?.discount) / 100) 
      : product?.price;
  
    const obj = [
      {
        sellerId: product?.sellerId,
        shopName: product?.shopName,
        price: qty * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            qty,
            productInfo: product,
          },
        ],
      },
    ];
  
    navigate("/shipping", {
      state: {
        products: obj,
        price: price * qty,
        shippingFee: 10,
        items: qty,
      },
    });
  };

  // const buyNow = (userInfo) => {
  //   console.log(userInfo.id)
  //   let price = 0;
  //   if(!userInfo.id) {
  //     navigate('/login')
  //   } else if (product.discount !== 0) {
  //     price =
  //       product?.price - Math.floor((product?.price * product?.discount) / 100);
  //   } else {
  //     price = product?.price;
  //   }

  //   const obj = [
  //     {
  //       sellerId: product?.sellerId,
  //       shopName: product?.shopName,
  //       price: qty * (price - Math.floor((price * 5) / 100)),
  //       products: [
  //         {
  //           qty,
  //           productInfo: product,
  //         },
  //       ],
  //     },
  //   ];
  //   navigate("/shipping", {
  //     state: {
  //       products: obj,
  //       price: price * qty,
  //       shippingFee: 10,
  //       items: qty,
  //     },
  //   });
  // };

  return (
    <div className="overflow-y-hidden">
      <div className=" bg-slate-200 md:min-w-[320px] h-[120px] mt-6 bg-cover bg-no-repeat bg-left">
        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-black">
          <div className="flex justify-center md:items-start md:justify-start items-center gap-2 md:text-[12px] text-2xl w-full">
            <BreadCrumbs
              from="/"
              fromPage={product?.category}
              to="/shop"
              iconSize={18}
              toPage={product?.name}
              iconColor="black"
            />
          </div>
        </div>
      </div>

      <div className="w-full py-4 md:w-[320px] sm:w-[90%] lg:w-[90%] mt-3 h-full mx-auto">
        <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
          <div className="">
            <ImageSlider images={product?.images} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-3xl md:text-[15px] capitalize text-slate-400 font-bold">
              <h2>{product?.name}</h2>
            </div>

            {/* rating */}
            <div className="flex justify-start items-center gap-4">
              <div className="flex text-xl">
                <Rating ratings={product?.rating} />
              </div>
              <span>({totalReviews} reviews)</span>
            </div>

            {/* product price */}
            <div className="text-2xl md:text-[13px] text-red-600 font-bold flex gap-3 md:flex-col">
              {product?.discount !== 0 ? (
                <div className="flex flex-row gap-2 items-center">
                  <h2>
                    Price: $
                    <span className="line-through ">{product?.price}</span>
                  </h2>
                  <h2 className="flex items-center gap-2 justify-between">
                    $
                    {product?.price -
                      Math.floor(
                        (product?.price * product?.discount) / 100
                      )}{" "}
                    <RiDiscountPercentFill
                      color="green"
                      size={28}
                      title="discount"
                    />
                    <span className="text-blue-500">
                      (-{product?.discount}%)
                    </span>
                    <FaArrowTrendDown
                      color="red"
                      title="price decreased"
                      size={28}
                    />
                  </h2>
                </div>
              ) : (
                <>
                  <h2>Price: ${product?.price}</h2>
                </>
              )}
            </div>

            {/* description */}

            <div className="text-black md:text-[13px] h-[180px] bg-[#ecf4f576] p-2 rounded-md shadow-md">
              <p>
                {product?.description?.substring(0, 250)}
                {"..."}
              </p>
            </div>
            <span className="h-[30px] text-[16px] text-red-600 font-bold flex gap-3 my-2 ">
              {alarm ? <p>We have only {product?.stock} items</p> : ""}
            </span>

            {/* actions */}

            <div className="flex gap-3 pb-10 border-b items-center">
              {product?.stock ? (
                <div className="flex flex-col items-start">
                  <div className="flex gap-3">
                    <div className="flex h-[50px] flex-row md:flex-col md:items-start justify-center items-center text-xl gap-1">
                      <div className="flex justify-center   items-center gap-2">
                        <button
                          onClick={decrement}
                          className="px-4 py-3 inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md "
                        >
                          <BiSolidDownArrow color="blue" size={18} />
                        </button>
                        <span className="w-[55px]  inline-flex items-center justify-center py-[11px] bg-gray-200  text-gray-800 text-sm font-medium rounded-md">
                          {" "}
                          {qty}
                        </span>
                        <button
                          title={alarm ? `Out of stock` : ``}
                          onClick={increment}
                          className={` ${
                            alarm ? "cursor-not-allowed" : ""
                          } px-4 py-3 inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md`}
                        >
                          <BiSolidUpArrow color="blue" size={18} />
                        </button>
                      </div>
                      <div className="justify-center items-center gap-2">
                        {userInfo ? (
                          <button
                            onClick={handleAddToCart}
                            className="inline-flex items-center px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
                          >
                            <IoBagAddSharp size={18} />
                          </button>
                        ) : (
                          <Link
                            to="/login"
                            className=" w-[170px] rounded-md md:text-[14px]  bg-slate-300 py-2 flex items-center justify-center gap-2"
                          >
                            Login To Add Cart
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="flex h-[50px] justify-center items-center text-xl gap-1"></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 h-[41px]">
                  <div className="flex shadow-lg  h-full justify-center items-center text-xl gap-1">
                    <h2 className="px-3 text-red-600 font-bold">
                      Out of stock
                    </h2>
                  </div>
                </div>
              )}
              <div className="flex h-[50px] justify-center items-center text-xl gap-1">
                <button className=" inline-flex items-center px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                  <IoHeart size={18} color="red" title="add to cart" />
                </button>
              </div>
            </div>

            {/* availability */}

            <div className="flex gap-4 py-5 border-b">
              <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                <h2 className="flex items-center justify-start gap-1">
                  <span> Available</span>
                  <MdEventAvailable />
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                <span
                  className={`text-${stock ? "green" : "red"} font-semibold`}
                >
                  {product?.stock
                    ? `In Stock: (${product?.stock})`
                    : `Out Of Stock: (${product?.stock})`}
                </span>
              </div>
            </div>

            <div className="flex gap-4 py-5 border-b">
              <div className="flex h-[50px] justify-center items-center text-xl gap-1">
                <button
                  onClick={buyNow}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-4 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-12">
        <div className="flex flex-wrap">
          <div className="w-[79%] md-lg::w-full">
            <div className="pr-4 md-lg:pr-0">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setState("reviews")}
                  className={`inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-[#646765] hover:text-white text-gray-800 text-sm font-medium rounded-md ${
                    state === "reviews"
                      ? "bg-[#646765] text-white"
                      : "bg-slate-200 text-black"
                  }  `}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setState("description")}
                  className={`inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-[#646765] hover:text-white text-sm font-medium rounded-md ${
                    state === "description"
                      ? "bg-[#646765] text-white"
                      : "bg-slate-200 text-black"
                  }  `}
                >
                  Description
                </button>
              </div>

              <div>
                {state === "reviews" ? (
                  <ProductReviews product={product} />
                ) : (
                  <ProductDescription product={product} />
                )}
              </div>
            </div>
          </div>
          {/* related products from shop */}
          <div className="w-[21%] md-lg:w-full mt-4">
            {sellerRelatedProducts && (
              <div className="pl-4 md-lg:pl-0 ">
                <div className="px-3 py-2 text-slate-600 bg-slate-200 rounded-md">
                  <h2 className="font-bold ">
                    Products from{" "}
                    <span className="text-red-600">{product?.shopName}</span>{" "}
                    seller
                  </h2>
                </div>
                <div className="flex flex-col md:flex-wrap md:flex-row gap-5 mt-3 border p-3">
                  {sellerRelatedProducts ? (
                    sellerRelatedProducts?.map((product, index) => {
                      return (
                        <Cart product={product} index={index} key={index} />
                      );
                    })
                  ) : (
                    <h2>No products from this seller</h2>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* related products */}

      <div className="w-full py-5 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-12">
        <h2 className="text-2xl py-8  font-semibold text-blue-700">
          Related Products
        </h2>
        {/* swiper */}
        <div>
          <Swiper
            slidesPerView="auto"
            breakpoints={{
              1280: {
                slidesPerView: 4,
              },
              565: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={1}
            loop={true}
            pagination={{
              clickable: true,
              el: ".custom_bullet",
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {categoryRelatedProducts?.map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <Cart product={product} index={index} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="w-full flex justify-center items-center pty-10">
          <div className="custom_bullet justify-center !w-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
