import Cart from "../Cart";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products, title, type }) => {
  return (
    <>
      <div className="w-[85%] md:w-[98%] min-h-[470px] flex flex-row  flex-wrap mx-auto">
        <Link className="w-full" to={`featured/products/${type}`}>
          <div className=" flex justify-start gap-3 items-center  flex-row text-4xl text-slate-600 font-bold relative pb-[40px]">
            <h2 className="text-blue-800 md:text-[16px]">{title}</h2>
            <span className="mt-2">
              <FaAngleDoubleRight
                color="blue"
                className="md:text-[22px]"
                title={`Go to ${title}`}
              />
            </span>
          </div>
        </Link>

        <div className="w-full rounded-[6px] grid gap-5 md:gap-1 grid-cols-5 lg:grid-cols-3 lg:gap-9 md-lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          {products?.map((product, index) => (
            <Cart product={product} key={index} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
