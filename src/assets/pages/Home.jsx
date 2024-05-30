import React, { useEffect } from "react";
import { Banner, Category, FeaturedProducts, Products } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByType } from "../store/reducers/homeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { products, latestProduct, topRatedProduct, discountProduct } =
    useSelector((state) => state.home);
  useEffect(() => {
    dispatch(getProductsByType());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Banner />
      <Category />
      <div className="py-[40px]">
        <FeaturedProducts products={products} title='Featured Products' />
      </div>
     
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products
                title="Latest Products"
                type="latest"
                products={latestProduct}
              />
            </div>
            <div className="overflow-hidden">
              <Products
                title="Top Rated Product"
                type="top-rated"
                products={topRatedProduct}
              />
            </div>
            <div className="overflow-hidden">
              <Products
                title="Top Discount Product"
                type="top-discounted"
                products={discountProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
