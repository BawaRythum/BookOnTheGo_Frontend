import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import "../css/createEvent.css";

export default function UpdateEvent() {
  const { state: event } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: event.name,
    eventDetails: event.eventDetails,
    "date-time": event["date-time"],
    totalSeats: event.totalSeats,
    images: event.images,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API call to update
    /*
    const token = localStorage.getItem("token");
    axios.put(`http://localhost:5000/api/my-events/${event.id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => navigate("/myevents"));
    */

    console.log("Updated Event:", formData); // demo
    navigate("/myevents");
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