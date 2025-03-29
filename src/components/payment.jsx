import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    // Save payment info to state to persist on refresh
    if (state) {
      setPaymentInfo(state);
      localStorage.setItem("paymentDetails", JSON.stringify(state));
    } else {
      const stored = localStorage.getItem("paymentDetails");
      if (stored) setPaymentInfo(JSON.parse(stored));
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Payment successful:", paymentInfo);

    // Clear stored payment info
    localStorage.removeItem("paymentDetails");

    // Redirect or show success
    alert("Payment successful!");
    navigate("/home");
  };

  if (!paymentInfo) return <p className="payment-loading">Loading...</p>;

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Payment</h2>

        <div className="payment-summary">
          <p><strong>Event:</strong> {paymentInfo.name}</p>
          <p><strong>Tickets:</strong> {paymentInfo.ticketCount}</p>
          <p><strong>Price per ticket:</strong> ${paymentInfo.pricePerTicket}</p>
          <p><strong>Total Amount:</strong> ${paymentInfo.totalAmount}</p>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Card Number" required />
          <input type="text" placeholder="Expiry Date (MM/YY)" required />
          <input type="text" placeholder="CVV" required />
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Pincode (e.g. B3H 4R2)" required />

          <button type="submit">Pay ${paymentInfo.totalAmount}</button>
        </form>
      </div>
    </div>
  );
}