import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateEvent } from "./api"; 
import { notifyEventUpdated } from "./notificationApi"; 
import "../css/createEvent.css";

export default function UpdateEvent() {
  const { state: event } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: event.name,
    eventDetails: event.eventDetails,
    date: event.date || event["date-time"], 
    totalSeats: event.totalSeats,
    price: event.price || "",
    images: event.images,
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
    <div className="createevent-container">
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit} className="createevent-form">
        <input
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="eventDetails"
          placeholder="Event Description"
          value={formData.eventDetails}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Ticket Price ($)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="images"
          placeholder="Image URL"
          value={formData.images}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
