import React, { useEffect } from "react";
import { BreadCrumbs } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  getCustomerCartProducts,
  deleteProductFromCart,
  messageClear,
  incrementProductQuantity,
  decrementProductQuantity,
} from "./../store/reducers/cartReducer.js";
import toast from "react-hot-toast";
import emptyCart from "../assets/icon/empty-cart.png";

const AddedProductCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    card_products,
    price,
    shipping_fee,
    outofstock_products,
    buy_product_item,
    successMessage,
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.customerAuth);

  useEffect(() => {
    dispatch(getCustomerCartProducts(userInfo.id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(getCustomerCartProducts(userInfo.id));
    }
  }, [dispatch, successMessage, userInfo.id]);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: card_products,
        price: price,
        shippingFee: shipping_fee,
        items: buy_product_item,
      },
    });
  };

  const handleIncrement = (productQuantity, productStock, productId) => {
    const tempQuantity = productQuantity + 1;
    if (tempQuantity <= productStock) {
      dispatch(incrementProductQuantity(productId));
    }
  };
  const handleDecrement = (productQuantity, productId) => {
    const tempQuantity = productQuantity - 1;
    if (tempQuantity !== 0) {
      dispatch(decrementProductQuantity(productId));
    }
  };

  return (
    <>
      {/* BreadCrumbs */}
      <div className="bg-[url('http://localhost:3000/images/banner/shop.png')]  h-[220px] mt-6 bg-cover bg-no-repeat bg-left">
        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-black">
          <h2 className="text-3xl font-bold">My Cart Page</h2>
          <div className="flex justify-center items-center gap-2 text-2xl w-full">
            <BreadCrumbs
              from="/"
              fromPage="Home"
              to="/my-cart"
              iconSize={27}
              toPage="My Cart"
              iconColor="black"
            />
          </div>
        </div>
      </div>

      {/* main */}

      <div className="bg-[#e1e4e6a3] min-h-[65vh] ">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-14">
          {card_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-[#fff]  rounded-lg shadow-md p-4">
                      <h2 className="text-md text-red-500 font-semibold">
                        Stock Products in {card_products.length}
                      </h2>
                    </div>

                    {card_products.map((pr, ind) => (
                      <div
                        key={ind}
                        className="flex bg-[#fff]  rounded-lg shadow-md p-4 flex-col gap-2"
                      >
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 font-bold">
                            {pr.shopName}
                          </h2>
                        </div>

                        {pr.products.map((product, index) => (
                          <div key={index} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <Link >
                                  <img
                                    className="w-[80px] h-[80px] object-contain"
                                    src={product.productInfo.images[0]}
                                    alt=""
                                  />
                                </Link>
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md font-semibold">
                                    {product.productInfo.name}
                                  </h2>
                                  <span className="text-sm">
                                    Brand: {product.productInfo.brand}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  $
                                  {product.productInfo.price -
                                    Math.floor(
                                      (product.productInfo.price *
                                        product.productInfo.discount) /
                                        100
                                    )}
                                </h2>
                                {product.productInfo.discount > 0 ? (
                                  <p className="text-[13px]">
                                    $
                                    <span className="line-through text-red-600 ">
                                      {product.productInfo.price}
                                    </span>
                                  </p>
                                ) : (
                                  <></>
                                )}
                                {product.productInfo.discount > 0 ? (
                                  <p>-{product.productInfo.discount}%</p>
                                ) : (
                                  <p>No discount</p>
                                )}
                              </div>

                              {/* increment */}
                              <div className="flex gap-2 flex-col">
                                <div className="flex  h-[30px]  justify-center items-center text-xl">
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        deleteProductFromCart(product._id)
                                      )
                                    }
                                    className=" px-2 py-2"
                                  >
                                    <MdDelete size={22} color="blue" />
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleDecrement(
                                        product.quantity,
                                        product._id
                                      )
                                    }
                                    className="px-6 py-1 shadow-md  cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="text-center py-1 w-[60px] shadow-md  ">
                                    {product.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleIncrement(
                                        product.quantity,
                                        product.productInfo.stock,
                                        product._id
                                      )
                                    }
                                    className="px-6 py-1 shadow-md  cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outofstock_products.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className=" p-4 bg-[#fff]  rounded-lg shadow-md">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock {card_products.length + 1}
                          </h2>
                        </div>

                        <div className="bg-[#fff]  rounded-lg shadow-md p-4">
                          {outofstock_products.map((product, index) => (
                            <div key={index} className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px] object-contain"
                                    src={product.products[0].images[0]}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md font-semibold">
                                      {product.products[0].name}
                                    </h2>
                                    <span className="text-sm">
                                      Brand: {product.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    $ {product.products[0].price}
                                  </h2>

                                  {product.products[0].discount > 0 ? (
                                    <>
                                      <p>
                                        $
                                        <span className="line-through">
                                          {product.products[0].price -
                                            Math.floor(
                                              (product.products[0].price *
                                                product.products[0].discount) /
                                                100
                                            )}
                                        </span>
                                      </p>
                                      <p>-{product.products[0].discount}%</p>
                                    </>
                                  ) : (
                                    <p>No discount</p>
                                  )}
                                </div>

                                {/* increment */}
                                <div className="flex gap-2 flex-col">
                                  <div className="flex  h-[30px] gap-1 justify-center items-start text-xl">
                                    <button
                                      onClick={() =>
                                        handleDecrement(
                                          product.quantity,
                                          product._id
                                        )
                                      }
                                      className="px-6 bg-slate-400 "
                                    >
                                      -
                                    </button>
                                    <span className="px-3 bg-slate-400 ">
                                      {product.quantity}
                                    </span>
                                    <button
                                      title="product is out of stock"
                                      className="px-6 bg-slate-400  cursor-not-allowed"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        deleteProductFromCart(product._id)
                                      )
                                    }
                                    className="px-12 bg-slate-400"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-[#fff]  rounded-lg shadow-md p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>{buy_product_item} Items </span>
                        <span>${price} </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee </span>
                        <span>${shipping_fee} </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-[#059473]">
                          ${price + shipping_fee}{" "}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-slate-400 text-sm text-white uppercase "
                      >
                        Process to Checkout ({buy_product_item})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className=" w-[470px] flex justify-center items-center mx-auto">
              <div>
                <div className="w-[280px] md:w-[200px] mx-auto">
                  <img src={emptyCart} className="" alt="" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <h2 className="block text-[25px] text-center font-bold">
                    You cart is <span className="text-red-500">empty</span>
                  </h2>
                  <p>
                    Must add items on the cart before you proceed to check out
                  </p>
                  <Link
                    className="px-6 py-1 bg-[#e84949] rounded-[15px] font-bold text-[#fff] uppercase"
                    to="/shop"
                  >
                    Return to shop
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddedProductCart;
