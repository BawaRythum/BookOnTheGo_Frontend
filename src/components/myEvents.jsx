import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar"; 
import axios from "axios"; 
import "../css/myEvents.css";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("token");

    // API call to get my events (commented)
    /*
    axios.get("http://localhost:5000/api/events/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("Failed to load events:", err);
      });
    */

    // Demo events for testing
    setEvents([
      {
        id: "evt1",
        name: "Tech Conference 2025",
        eventDetails: "A full-day event on AI, tech, and startups.",
        "date-time": "2025-06-15T10:00",
        noOfTickets: 80,
        totalSeats: 100,
        price: 999,
        images: "https://via.placeholder.com/600x300"
      },
      {
        id: "evt2",
        name: "Comedy Night",
        eventDetails: "Live stand-up comedy with top comedians.",
        "date-time": "2025-07-01T19:30",
        noOfTickets: 50,
        totalSeats: 100,
        price: 399,
        images: "https://via.placeholder.com/600x300"
      }
    ]);
  }, []);

  const handleDelete = (id) => {
    // const token = localStorage.getItem("token");

    // API delete call (commented)
    /*
    axios.delete(`http://localhost:5000/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setEvents(events.filter((e) => e.id !== id));
        console.log("Deleted:", id);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete event.");
      });
    */

    // Demo: remove from local state
    setEvents(events.filter((e) => e.id !== id));
    console.log("Deleted (demo):", id);
  };

  return (
    <div className="myevents-container">
      <Navbar />

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
              <p><strong>Price:</strong> ${event.price}</p>
              <button  className="update-btn" onClick={() => navigate(`/update/${event.id}`, { state: event })}>
                Update
              </button>
              <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="center-button">
        <button onClick={() => navigate("/create")}>Add New Event</button>
      </div>
    </div>
  );
}