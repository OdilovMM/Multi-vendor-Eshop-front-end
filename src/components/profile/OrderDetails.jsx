import React, { useEffect } from "react";
import { getMyOrderDetails } from "../../store/reducers/orderReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { myOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.customerAuth);
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(getMyOrderDetails(orderId));
  }, [dispatch, orderId]);
  return (
    <>
      <div className="bg-white p-5 min-h-[50vh] rounded-lg shadow-lg">
        <h2 className="text-slate-600 font-semibold">
          #{myOrder._id} , <span className="pl-1">{myOrder.date}</span>{" "}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-600 font-semibold font-sans">
              Deliver To : {myOrder.shippingInfo?.name}{" "}
            </h2>
            <p>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded">
                Home
              </span>
              <span className="text-slate-600 text-sm">
                {myOrder.shippingInfo?.address}
                {myOrder.shippingInfo?.province}
                {myOrder.shippingInfo?.city}
              </span>
            </p>
            <p className="text-slate-600 text-md font-semibold">
              Email To {userInfo.email}
            </p>
          </div>

          <div className="text-slate-600">
            <h2 className="font-mono">
              Price : ${myOrder.price} Include Shipping
            </h2>
            <p className="font-mono">
              {" "}
              Payment Status :{" "}
              <span
                className={`py-[1px] text-xs px-3 ${
                  myOrder.paymentStatus === "paid"
                    ? "bg-green-300 text-green-800"
                    : "bg-red-300 text-red-800"
                } rounded-md`}
              >
                {" "}
                {myOrder.paymentStatus}{" "}
              </span>{" "}
            </p>

            <p className="font-mono">
              {" "}
              Order Status :{" "}
              <span
                className={`py-[1px] text-xs px-3 ${
                  myOrder.deliveryStatus === "paid"
                    ? "bg-green-300 text-green-800"
                    : "bg-red-300 text-red-800"
                } rounded-md`}
              >
                {" "}
                {myOrder.deliveryStatus}{" "}
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
            Order Products{" "}
          </h2>
          <div className="flex gap-5 flex-col w-[50%]">
            {myOrder.products?.map((p, i) => (
              <div key={i}>
                <div className="flex gap-5 justify-between items-center text-slate-600">
                  <div className="flex gap-2">
                    <img
                      className="w-[55px] h-[55px]"
                      src={p.images[0]}
                      alt=""
                    />
                    <div className="flex text-sm flex-col justify-start items-start">
                      <Link> {p.name} </Link>
                      <p>
                        {" "}
                        <span>Brand : {p.brand}</span>{" "}
                      </p>
                      <p>
                        <span>Quantity : {p.quantity}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pl-4 flex flex-col">
                    <h2 className="text-md text-green-800">
                      ${p.price - Math.floor((p.price * p.discount) / 100)}
                    </h2>
                    <p className="line-through">{p.price}</p>
                    <p>-{p.discount}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
