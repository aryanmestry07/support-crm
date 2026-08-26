import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getTicket, updateTicket } from "../services/api";

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

function TicketDetails() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");

  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Load Ticket
  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  // Fetch Ticket
  async function loadTicket() {
    try {
      setLoading(true);
      setError("");

      const data = await getTicket(ticketId);

      setTicket(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);

      setError("Unable to load ticket.");
    } finally {
      setLoading(false);
    }
  }

  // Update Ticket
  async function handleUpdate(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateTicket(ticketId, {
        status: status,
        notes: note,
      });

      setNote("");

      await loadTicket();
    } catch (error) {
      console.error(error);

      setError("Unable to update ticket.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="ticket-details-state">
        <p>Loading ticket...</p>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="ticket-details-state">
        <p>{error || "Ticket not found."}</p>

        <Link to="/">← Back to Dashboard</Link>
      </main>
    );
  }

  const statusClass = ticket.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <header className="detail-header">
        <Link to="/">← Back to Dashboard</Link>
      </header>

      <main className="ticket-details">
        {/* Ticket Header */}

        <div className="detail-title">
          <div>
            <p className="ticket-id">{ticket.ticket_id}</p>

            <h1>{ticket.subject}</h1>
          </div>

          <span className={`status ${statusClass}`}>{ticket.status}</span>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Customer Information */}

        <section className="detail-card">
          <h2>Customer Information</h2>

          <p>
            <strong>Name:</strong> {ticket.customer_name}
          </p>

          <p>
            <strong>Email:</strong> {ticket.customer_email}
          </p>
        </section>

        {/* Issue Description */}

        <section className="detail-card">
          <h2>Issue Description</h2>

          <p>{ticket.description}</p>
        </section>

        {/* Update Ticket */}

        <section className="detail-card">
          <h2>Update Ticket</h2>

          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="status">Status</label>

              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Open">Open</option>

                <option value="In Progress">In Progress</option>

                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="note">Add Note</label>

              <textarea
                id="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add a note..."
                rows={4}
              />
            </div>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update Ticket"}
            </button>
          </form>
        </section>

        {/* Notes */}

        <section className="detail-card">
          <h2>Notes</h2>

          {ticket.notes && ticket.notes.length > 0 ? (
            <div className="notes-list">
              {ticket.notes.map((item) => (
                <div className="note" key={item.id}>
                  <p>{item.note_text}</p>

                  <small>{formatDate(item.created_at)}</small>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No notes yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default TicketDetails;
