import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "./api";
import "../css/createEvent.css";
import { notifyNewEvent } from "./notificationApi"; 

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    eventDetails: "",
    noOfTickets: "",
    date: "",
    totalSeats: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem("token");
    try {
      const response = await createEvent(formData);
      console.log("Created Event:", response);

      const [eventDate, eventTime] = formData.date.split("T");
      // Notify Notification Microservice
      const notificationPayload = {
        eventId:  response.eventId || response.id,
        eventName: formData.name,
        eventDate,
        eventTime,
        venue: "TBD",
        userPhone: "+19022409993",
      };
      await notifyNewEvent(notificationPayload); 
      console.log("Notification sent:", notificationPayload);
      navigate("/myevents");

      
    } catch (err) {
      console.error("Event creation failed:", err.response?.data || err.message);
      alert("Failed to create event. Please check your inputs or login again.");
    }
  };

  return (
    <div className="createevent-container">
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit} className="createevent-form">
        <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
        <textarea name="eventDetails" placeholder="Event Description" value={formData.eventDetails} onChange={handleChange} required />
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
        <input type="number" name="totalSeats" placeholder="Total Seats" value={formData.totalSeats} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Ticket Price ($)" value={formData.price} onChange={handleChange} required />
        <input type="text" name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}