function Stats({ tickets }) {
  // Calculate Stats
  const total = tickets.length;

  const open = tickets.filter((ticket) => ticket.status === "Open").length;

  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;

  const closed = tickets.filter((ticket) => ticket.status === "Closed").length;

  return (
    <section className="stats">
      <div className="stat-card total-card">
        <h3>Total Tickets</h3>

        <p>{total}</p>
      </div>

      <div className="stat-card open-card">
        <h3>Open</h3>

        <p>{open}</p>
      </div>

      <div className="stat-card progress-card">
        <h3>In Progress</h3>

        <p>{inProgress}</p>
      </div>

      <div className="stat-card closed-card">
        <h3>Closed</h3>

        <p>{closed}</p>
      </div>
    </section>
  );
}

export default Stats;
