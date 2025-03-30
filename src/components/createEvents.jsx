import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/createEvent.css";
// import { notifyNewEvent } from "./notificationApi"; 

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    eventDetails: "",
    "date-time": "",
    noOfTickets: "",
    totalSeats: "",
    price: "",
    images: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Uncomment this block when backend API is ready:
    /*
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const createdEvent = response.data;
      
      // ✅ Notify Notification Microservice
      const notificationPayload = {
        eventId: createdEvent.id, // use backend event ID
        eventName: formData.name,
        eventDate: formData["date-time"].split("T")[0],
        eventTime: formData["date-time"].split("T")[1],
        venue: formData.venue || "TBD", // if not present
        promoImageUrl: formData.images,
        userPhone: "+1234567890" // optional/test
      };

      await notifyNewEvent(notificationPayload);
      console.log("Notification sent:", notificationPayload);

      navigate("/myevents");
    } catch (err) {
      console.error("Event creation failed:", err.response?.data || err.message);
      alert("Failed to create event. Please check your inputs or login again.");
    }
    */

    // Temporary: Just log and navigate
    console.log("Created Event (test):", formData);
    navigate("/myevents");
  };

  return (
    <div className="createevent-container">
      <h1>Create New Event</h1>
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