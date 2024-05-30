import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import ignore from "../../assets/error.svg";
import axios from "axios";
import ok from "../../assets/success.svg";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import api from "../../api/api";
import { API_BASE_URL } from "../../utils/backendUrl";

const load = async () => {
  return await loadStripe(
    "pk_test_51PFLMyHlAJ34DQFenZIccsL7H9U5T9sPRmOjBL5dqyXy3BW1ghMDGYibLD19sL0i4H4wskhmLJb0DnEiksn9EOrd00WyDJ4x1x"
  );
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;
        case "processing":
          setMessage("processing");
          break;
        case "request_payment_method":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);

  
  const getLoad = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };

  useEffect(() => {
    //
    getLoad();
  }, []);

  const updatePayment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await axios.get(
          `${API_BASE_URL}/api/v1/order/confirm/${orderId}`
        );
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (message === "succeeded") {
      updatePayment();
    }
  }, [message]);

  return (
    <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-3">
      {message === "failed" || message === "processing" ? (
        <>
          <div>
            <img src={ignore} alt="" />
            <p>Payment Failed</p>
            <Link
              to="/dashboard/my-orders"
              className="px-5 py-2 bg-green-900 rounded-xl text-white font-bold"
            >
              Back To Dashboard
            </Link>
          </div>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <div className="flex flex-col justify-center items-center gap-8">
              <img src={ok} alt="" />
              <p>Payment Successful</p>
              <Link
                to="/dashboard/my-orders"
                className="px-5 py-2 bg-green-900 rounded-xl text-white font-bold"
              >
                Back To Dashboard
              </Link>
            </div>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
