import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/eventService";

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    eventDate: "",
    description: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      venue: "",
      eventDate: "",
      description: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateEvent(editingId, formData);
      } else {
        await createEvent(formData);
      }

      resetForm();
      loadEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);

    setFormData({
      title: event.title || "",
      venue: event.venue || "",
      eventDate: event.eventDate || "",
      description: event.description || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      loadEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="events-container">
        <h1>Events Management</h1>

        <input
          type="text"
          placeholder="Search events..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Update Event" : "Create Event"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
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
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="5">No events found</td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.venue}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.description}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>

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
