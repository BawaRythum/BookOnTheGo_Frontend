import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateEvent } from "./api";
import { notifyEventUpdated } from "./notificationApi";
import "../css/createEvent.css";
import Navbar from "./navbar";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaImage,
  FaInfoCircle,
  FaUserFriends,
  FaTicketAlt
} from "react-icons/fa";

export default function UpdateEvent() {
  const { state: event } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: event.name,
    eventDetails: event.eventDetails,
    totalSeats: event.totalSeats,
    price: event.price || "",
    images: event.images,
    date: event.date,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // Step 1: Update Event
      await updateEvent(event.eventId || event.id, formData, token);
      console.log("Event updated on backend");

      // Step 2: Send Notification
      const [eventDate, eventTime] = formData.date.split("T");
      const updatePayload = {
        eventId: event.eventId || event.id,
        eventName: formData.name,
        eventDate,
        eventTime,
        promoImageUrl: formData.images,
        venue: "TBD",
      };

      await notifyEventUpdated(updatePayload);
      console.log("Notification sent:", updatePayload);

      navigate("/myevents");
    } catch (err) {
      console.error("Update or notification failed:", err);
      alert("Failed to update event or notify. Please try again.");
    }
  };

  return (
    <div>
            <Navbar />

    <div className="auth-container">

      <form onSubmit={handleSubmit} className="auth-form">
        <h1 className="logo">🎉 Update Event</h1>

        <div className="input-group">
        <FaTicketAlt className="input-icon" />
          <input
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
          <textarea
            name="eventDetails"
            placeholder="Event Description"
            value={formData.eventDetails}
            onChange={handleChange}
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

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}
