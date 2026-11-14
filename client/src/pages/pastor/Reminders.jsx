import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  createReminder,
  getReminders,
  completeReminder,
} from "../../services/reminderService";

function Reminders() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [reminders, setReminders] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reminderDate: "",
    reminderTime: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const response = await getReminders(user.id);

      setReminders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createReminder({
        ...formData,
        userId: user.id,
      });

      setFormData({
        title: "",
        description: "",
        reminderDate: "",
        reminderTime: "",
      });

      loadReminders();
    } catch (error) {
      console.error(error);
      alert("Failed to create reminder.");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeReminder(id);

      loadReminders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="reminders-page">
        <h1>My Reminders</h1>

        <form className="reminder-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Reminder Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="reminderDate"
            value={formData.reminderDate}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="reminderTime"
            value={formData.reminderTime}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {loading ? "Saving..." : "Add Reminder"}
          </button>
        </form>

        <div className="reminder-list">
          {reminders.length === 0 ? (
            <div className="empty-reminders">
              <h3>No Reminders Yet</h3>

              <p>Create your first reminder above.</p>
            </div>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`reminder-card ${
                  reminder.completed ? "completed" : ""
                }`}
              >
                <div className="reminder-header">
                  <h3>{reminder.title}</h3>

                  <span
                    className={`status-badge ${
                      reminder.completed ? "status-completed" : "status-pending"
                    }`}
                  >
                    {reminder.completed ? "Completed" : "Pending"}
                  </span>
                </div>

                <p className="reminder-description">
                  {reminder.description || "No description provided"}
                </p>

                <div className="reminder-details">
                  <div className="detail-item">📅 {reminder.reminderDate}</div>

                  <div className="detail-item">⏰ {reminder.reminderTime}</div>
                </div>

                {!reminder.completed && (
                  <button
                    className="complete-btn"
                    onClick={() => handleComplete(reminder.id)}
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Reminders;
