import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "./api";  // Assuming getMyEvents fetches events for authenticated users
import Navbar from "../components/navbar";
import "../css/home.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching events with error handling if not authenticated
    const fetchEvents = async () => {
      try {
        const data = await getMyEvents();  // Fetching events
        setEvents(data);  // Setting the events to state
      } catch (error) {
        console.log("Failed to load events:", error);
        setError("Failed to load events. Please try again.");
      }
    };

    fetchEvents();
  }, []);

  // Filtering events based on search query
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  // Navigate to event details page
  const handleViewDetails = (eventId) => {
    console.log("Navigating to event details with ID:", eventId); // Log to check eventId
    navigate(`/events/${eventId}`);
  };
  
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Explore Events</h1>

        {/* Search bar for filtering events */}
        <input
          type="text"
          placeholder="Search events..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // Update search state
        />

        {/* Show error message if there was a problem fetching events */}
        {error && <p className="error-message">{error}</p>}

        <div className="home-events">
          {/* Loop through filtered events and display them */}
          {filteredEvents.length > 0 ? (
  filteredEvents.map((event) => (
    <div className="event-card" key={event.id} >
     <img src={event.images} alt={event.name} />  {/* Event image */}
      <div className="event-content">
        <h2>{event.name}</h2>
        <p><strong>Date & Time:</strong> {event.date ? new Date(event.date).toLocaleString() : "Invalid Date"}</p>
 
        <p><strong>Tickets Left:</strong> {event.noOfTickets} / {event.totalSeats}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <button onClick={() => handleViewDetails(event.eventId)}>View Details</button>
      </div>
    </div>
  ))
) : (
  <p>No events available</p>
)}

        </div>
      </div>
    </div>
  );
}
