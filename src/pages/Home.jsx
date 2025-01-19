import { useEffect } from "react";
import { Banner, Category, FeaturedProducts } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomeProductsLandingPage,
} from "../store/reducers/homeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { topRated, newArrivals } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(getHomeProductsLandingPage());
  }, [dispatch]);

  useEffect(() => {
   
    dispatch(getHomeProductsLandingPage());

  }, [dispatch]);
  return (
    <div className="w-full">
      <div className="max-w-full flex">
        <div className="min-w-[25%] "></div>
        <div className="min-w-[75%] ">
          <Banner />
        </div>
      </div>
      <Category />
      <div className="py-[40px] sm:py-[18px] mb-12 sm:mb-[6px]">
        <FeaturedProducts
          products={topRated}
          title="Popular Products"
          type="top-rated"
        />
      </div>
      <div className="py-[40px] sm:py-[18px] mb-12 sm:mb-[6px]">
        <FeaturedProducts
          products={newArrivals}
          title="New Arrivals"
          type="new-arrivals"
        />
      </div>
    </div>
  );
};

export default Home;
