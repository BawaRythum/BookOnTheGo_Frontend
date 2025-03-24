import { useEffect, useState } from "react";
// import axios from "axios";
import "../css/home.css";
import Navbar from "./navbar";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Uncomment this when your API is ready
    /*
    axios.get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
    */

    // Temporary hardcoded data
    setEvents([
      {
        id: 1,
        name: "Tech Conference 2025",
        location: "New York",
        date: "2025-06-15",
        price: 129.99,
      },
      {
        id: 2,
        name: "Live Music Festival",
        location: "Los Angeles",
        date: "2025-07-22",
        price: 89.5,
      },
      {
        id: 3,
        name: "Startup Meetup",
        location: "San Francisco",
        date: "2025-08-10",
        price: 49.99,
      },
    ]);
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
        <Navbar />
      <h1>Explore Events</h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="home-events">
        {filteredEvents.length === 0 ? (
          <p className="no-events">No events found.</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="home-event-card">
              <h2>{event.name}</h2>
              <p><strong>📍 Location:</strong> {event.location}</p>
              <p><strong>📅 Date:</strong> {event.date}</p>
              <p><strong>💵 Price:</strong> ${event.price.toFixed(2)}</p>
              <button>Book Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}