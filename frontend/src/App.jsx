import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Create Ticket */}
      <Route path="/create-ticket" element={<CreateTicket />} />

      {/* Ticket Details */}
      <Route path="/tickets/:ticketId" element={<TicketDetails />} />
    </Routes>
  );
}

export default App;
