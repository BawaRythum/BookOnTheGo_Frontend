import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "./api";
import { notifyNewEvent, subscribeToUpdates } from "./notificationApi";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaImage,
  FaInfoCircle,
  FaUserFriends,
  FaTicketAlt
} from "react-icons/fa";
import "../css/createEvent.css";
import Navbar from "./navbar";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    eventDetails: "",
    totalSeats: "",
    date: "",
    price: "",
    images: "",
  });

  const [error, setError] = useState("");
  const [subscribe, setSubscribe] = useState(false); // Added state for subscription
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribeChange = (e) => {
    setSubscribe(e.target.checked); // Manage subscription checkbox
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setIsSubmitting(true); // Start submitting

    // Validate the totalSeats input to ensure it's not less than 1
    if (Number(formData.totalSeats) <= 10) {
      setIsSubmitting(false); // End submitting
      setError("Total seats must be greater than 10.");
      return;
    }

    // Basic form validation
    if (!formData.name || !formData.eventDetails || !formData.date || !formData.totalSeats || !formData.price || !formData.images) {
      setIsSubmitting(false); // End submitting
      setError("Please fill in all the required fields.");
      return;
    }

    try {
      const payload = {
        ...formData,
        noOfTickets: Number(formData.totalSeats), // auto-fill
        totalSeats: Number(formData.totalSeats),
        price: Number(formData.price),
      };

      const response = await createEvent(payload);

      if (!response || !response.eventId) {
        throw new Error("Failed to create event. Try again.");
      }

      const [eventDate, eventTime] = formData.date.split("T");
      const notificationPayload = {
        eventId: response.eventId,
        eventName: formData.name,
        eventDate,
        eventTime,
        venue: formData.eventDetails,
        promoImageUrl: formData.images,
      };

      // Ensure only one notification for event creation is triggered
      await notifyNewEvent(notificationPayload);

      // Only subscribe if not already subscribed
      if (subscribe) {
        await subscribeToUpdates(formData.email);
        console.log("Subscribed to event updates.");
      }

      setIsSubmitting(false); // End submitting
      navigate("/myevents");
    } catch (err) {
      console.error("Full error:", err);
      setIsSubmitting(false); // End submitting
      const errorMsg = err?.response?.data?.message || err?.message || "An unknown error occurred. Please try again.";
      setError(errorMsg);
      throw new Error(errorMsg);  // Explicitly throw the error here
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="logo">🎉 Create New Event</h1>

          {error && <div className="auth-error">{error}</div>}

          <div className="input-group">
            <FaTicketAlt className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
  <FaInfoCircle className="input-icon" />
  <input
    type="text"
    name="eventDetails"  // Ensure this matches the key in your state
    placeholder="Venue"
    value={formData.eventDetails}  // Bind to the correct state property
    onChange={handleChange}  // Ensure this correctly updates the state
    required
    className="form-input"
  />
</div>


          <div className="input-group">
            <FaCalendarAlt className="input-icon" />
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-input custom-datetime-picker"
            />
          </div>

          <div className="input-group">
            <FaUserFriends className="input-icon" />
            <input
              type="number"
              name="totalSeats"
              placeholder="Total Seats"
              value={formData.totalSeats}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <FaDollarSign className="input-icon" />
            <input
              type="number"
              name="price"
              placeholder="Ticket Price ($)"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <FaImage className="input-icon" />
            <input
              type="text"
              name="images"
              placeholder="Event Image URL"
              value={formData.images}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {formData.images && (
            <img
              src={formData.images}
              alt="Preview"
              className="event-img-preview"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}

          <div className="subscribe-option">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={handleSubscribeChange}
              />
              Subscribe to event updates
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
