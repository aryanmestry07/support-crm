function SearchFilter({ search, setSearch, status, setStatus }) {
  // Search and Filter
  return (
    <section className="controls">
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="">All Statuses</option>

        <option value="Open">Open</option>

        <option value="In Progress">In Progress</option>

        <option value="Closed">Closed</option>
      </select>
    </section>
  );
}

export default SearchFilter;
