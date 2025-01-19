import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  addRemoveWishlist,
  addRemoveCart,
  getMyCart,
} from "../store/reducers/cartReducer";
import { IoBagAdd } from "react-icons/io5";

const Cart = ({ product, index }) => {
  const dispatch = useDispatch();
  const { wishlist, success, cardProducts } = useSelector(
    (state) => state.cart
  );
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    // Check if the product is already in the wishlist
    const inWishlist = wishlist.some(
      (item) => item.productId._id === product._id
    );
    setIsInWishlist(inWishlist);
  }, [wishlist, product._id]);

  useEffect(() => {
    // Check if the product is already in the Cart
    const inCart = cardProducts?.some((cart) =>
      cart?.products?.some((item) => item?.productInfo?._id === product?._id)
    );
    setIsInCart(inCart);
  }, [isInCart, cardProducts, product?._id]);

  const handleAddRemoveWishlist = (productId) => {
    dispatch(addRemoveWishlist(productId));
  };

  const handleAddRemoveCart = (id) => {
    dispatch(
      addRemoveCart({
        quantity: 1,
        productId: id,
      })
    );
    if (success) {
      dispatch(getMyCart());
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(getMyCart());
    }
  }, [dispatch, success]);

  return (
    <>
      <div
        key={index}
        className="w-[232px]   h-[410px] flex flex-col justify-between md:w-[180px] md:h-[290px] overflow-hidden border-[0.5px] border-grey-200 md-lg:w-[290px] group  rounded-[6px] shadow-md  relative cursor-pointer"
      >
        <div className="relative h-[300px] overflow-hidden   ">
          <Link className=" h-full w-full   flex justify-center items-center transition-transform duration-500 transform lg:scale-105 :scale-105 xl:scale-105 group-hover:scale-110">
            <img
              src={product?.images?.[0]}
              alt={product?.name}
              className="h-full w-full object-contain shadow-lg "
            />
          </Link>
          {/* sale */}
          <div className="flex flex-col  absolute top-[-11px] left-[-7px] gap-3 ">
            {product?.discount ? (
              <span className="bg-blue-700 font-semibold text-[16px] rounded-br-full text-white px-4 py-5 shadow-sm ">
                - {product?.discount}
                <span className="text-[10px] transform -rotate-50">%</span>
              </span>
            ) : (
              <></>
            )}
          </div>
          {/* link */}
          <div className="absolute top-2 right-1 flex flex-col gap-3  opacity-100   transition duration-500">
            <button
              onClick={() => handleAddRemoveWishlist(product._id)}
              className="p-1 bg-white   transition ease-in-out rounded-full flex justify-center items-center"
            >
              {/* <IoHeartOutline size={25} /> */}
              {isInWishlist ? (
                <IoHeart size={25} color="blue" />
              ) : (
                <IoHeartOutline size={25} />
              )}
              {/* <AiOutlineHeart size={22} /> */}
            </button>
            <Link
              to={`/product/details/${product?.slug}`}
              className="p-1 bg-white   transition ease-in-out rounded-full flex justify-center items-center"
            >
              <AiOutlineEye size={25} />
            </Link>
          </div>

          {/* add cart */}
          <div
            style={{
              zIndex: "1",
            }}
            className="absolute bottom-[1px] left-[193px] w-full transform "
          >
            <button
              onClick={() => handleAddRemoveCart(product?._id)}
              className="flex bg-white rounded-full p-[5px] items-center justify-center"
            >
              {isInCart ? (
                <IoBagAdd size={25} color="blue" />
              ) : (
                <IoBagAdd size={25} color="green" />
              )}
            </button>
          </div>
        </div>
        {/* bottom info */}
        <div className="flex flex-col h-[115px] overflow-hidden bg-[#fbf7fb] ">
          <div className="px-3 py-3 sm:text-[11px]">
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
                      Math.floor((product.price * product.discount) / 100)}{" "}
                </span>
              </p>
              <div className="flex ">
                <Rating ratings={product?.rating} />
              </div>
            </div>
            <div className="flex  justify-between items-center">
              <h2 className="text-red-600 font-semibold text-[13px] sm:text-[9px]">
                {product?.brand}
              </h2>
              <h2 className="text-blue-600 font-semibold sm:text-[9px]">
                {product?.shopName}
              </h2>
            </div>
            <h2 className="text-green-600 font-semibold mb-1 sm:text-[9px]">
              {product?.category}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
