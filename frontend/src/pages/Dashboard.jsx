import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import SearchFilter from "../components/SearchFilter";
import TicketCard from "../components/TicketCard";

import { getTickets } from "../services/api";

function Dashboard() {
  const [allTickets, setAllTickets] = useState([]);

  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);

  // Load Statistics
  useEffect(() => {
    loadAllTickets();
  }, []);

  // Load Tickets
  useEffect(() => {
    loadFilteredTickets();
  }, [status, search]);

  // Get All Tickets
  async function loadAllTickets() {
    try {
      const data = await getTickets();

      setAllTickets(data);
    } catch (error) {
      console.error("Error loading all tickets:", error);
    }
  }

  // Get Filtered
  async function loadFilteredTickets() {
    try {
      setLoading(true);

      const data = await getTickets(status, search);

      setTickets(data);
    } catch (error) {
      console.error("Error loading filtered tickets:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-main">
        {/* Page Header */}

        <section className="page-header">
          <div>
            <p className="eyebrow">CUSTOMER SUPPORT</p>

            <h1>Support Dashboard</h1>

            <p className="page-description">
              Manage customer conversations, tickets, and support requests in
              one place.
            </p>
          </div>
        </section>

        {/* Statistics */}

        <Stats tickets={allTickets} />

        {/* Search and Filter */}

        <section className="ticket-toolbar">
          <div className="toolbar-title">
            <h2>Tickets</h2>

            <span>{tickets.length} results</span>
          </div>

          <SearchFilter
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />
        </section>

        {/* Ticket List */}

        <section className="ticket-section">
          {loading ? (
            <div className="empty-state">
              <div className="loading-spinner"></div>

              <p>Loading tickets...</p>
            </div>
          ) : tickets.length > 0 ? (
            <div className="tickets-container">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.ticket_id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">+</div>

              <h3>No tickets found</h3>

              <p>Try changing your search or filter.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
