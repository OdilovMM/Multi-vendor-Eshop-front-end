import React, { useEffect } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardIndexData } from "../../store/reducers/dashboardReducer";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const HomeProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.customerAuth);
  const { recentOrders, totalOrder, pendingOrder, cancelledOrder } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardIndexData(userInfo.id));
  }, [dispatch, userInfo.id]);

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
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="group flex shadow-lg justify-normal items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px]  h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Total Orders</span>
          </div>
        </div>
        <div className="flex shadow-lg justify-normal items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="flex shadow-lg justify-normal items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Canceled Orders</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg p-5 mt-5 rounded-md min-h-[40vh]">
        <h2 className="font-semibold">Recent 5 Orders</h2>
        <div className="pt-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-md">
                <tr className="rounded-md">
                  <th scope="col" className=" px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    date
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Order Status
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((recent, ind) => {
                  return (
                    <tr
                      key={ind}
                      className="bg-white border-b hover:bg-slate-200 cursor-pointer"
                    >
                      <td className="px-4 py- font-medium whitespace-normal">
                        ({ind + 1}) #{recent._id}
                      </td>
                      <td className="px-4 py-3 font-medium whitespace-normal">
                        ${recent.price}
                      </td>
                      <td className="px-5 py-3 font-medium whitespace-normal">
                        {recent.paymentStatus}
                      </td>
                      <td className="px-4 py-3 font-medium whitespace-normal">
                        {recent.date}
                      </td>
                      <td className="px-5 py-3 font-medium whitespace-normal">
                        {recent.deliveryStatus}
                      </td>
                      <td className="px-4 py-3 font-medium whitespace-normal flex flex-row gap-2">
                        <Link
                          to={`/dashboard/order/details/${recent._id}`}
                          className="px-2 py-[2px]  rounded-md flex items-center justify-center"
                        >
                          <MdOutlineRemoveRedEye
                            size={18}
                            title="View Details"
                            color="black"
                          />
                        </Link>

                        {recent.paymentStatus !== "paid" ? (
                          <button
                            onClick={() => redirectToPay(recent)}
                            className="px-3 py-[2px]  rounded-md  flex items-center justify-center"
                          >
                            <FaCreditCard
                              size={18}
                              title="Pay Now"
                              color="black"
                            />
                          </button>
                        ) : (
                          <div className="px-3 py-[2px] rounded-md ">
                            <FaCheck size={18}/>
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

export default HomeProfile;
