import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar"; 
import { getEvent } from "./api"; 
import "../css/myEvents.css";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    getEvent(token)
      .then((data) => {
        setEvents(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load events:", err);
        alert("Failed to load events. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    deleteEvent(id, token)
      .then(() => {
        setEvents(events.filter((e) => e.eventId !== id));
        console.log("Deleted event with id:", id);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete event.");
      });
  };

  if (loading) {
    return <p>Loading events...</p>; 
  }

  return (
    <div className="myevents-container">
      <Navbar />

      <h1>My Events</h1>

      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event.eventId}>
            <img src={event.images} alt={event.name} />
            <div className="event-info">
              <h2>{event.name}</h2>
              <p><strong>Date & Time:</strong> {new Date(event.date).toLocaleString()}</p>
              <p><strong>Description:</strong> {event.eventDetails}</p>
              <p><strong>Tickets:</strong> {event.noOfTickets} / {event.totalSeats}</p>
              <p><strong>Price:</strong> ${event.price}</p>
              <button className="update-btn" onClick={() => navigate(`/update/${event.eventId}`, { state: event })}>
                Update
              </button>
              <button className="delete-btn" onClick={() => handleDelete(event.eventId)}>
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