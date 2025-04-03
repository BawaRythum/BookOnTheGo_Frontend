import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById, getUserDetails } from "./api"; 
import "../css/eventDetails.css";

export default function EventDetails() {
  const { eventId } = useParams();  
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [user, setUser] = useState({ email: "" });

  useEffect(() => {
    const fetchUserAndEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ email: payload.sub });
          console.log("✅ Email from token:", payload.sub);
        } else {
          console.warn("⚠️ No token found");
        }
  
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (err) {
        console.error("❌ Error loading event or decoding token:", err);
      }
    };
  
    fetchUserAndEvent();
  }, [eventId]);
  
  
  

  if (!event) return <p className="event-details-loading">Loading...</p>;

  const totalAmount = tickets * event.price;
  const dateObj = new Date(Number(event.date));
const eventDate = dateObj.toISOString().split("T")[0]; // yyyy-mm-dd
const eventTime = dateObj.toTimeString().split(":").slice(0, 2).join(":"); // hh:mm
    console.log(eventDate, eventTime);

  const handleProceed = () => {
    console.log("Proceeding with:", {
      name: event.name,
      tickets,
      totalAmount,
      price: event.price,
      eventDate,
      eventTime,
      venue: event.eventDetails,
      userEmail:user.email,
    });

    navigate("/payment", {
      state: {
        name: event.name,
        ticketCount: tickets,
        totalAmount,
        pricePerTicket: event.price,
        eventDate,
        eventTime,
        venue: event.eventDetails || "TBD",
        userEmail: user.email,
      },
    });
    
  };

  return (
    <div className="event-details">
      <div className="event-details__card">
        <img className="event-details__image" src={event.images || 'default-image.jpg'} alt={event.name} />

        <div className="event-details__info">
          <h1 className="event-details__title">{event.name}</h1>
          <p className="event-details__text">
            <strong>Date & Time:</strong>
            {event.date ? new Date(event.date).toLocaleString() : "Date not available"}
          </p>
          <p className="event-details__text"><strong>Description:</strong> {event.eventDetails || 'No description available'}</p>
          <p className="event-details__text"><strong>Tickets:</strong> {event.noOfTickets} / {event.totalSeats}</p>
          <p className="event-details__text"><strong>Price per Ticket:</strong> ${event.price}</p>

          <label className="event-details__label">Number of Tickets:</label>
          <input
            className="event-details__input"
            type="number"
            min="1"
            max={event.noOfTickets}
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
          />

          <p className="event-details__text"><strong>Total:</strong> ${totalAmount}</p>
          <button className="event-details__button" onClick={handleProceed}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
}
