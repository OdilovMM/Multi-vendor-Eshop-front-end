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
    <div className="w-full ">
      <Banner />
      <Category />
      <div className="py-[40px]">
        <FeaturedProducts
          products={topRated}
          title="Popular Products"
          type="top-rated"
        />
      </div>
      <div className="py-[40px] mb-12">
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
