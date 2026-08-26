import { NavLink } from "react-router-dom";

// Navigation Bar
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="brand">
          <span className="brand-icon">S</span>

          <span>Support CRM</span>
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
        </div>
      </div>

      <NavLink to="/create-ticket" className="create-ticket-button">
        <span>+</span>
        Create Ticket
      </NavLink>
    </nav>
  );
}

export default Navbar;
