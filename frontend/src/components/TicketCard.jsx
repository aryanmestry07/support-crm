import { useNavigate } from "react-router-dom";

// Format Date
function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Ticket Card
function TicketCard({ ticket }) {
  const navigate = useNavigate();

  // Open Ticket
  function handleClick() {
    navigate(`/tickets/${ticket.ticket_id}`);
  }

  const statusClass = ticket.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className="ticket-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleClick();
        }
      }}
    >
      <div className="ticket-header">
        <span className="ticket-id">{ticket.ticket_id}</span>

        <span className={`status ${statusClass}`}>{ticket.status}</span>
      </div>

      <h3>{ticket.subject}</h3>

      <p className="ticket-info">
        {ticket.customer_name}

        {" · "}

        {formatDate(ticket.created_at)}
      </p>
    </div>
  );
}

export default TicketCard;
