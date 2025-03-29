import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Navbar from "../components/navbar"; 
import "../css/home.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEvents([
      {
        id: "evt1",
        name: "Tech Conference 2025",
        eventDetails: "A full-day event on tech, AI and startups.",
        "date-time": "2025-06-15T10:00",
        noOfTickets: 80,
        totalSeats: 100,
        price: 999,
        images: "https://via.placeholder.com/400x200"
      },
      {
        id: "evt2",
        name: "Music Night",
        eventDetails: "Live music with top bands.",
        "date-time": "2025-07-01T19:00",
        noOfTickets: 40,
        totalSeats: 100,
        price: 499,
        images: "https://via.placeholder.com/400x200"
      },
      {
        id: "evt2",
        name: "Music Night",
        eventDetails: "Live music with top bands.",
        "date-time": "2025-07-01T19:00",
        noOfTickets: 40,
        totalSeats: 100,
        price: 499,
        images: "https://via.placeholder.com/400x200"
      },
      {
        id: "evt2",
        name: "Music Night",
        eventDetails: "Live music with top bands.",
        "date-time": "2025-07-01T19:00",
        noOfTickets: 40,
        totalSeats: 100,
        price: 499,
        images: "https://via.placeholder.com/400x200"
      }
    ]);
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <Navbar />

      <h1>All Events</h1>

      <input
        type="text"
        placeholder="Search events..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="home-events">
        {filteredEvents.map(event => (
          <div className="event-card" key={event.id}>
            <img src={event.images} alt={event.name} />
            <div className="event-content">
              <h2>{event.name}</h2>
              <p><strong>Date & Time:</strong> {new Date(event["date-time"]).toLocaleString()}</p>
              <p><strong>Tickets Left:</strong> {event.noOfTickets} / {event.totalSeats}</p>
              <p><strong>Price:</strong> ${event.price}</p>
              <button onClick={() => navigate(`/details/${event.id}`, { state: event })}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}