import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "./api"; 
import "../css/eventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
        alert("Error loading event details.");
      }
    }

    fetchEvent();
  }, [id]);

  if (!event) return <p className="event-details-loading">Loading...</p>;

  const totalAmount = tickets * event.price;

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        name: event.name,
        ticketCount: tickets,
        totalAmount,
        pricePerTicket: event.price,
        eventId: event.eventId, // for booking&payment
      },
    });
  };

  return (
    <div className="event-details">
      <div className="event-details__card">
        <img className="event-details__image" src={event.images} alt={event.name} />

        <div className="event-details__info">
          <h1 className="event-details__title">{event.name}</h1>
          <p className="event-details__text"><strong>Date & Time:</strong> {new Date(event.date).toLocaleString()}</p>
          <p className="event-details__text"><strong>Description:</strong> {event.eventDetails}</p>
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