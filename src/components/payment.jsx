import { useState, useEffect } from "react";
import axios from "axios";
import "../css/payment.css";

export default function Payment() {
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(299); // 💰 Hardcoded for now
  const [error, setError] = useState(null);

  // 🔒 Use this when you're ready to fetch from API
  /*
  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/amount");
        setAmount(res.data.amount);
      } catch (err) {
        console.error("Error fetching amount:", err);
        setAmount(0);
      }
    };
    fetchAmount();
  }, []);
  */

  const handlePayment = (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(pincode)) {
      setError("Pincode is incomplete");
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setError("Card number must be 16 digits");
      return;
    }

    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setError("Expiry format must be MM/YY");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      setError("CVV must be 3 digits");
      return;
    }

    const paymentData = {
      name,
      pincode,
      cardNumber,
      expiryDate,
      cvv,
      amount,
    };

    console.log("Payment Data:", paymentData);
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handlePayment}>
        <h2>Payment</h2>
        <h4 className="payment-amount-heading">Amount to pay: ${amount}</h4>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Postal Code"
          maxLength="7"
          minLength="7"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Card Number"
          maxLength="16"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          maxLength="5"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="CVV"
          maxLength="3"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Pay ${amount}</button>
      </form>
    </div>
  );
}