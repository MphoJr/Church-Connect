import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Events() {
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    eventDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      ...formData,
    };

    setEvents([...events, newEvent]);

    setFormData({
      title: "",
      venue: "",
      eventDate: "",
      description: "",
    });
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <AdminLayout>
      <div className="events-container">
        <h1>Events Management</h1>

        <form className="event-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Name"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
          />

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">Create Event</button>
        </form>

        <table className="member-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="5">No events created</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.venue}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.description}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Events;
