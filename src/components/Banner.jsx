import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBanners } from "../store/reducers/homeReducer";
const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  console.log(banners)

  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto ">
        <div className="w-full flex flex-wrap md-lg:gap-8 ">
          <div className="w-full ">
            <div className="my-8 rounded-[13px] overflow-hidden">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={false}
                showDots={true}
                responsive={responsive}
                draggable={false}
              >
                {banners.length > 0 &&
                  banners.map((banner, i) => (
                    <Link key={i} to={`/product/details/${banner.link}`}>
                      <img src={banner.banner} alt="" />
                    </Link>
                  ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
