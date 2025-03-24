import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import "../css/myEvents.css";

export default function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Uncomment below when backend API is ready
    /*
    axios.get("http://localhost:5000/api/my-events")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Failed to fetch events:", err));
    */

    // Demo data
    setEvents([
      {
        id: 1,
        name: "Tech Conference 2025",
        location: "Halifax",
        date: "2025-06-15",
        price: 499,
      },
      {
        id: 2,
        name: "Live Music Fest",
        location: "Toronto",
        date: "2025-07-10",
        price: 799,
      },
    ]);
  }, []);

  return (
    <div className="myevents-container">
        <Navbar />
      <h1>My Events</h1>

      <div className="event-cards">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Price:</strong> ${event.price}</p>
          </div>
        ))}
      </div>

      <div className="center-button">
        <button onClick={() => navigate("/create")}>Add New Event</button>
      </div>
    </div>
  );
}