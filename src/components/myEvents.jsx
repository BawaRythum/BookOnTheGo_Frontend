import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Make sure axios is installed
import "./MyEvents.css";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch my events from API
    axios.get("http://localhost:5000/api/events/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("Failed to load events:", err);
        // Optionally redirect to login
      });
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from local state
      setEvents(events.filter((e) => e.id !== id));
      console.log("Event deleted:", id);
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete event.");
    }
  };

  return (
    <div className="myevents-container">
      <h1>My Events</h1>

      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.images} alt={event.name} />
            <div className="event-info">
              <h2>{event.name}</h2>
              <p><strong>Date & Time:</strong> {new Date(event["date-time"]).toLocaleString()}</p>
              <p><strong>Description:</strong> {event.eventDetails}</p>
              <p><strong>Tickets:</strong> {event.noOfTickets} / {event.totalSeats}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="center-button">
        <button onClick={() => navigate("/create-event")}>Add New Event</button>
      </div>
    </div>
  );
}