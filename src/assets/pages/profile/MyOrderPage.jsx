import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../store/reducers/orderReducer";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const MyOrderPage = () => {
  const navigate = useNavigate();

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState("all");
  const { myOrders } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.customerAuth);

  useEffect(() => {
    dispatch(getAllOrders({ status: state, userId: userInfo.id }));
  }, [dispatch, orderId, state, userInfo.id]);

  const redirectToPay = (recentOrder) => {
    let items = 0;
    for (let i = 0; i < recentOrder.length; i++) {
      items = recentOrder.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: recentOrder.price,
        items,
        orderId: recentOrder._id,
      },
    });
  };

  return (
    <div>
      <div className="bg-white shadow-lg p-5 rounded-md min-h-[70vh]">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">My Orders</h2>
          <select
            name=""
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="outline-none cursor-pointer px-3 py-1 border rounded-md bg-red-200"
            id=""
          >
            <option value="all">All Orders</option>
            <option value="placed">Placed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>
        <div className="pt-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-md">
                <tr className="rounded-md">
                  <th scope="col" className=" px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Price
                  </th>
                  <th scope="col" className=" px-2 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className=" px-1 py-3">
                    Date
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    Order Status
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((myOrd, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-slate-200 cursor-pointer"
                    >
                      <td className="px-2 py-4 font-medium whitespace-normal">
                        ({index + 1}) #{myOrd._id}
                      </td>
                      <td className="px-3 py-4 font-medium whitespace-normal">
                        ${myOrd.price}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-normal">
                        {myOrd.paymentStatus}
                      </td>
                      <td className="px-1 py-4 font-medium whitespace-normal">
                        {myOrd.date}
                      </td>
                      <td className="px-3 py-4 font-medium whitespace-normal">
                        {myOrd.deliveryStatus}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-normal flex flex-row gap-2">
                        <Link
                          to={`/dashboard/order/details/${myOrd._id}`}
                          className="px-1  py-[2px] flex items-center justify-center rounded-md "
                        >
                          <MdOutlineRemoveRedEye
                            size={18}
                            title="View Details"
                            color="black"
                          />
                        </Link>
                        {myOrd.paymentStatus !== "paid" ? (
                          <button
                            onClick={() => redirectToPay(myOrd)}
                            className="px-3 py-[2px] rounded-md  flex items-center justify-center"
                          >
                            <FaCreditCard
                              size={18}
                              title="Pay Now"
                              color="black"
                            />
                          </button>
                        ) : (
                          <div className="px-3 py-[2px] rounded-md ">
                            <FaCheck size={20} />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
