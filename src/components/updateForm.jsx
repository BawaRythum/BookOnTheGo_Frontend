import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import "../css/createEvent.css";
import { notifyEventUpdated } from "./notificationApi"; 

export default function UpdateEvent() {
  const { state: event } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: event.name,
    eventDetails: event.eventDetails,
    "date-time": event["date-time"],
    totalSeats: event.totalSeats,
    images: event.images,
    price: event.price || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      /*
      await axios.put(
        `http://localhost:5000/api/my-events/${event.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      */

      // Prepare event update notification
      const updatePayload = {
        eventId: event.id,
        eventName: formData.name,
        eventDate: formData["date-time"].split("T")[0],
        eventTime: formData["date-time"].split("T")[1],
        venue: "TBD",
        promoImageUrl: formData.images,
        userPhone: "+19022409993", 
      };

      await notifyEventUpdated(updatePayload);

      console.log("Event updated & notification sent:", updatePayload);
      navigate("/myevents");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update or notification failed. Try again.");
    }
  };

  return (
    <div className="createevent-container">
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit} className="createevent-form">
        <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
        <textarea name="eventDetails" placeholder="Event Description" value={formData.eventDetails} onChange={handleChange} required />
        <input type="datetime-local" name="date-time" value={formData["date-time"]} onChange={handleChange} required />
        <input type="number" name="totalSeats" placeholder="Total Seats" value={formData.totalSeats} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Ticket Price ($)" value={formData.price} onChange={handleChange} required />
        <input type="text" name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}