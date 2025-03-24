import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/createEvent.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    price: "",
    seats: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Uncomment when backend is ready
    /*
    axios.post("http://localhost:5000/api/my-events", formData)
      .then(() => navigate("/myevents"))
      .catch(err => console.error("Failed to create event:", err));
    */

    console.log("Event Created:", formData); // demo mode
    navigate("/myevents");
  };

  return (
    <div className="createevent-container">
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit} className="createevent-form">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="seats"
          placeholder="Number of Seats"
          value={formData.seats}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}