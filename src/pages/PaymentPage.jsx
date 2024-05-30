import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { StripePayment } from "../components";
import cash from "../assets/png/cash.png";
import card from "../assets/png/card-100.png";

const PaymentPage = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();

  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <div className="bg-[#caf0f0] h-min-[40vh]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src={card} alt="" />
                    </div>
                    <span className="text-slate-600">Stripe</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cash")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "cash" ? "bg-white" : "bg-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src={cash} alt="" />
                    </div>
                    <span className="text-slate-600">Cash</span>
                  </div>
                </div>
              </div>

              <div>
                {paymentMethod === "stripe" && (
                  <div>
                    <StripePayment orderId={orderId} price={price} />
                  </div>
                )}
                {paymentMethod === "cash" && (
                  <div className="w-full px-4 py-9 bg-white shadow-md">
                    <button className="bg-gray-600 font-bold text-white px-10 w-full py-4 mt-4 rounded-md hover:shadow-lg">
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow-md p-5 text-slate-800 flex flex-col gap-3">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included </span>
                    <span>${price} </span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount </span>
                    <span className="text-lg text-green-600">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
