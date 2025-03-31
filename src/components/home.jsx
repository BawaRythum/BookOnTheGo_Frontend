import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventById } from "./api";
import Navbar from "../components/navbar";
import "../css/home.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventById();
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to load events:", error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="home-container">
        <h1>Explore Events</h1>

        <input
          type="text"
          placeholder="Search events..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="home-events">
          {filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.images} alt={event.name} />
              <div className="event-content">
                <h2>{event.name}</h2>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {new Date(event["date-time"]).toLocaleString()}
                </p>
                <p>
                  <strong>Tickets Left:</strong> {event.noOfTickets} /{" "}
                  {event.totalSeats}
                </p>
                <p>
                  <strong>Price:</strong> ${event.price}
                </p>
                <button
                  onClick={() =>
                    navigate(`/details/${event.id}`, { state: event })
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
