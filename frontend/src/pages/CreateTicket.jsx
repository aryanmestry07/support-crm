import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createTicket } from "../services/api";

function CreateTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Handle Input
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Submit Ticket
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createTicket(formData);

      navigate("/");
    } catch (error) {
      console.error(error);

      setError("Unable to create the ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-page">
      <header className="detail-header">
        <Link to="/">← Back to Dashboard</Link>
      </header>

      <main className="create-ticket-main">
        <div className="create-ticket-heading">
          <p className="eyebrow">CUSTOMER SUPPORT</p>

          <h1>Create Ticket</h1>

          <p>Create a new support request for a customer.</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form className="create-ticket-form" onSubmit={handleSubmit}>
          {/* Customer Information */}

          <div className="form-section">
            <h2>Customer Information</h2>

            <p className="form-section-description">
              Enter the customer's contact details.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customer_name">Customer Name</label>

                <input
                  id="customer_name"
                  type="text"
                  name="customer_name"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer_email">Customer Email</label>

                <input
                  id="customer_email"
                  type="email"
                  name="customer_email"
                  placeholder="e.g. rahul@gmail.com"
                  value={formData.customer_email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Ticket Information */}

          <div className="form-section">
            <h2>Ticket Information</h2>

            <p className="form-section-description">
              Describe the customer's issue.
            </p>

            <div className="form-group">
              <label htmlFor="subject">Issue Title</label>

              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="e.g. Payment failed"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={7}
                required
              />
            </div>
          </div>

          {/* Form Actions */}

          <div className="form-actions">
            <Link to="/" className="cancel-button">
              Cancel
            </Link>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateTicket;
