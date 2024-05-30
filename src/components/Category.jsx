import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/reducers/homeReducer";

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 4,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 3,
    },
  };

  return (
    <div className="w-[85%] mx-auto relative">
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={false}
        responsive={responsive}
        transitionDuration={800}
        draggable={false}
      >
        {categories.map((category, i) => (
          <Link
            to={`/products?category=${category.name}`}
            className="h-[120px] w-[120px] border block"
            key={i}
          >
            <div className="w-full h-full relative p-3 bg-white ">
              <img
                src={category.image}
                alt=""
                className="rounded-full object-cover bg-slate-200  w-full h-full hover:scale-105 transition-all duration-300"
              />
              <div className="absolute bottom-1 shadow-md w-full mx-auto font-bold left-0 top-[80px] flex justify-center items-center">
                <span className="py-[2px] text-[9px] text-center rounded-md px-2 bg-green-400 text-black">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Category;
