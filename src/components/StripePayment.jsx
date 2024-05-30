import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { API_BASE_URL } from "../utils/backendUrl";
const stripePromise = loadStripe(
  "pk_test_51PFLMyHlAJ34DQFenZIccsL7H9U5T9sPRmOjBL5dqyXy3BW1ghMDGYibLD19sL0i4H4wskhmLJb0DnEiksn9EOrd00WyDJ4x1x"
);



const StripePayment = ({ orderId, price }) => {
  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
    clientSecret,
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/order/create-payment`,
        { price },
        { withCredentials: true }
      );
      console.log(data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <Checkout orderId={orderId} />
        </Elements>
      ) : (
        <div className="w-full px-4 py-9 bg-white shadow-md">
          <button
            onClick={handlePayment}
            className="bg-gray-600 font-bold  text-white px-10 w-full py-4 rounded-md hover:shadow-lg"
          >
            Start Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default StripePayment;
