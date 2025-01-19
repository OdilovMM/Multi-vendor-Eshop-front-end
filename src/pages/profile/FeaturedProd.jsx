import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByTypeProps } from "../../store/reducers/homeReducer";
import { Cart } from "../../components";
import { MoonLoader } from "react-spinners";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts, isLoading } = useSelector((state) => state.home);

  const { type } = useParams();

  useEffect(() => {
    dispatch(getProductsByTypeProps({ type }));
  }, [dispatch, type]);

  let productTopic = type.split("-").join(" ").toUpperCase();

  return (
    <>
      {isLoading ? (
        <div className="w-[85%] mx-auto flex justify-center items-center min-h-[70vh] gap-9 my-10">
          <MoonLoader />
        </div>
      ) : (
        <div className="w-[85%] sm:w-full md:w-full mx-auto mt-3">
          <h2 className="font-semibold text-xl px-2">{productTopic} Products</h2>
          <div className=" sm:grid sm:grid-cols-2 sm:my-6 sm:gap-2">
            {featuredProducts?.map((product, index) => (
              <Cart product={product} key={index} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
