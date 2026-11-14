import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getReminders } from "../../services/reminderService";

function PastorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [todayReminders, setTodayReminders] = useState([]);

  useEffect(() => {
    loadTodaysReminders();
  }, []);

  const loadTodaysReminders = async () => {
    try {
      const response = await getReminders(user.id);

      const today = new Date().toISOString().split("T")[0];

      const filtered = response.data.filter(
        (reminder) => reminder.reminderDate === today && !reminder.completed,
      );

      setTodayReminders(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>
            Welcome Back, {user?.fullName}
            👋
          </h1>

          <p>Here's what's on your schedule today.</p>
        </div>

        <div className="dashboard-card">
          <h2>Today's Reminders</h2>

          {todayReminders.length === 0 ? (
            <p>No reminders for today.</p>
          ) : (
            todayReminders.map((reminder) => (
              <div key={reminder.id} className="today-reminder">
                <div>
                  <h4>{reminder.title}</h4>

                  <p>{reminder.description}</p>
                </div>

                <span>⏰ {reminder.reminderTime}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default PastorDashboard;
