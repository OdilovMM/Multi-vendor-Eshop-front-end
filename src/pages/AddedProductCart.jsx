import { useEffect } from "react";
import { BreadCrumbs } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  deleteProductFromCart,
  messageClear,
  incrementProductQuantity,
  decrementProductQuantity,
  getMyCart,
  addRemoveCart,
} from "./../store/reducers/cartReducer.js";
import emptyCart from "../assets/icon/empty-cart.png";

const AddedProductCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cardProducts,
    price,
    shippingFee,
    outOfStockProducts,
    buyProductItem,
    success,
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.customerAuth);

  useEffect(() => {
    if (userInfo) {
      dispatch(getMyCart());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (success) {
      dispatch(getMyCart());
    }
  }, [dispatch, success]);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: cardProducts,
        price: price,
        shippingFee: shippingFee,
        items: buyProductItem,
      },
    });
  };

  const handleIncrement = (productQuantity, productStock, productId) => {
    const tempQuantity = productQuantity + 1;
    if (tempQuantity <= productStock) {
      dispatch(incrementProductQuantity(productId));
      if (success) {
        dispatch(getMyCart());
      }
    }
  };
  const handleDecrement = (productQuantity, productId) => {
    const tempQuantity = productQuantity - 1;
    if (tempQuantity !== 0) {
      dispatch(decrementProductQuantity(productId));
      if (success) {
        dispatch(getMyCart());
      }
    }
  };

  const handleAddRemoveCart = async (id) => {
    await dispatch(
      addRemoveCart({
        quantity: 1,
        productId: id,
      })
    );
    if (success) {
      dispatch(getMyCart());
    }
  };

  return (
    <>
      {/* BreadCrumbs */}
      <div className=" bg-[#fff]  h-[80px] bg-cover bg-no-repeat bg-left">
        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-gray-400">
          <div className="flex justify-center items-center gap-2 text-lg w-full">
            <BreadCrumbs
              from="/"
              fromPage="Home"
              to="/my-cart"
              iconSize={20}
              toPage="Cart"
              iconColor="gray"
            />
          </div>
        </div>
      </div>

      {/* main */}

      <div className="bg-[#fff] min-h-[65vh] ">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-14">
          {cardProducts?.length > 0 || outOfStockProducts?.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-4 justify-between">
                    <div className="bg-[#fff]  rounded-lg  border-2 border-blue-400 p-4">
                      <h2 className="text-md text-gray-500 font-semibold">
                        In stock {cardProducts.length} products
                      </h2>
                    </div>

                    {cardProducts?.map((pr, ind) => (
                      <div
                        key={ind}
                        className="flex bg-[#fff]  rounded-md  px-4 py-7 border-[2px] border-blue-400 flex-col gap-4"
                      >
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 font-bold">
                            Shop Name: {pr.shopName}
                          </h2>
                        </div>

                        {pr?.products?.map((product, index) => (
                          <div
                            key={index}
                            className="w-full flex flex-wrap justify-between"
                          >
                            <div className="flex sm:w-full gap-2 w-5/12">
                              <div className="flex justify-start gap-2 w-full items-start">
                                <Link className="rounded-md overflow-hidden">
                                  <img
                                    className="w-[130px] h-full object-contain"
                                    src={product.productInfo.images[0]}
                                    alt=""
                                  />
                                </Link>
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md font-semibold">
                                    Name: {product.productInfo.name}
                                  </h2>
                                  <span className="text-sm">
                                    Brand: {product.productInfo.brand}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0 text-center">
                                <h2 className="text-lg text-orange-500 font-bold">
                                  $
                                  {product?.productInfo?.price -
                                    Math.floor(
                                      (product?.productInfo?.price *
                                        product?.productInfo?.discount) /
                                        100
                                    )}
                                </h2>
                                {product?.productInfo?.discount > 0 ? (
                                  <p className="text-[12px]">
                                    $
                                    <span className="line-through text-red-600 ">
                                      {product?.productInfo?.price}
                                    </span>
                                  </p>
                                ) : (
                                  <></>
                                )}
                                {product?.productInfo?.discount > 0 ? (
                                  <p className="text-[13px] font-semibold">
                                    {product?.productInfo?.discount}%
                                  </p>
                                ) : (
                                  <p>No discount</p>
                                )}
                              </div>

                              {/* increment */}
                              <div className="flex flex-row gap-2 justify-center items-start">
                                <button
                                  onClick={() =>
                                    handleAddRemoveCart(
                                      product?.productInfo?._id
                                    )
                                  }
                                  className=" px-2 py-2"
                                >
                                  <MdDelete size={27} color="blue" />
                                </button>

                                <div className="flex  h-[45px] border-2 rounded-md border-gray-400  justify-center items-center text-xl">
                                  <button
                                    onClick={() =>
                                      handleDecrement(
                                        product?.quantity,
                                        product?.productInfo?._id
                                      )
                                    }
                                    className="px-6 py-1 w-full  h-full cursor-pointer"
                                  >
                                    <FaMinus color="gray" />
                                  </button>
                                  <span className="text-center py-1 w-[60px]   ">
                                    {product?.quantity}
                                  </span>
                                  <button
                                    disabled={
                                      product?.quantity ===
                                      product?.productInfo.stock
                                        ? true
                                        : false
                                    }
                                    onClick={() =>
                                      handleIncrement(
                                        product?.quantity,
                                        product?.productInfo.stock,
                                        product?.productInfo?._id
                                      )
                                    }
                                    className={` px-6 py-1 w-full  h-full cursor-pointer`}
                                  >
                                    <FaPlus color="gray" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outOfStockProducts.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-[#fff]  rounded-lg  border-2 border-blue-400 p-4">
                          <h2 className="text-md text-gray-500 font-semibold">
                            Out of Stock {cardProducts?.length + 1}
                          </h2>
                        </div>

                        <div className="flex bg-[#fff]  rounded-md  px-4 py-7 border-[2px] border-blue-400 flex-col gap-4">
                          {outOfStockProducts?.map((product, index) => (
                            <div key={index} className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[130px] h-full object-contain"
                                    src={product?.products[0].images[0]}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md font-semibold">
                                      Name: {product?.products[0].name}
                                    </h2>
                                    <span className="text-sm">
                                      Brand: {product?.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    $ {product?.products[0].price}
                                  </h2>

                                  {product.products[0].discount > 0 ? (
                                    <>
                                      <p>
                                        $
                                        <span className="line-through">
                                          {product?.products[0].price -
                                            Math.floor(
                                              (product?.products[0].price *
                                                product?.products[0].discount) /
                                                100
                                            )}
                                        </span>
                                      </p>
                                      <p>-{product?.products[0].discount}%</p>
                                    </>
                                  ) : (
                                    <p>No discount</p>
                                  )}
                                </div>

                                {/* increment */}
                                <div className="flex flex-row gap-2 justify-center items-start">
                                  <button
                                    onClick={() =>
                                      handleAddRemoveCart(
                                        product?.productInfo?._id
                                      )
                                    }
                                    className=" px-2 py-2"
                                  >
                                    <MdDelete size={27} color="blue" />
                                  </button>
                                  <div className="flex  h-[45px] border-2 rounded-md border-gray-400  justify-center items-center text-xl">
                                    <button
                                      onClick={handleDecrement(
                                        product?.quantity,
                                        product.products[0]._id
                                      )}
                                      className="px-6 py-1 w-full  h-full cursor-pointer"
                                    >
                                      <FaMinus color="gray" />
                                    </button>
                                    <span className="text-center py-1 w-[60px]   ">
                                      {product?.quantity}
                                    </span>
                                    <button className="px-6 py-1 w-full  h-full cursor-not-allowed">
                                      <FaPlus color="gray" />
                                    </button>
                                  </div>
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
                  {cardProducts.length > 0 && (
                    <div className="bg-[#fff]  rounded-md border-2 border-blue-500 p-4 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-2xl text-gray-600 font-bold">
                        Order Summary
                      </h2>
                      <div className="flex justify-between items-center font-bold">
                        <span>{buyProductItem} Items </span>
                        <span>${price} </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee </span>
                        <span>${shippingFee} </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#F7BE38] text-gray-600 font-bold rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>

                      <div className="flex justify-between items-center font-bold">
                        <span>Total</span>
                        <span className="text-lg text-[#059473] font-bold">
                          ${price + shippingFee}{" "}
                        </span>
                      </div>

                      <button
                        onClick={redirect}
                        type="button"
                        className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-10 h-3 me-2 -ms-1"
                          viewBox="0 0 660 203"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996"
                            fill="#0E4595"
                          />
                          <path
                            d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718"
                            fill="#F2AE14"
                          />
                        </svg>
                        Go to Checkout ({buyProductItem} items)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className=" w-[470px] flex justify-center items-center mx-auto">
              <div>
                <div className="w-[140px] md:w-[180px] mx-auto">
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
                    className="px-6 py-1 bg-[#6f3a3a] rounded-[15px] font-bold text-[#fff] uppercase"
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
