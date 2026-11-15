import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import { getReminders } from "../../services/reminderService";
import { getPrayerRequests } from "../../services/prayerRequestService";

function PastorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [todayReminders, setTodayReminders] = useState([]);

  const [prayerStats, setPrayerStats] = useState({
    pending: 0,
    prayed: 0,
    archived: 0,
  });

  useEffect(() => {
    loadReminders();
    loadPrayerRequests();
  }, []);

  const loadReminders = async () => {
    try {
      const response = await getReminders(user.id);

      const today = new Date().toISOString().split("T")[0];

      const reminders = response.data.filter(
        (reminder) =>
          reminder.reminderDate?.split("T")[0] === today && !reminder.completed,
      );

      setTodayReminders(reminders);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPrayerRequests = async () => {
    try {
      const response = await getPrayerRequests();

      setPrayerStats({
        pending: response.data.filter((request) => request.status === "Pending")
          .length,

        prayed: response.data.filter(
          (request) => request.status === "Prayed For",
        ).length,

        archived: response.data.filter(
          (request) => request.status === "Archived",
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>Welcome Pastor {user?.fullName} 👋</h1>

          <p>Here's your ministry overview for today.</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Prayer Requests</h3>

            <div className="stat-number">{prayerStats.pending}</div>

            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>Prayed For</h3>

            <div className="stat-number">{prayerStats.prayed}</div>

            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>Archived</h3>

            <div className="stat-number">{prayerStats.archived}</div>

            <p>Records</p>
          </div>

          <div className="stat-card">
            <h3>Today's Reminders</h3>

            <div className="stat-number">{todayReminders.length}</div>

            <p>Tasks</p>
          </div>
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
