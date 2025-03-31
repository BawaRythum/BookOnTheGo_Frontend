import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initializeStripe, mountCardElement, createPaymentMethod } from "../utils/stripe";
import { processPayment } from "./api"; 
import "../css/payment.css";

export default function PaymentForm() {
  const { state } = useLocation();
  const { name, ticketCount, totalAmount } = state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const cardElementRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeStripe(import.meta.env.VITE_STRIPE_PK);
        cardElementRef.current = await mountCardElement("card-element", (event) => {
          setError(event.error?.message || null);
        });
      } catch (err) {
        setError("Failed to load payment form");
      }
    };

    init();

    return () => {
      if (cardElementRef.current) {
        cardElementRef.current.unmount();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const paymentMethodId = await createPaymentMethod(cardElementRef.current);
      console.log("Stripe PaymentMethod ID:", paymentMethodId);

      // Use the processPayment function from the api.jsx file
      const paymentData = {
        amount: totalAmount,
        paymentMethodId,
      };

      const paymentResponse = await processPayment(paymentData);  // Use dynamic URL

      if (!paymentResponse.success) throw new Error(paymentResponse.message || "Payment failed");

      console.log("Payment success:", paymentResponse);

      setPaymentSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="stripe-container">
        <h1>Payment</h1>

        <p><strong>Event:</strong> {name}</p>
        <p><strong>Tickets:</strong> {ticketCount}</p>
        <p><strong>Total:</strong> ${totalAmount}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="card-element">Card details</label>
            <div id="card-element" className="card-element"></div>
          </div>

          <button type="submit" disabled={isLoading} className="payment-button">
            {isLoading ? "Processing..." : `Pay $${totalAmount}`}
          </button>
        </form>

        {paymentSuccess && <div className="success">Payment succeeded!</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}