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
        <div className="w-full mx-auto flex justify-center items-center min-h-[70vh] gap-9 my-10">
          <MoonLoader />
        </div>
      ) : (
        <div className="w-full mx-auto my-2 py-2">
  <h2 className="font-semibold text-xl px-4 py-5 text-blue-500">{productTopic} Products</h2>
  <div className="grid grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-4 py-4">
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
