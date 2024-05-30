import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const Checkout = ({ orderId }) => {
  localStorage.setItem("orderId", orderId);

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3001/confirm",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An Unexpected Error Occurred");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
       
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="px-10 py-[10px] font-bold w-full mt-4 rounded-md bg-slate-600 text-white"
      >
        <span id="button-text">{isLoading ? "Loading..." : "Pay Now"} </span>
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default Checkout;
