const API_URL = import.meta.env.VITE_API_URL;

// Get Tickets
export async function getTickets(status = "", search = "") {
  const params = new URLSearchParams();

  if (status) {
    params.append("status", status);
  }

  if (search) {
    params.append("search", search);
  }

  const query = params.toString();

  const url = query
    ? `${API_URL}/api/tickets?${query}`
    : `${API_URL}/api/tickets`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

// Create Ticket
export async function createTicket(ticketData) {
  const response = await fetch(`${API_URL}/api/tickets`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  return response.json();
}

// Get Ticket
export async function getTicket(ticketId) {
  const response = await fetch(`${API_URL}/api/tickets/${ticketId}`);

  if (!response.ok) {
    throw new Error("Ticket not found");
  }

  return response.json();
}

// Update Ticket
export async function updateTicket(ticketId, data) {
  const response = await fetch(`${API_URL}/api/tickets/${ticketId}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update ticket");
  }

  return response.json();
}
