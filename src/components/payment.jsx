import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  initializeStripe,
  mountCardElement,
  createPaymentMethod
} from "../utils/stripe";
import { processPayment } from "./api";
import "../css/payment.css";

export default function Payment() {
  const { state } = useLocation();
const {
  name, ticketCount, totalAmount, eventDate,
  eventTime, pricePerTicket, venue, userEmail
} = state || {};
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const cardElementRef = useRef(null);

  // ✅ Initialize Stripe once
  useEffect(() => {
    const initStripe = async () => {
      try {
        await initializeStripe(
          "pk_test_51R6hPPGfFnPaK5KM2RSccV6D0ljItYARamHJoprh31KjsbuhCx7oMzoIcn2w6dElQe44FzNsMgtUf9IJEwnVblVn00HjXsaubq"
        );
        cardElementRef.current = await mountCardElement("card-element", (event) => {
          setError(event.error?.message || null);
        });
      } catch (err) {
        setError("❌ Failed to initialize payment form.");
      }
    };

    initStripe();

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

      const paymentData = {
        amount: totalAmount,
        paymentMethodId,
        userEmail,
        bookingId: `book${Math.random().toString(36).substr(2, 9)}`,
        eventName: name,
        eventDate,
        eventTime,
        venue,
      };

      console.log("📤 Sending payment data:", paymentData);
      await processPayment(paymentData);


      setPaymentSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000); 
    } catch (err) {
      console.error("❌ Payment error:", err);
      setError(err.message || "Something went wrong.");
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
        <p><strong>Date & Time:</strong> {eventDate} at {eventTime}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="card-element">Card details</label>
            <div id="card-element" className="card-element"></div>
          </div>

          <button type="submit" disabled={isLoading} className="payment-button">
            {isLoading ? "Processing..." : `Pay $${totalAmount}`}
          </button>
        </form>

        {paymentSuccess && <div className="success">✅ Payment succeeded!</div>}
        {error && <div className="error">⚠️ {error}</div>}
      </div>
    </div>
  );
}
