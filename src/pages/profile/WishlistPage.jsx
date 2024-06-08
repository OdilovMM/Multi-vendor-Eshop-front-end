import { useSelector } from "react-redux";
import { Cart } from "../../components";
import { Link } from "react-router-dom";

const WishlistPage = ({ product, index }) => {
  const { wishlist } = useSelector((state) => state.cart);

  return (
    <div className="bg-white shadow-lg p-2 gap-2 rounded-md w-full flex flex-row flex-wrap min-h-[50vh]">
      {wishlist.length === 0 ? (
        <div className="min-h-[40vh] w-full flex flex-col items-center justify-center">
          <h2 className="mt-4 px-4 py-2 font-mono font-bold rounded-[15px]">
            You have not added any products to your wishlist yet.
          </h2>
          <Link
            to="/shop"
            className="bg-slate-400 mt-6 px-4 py-1 rounded-2xl text-yellow-50 font-mono font-bold"
          >
            Go to Store
          </Link>
        </div>
      ) : (
        wishlist?.map((product, ind) => {
          return <Cart product={product?.productId} key={ind} />;
        })
      )}
    </div>
  );
};

export default WishlistPage;
