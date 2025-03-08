import Cart from "../Cart";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products, title, type }) => {
  return (
    <>
      <div className="w-full sm:w-full md:w-[98%] min-h-[470px] flex flex-row  flex-wrap mx-auto">
        <Link className="w-full" to={`featured/products/${type}`}>
          <div className=" flex justify-between gap-3 items-center  flex-row text-4xl text-slate-600 font-bold relative pb-[40px]">
            <button className="text-blue-800 md:text-[16px] border-gray-400 border-1 px-1 m-0 rounded-md">{title}</button>
            <span className="mt-2">
              <FaAngleDoubleRight
                color="blue"
                className="md:text-[22px]"
                title={`Go to ${title}`}
              />
            </span>
          </div>
        </Link>

        <div className="flex flex-row flex-wrap justify-start gap-[10.5px] ">
          {products?.map((product, index) => (
            <Cart product={product} key={index} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
