import { useEffect, useState } from "react";

import {
  FaUsers,
  FaUserFriends,
  FaCalendarAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

import { getDashboardStats } from "../../services/dashboardService";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalMembers: 0,
    totalVisitors: 0,
    totalEvents: 0,
    totalAttendance: 0,
    recentEvents: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardStats();

      setStats({
        totalMembers: response.data.totalMembers || 0,

        totalVisitors: response.data.totalVisitors || 0,

        totalEvents: response.data.totalEvents || 0,

        totalAttendance: response.data.totalAttendance || 0,

        recentEvents: response.data.recentEvents || [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>
            Welcome back, {user?.fullName}
            👋
          </h1>

          <p>Here's a summary of your church management system.</p>
        </div>

        <div className="stats-grid">
          <div className="dashboard-card">
            <FaUsers className="card-icon" />

            <div>
              <h4>Total Members</h4>

              <h2>{stats.totalMembers}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <FaUserFriends className="card-icon" />

            <div>
              <h4>Total Visitors</h4>

              <h2>{stats.totalVisitors}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <FaCalendarAlt className="card-icon" />

            <div>
              <h4>Total Events</h4>

              <h2>{stats.totalEvents}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <FaClipboardCheck className="card-icon" />

            <div>
              <h4>Attendance Records</h4>

              <h2>{stats.totalAttendance}</h2>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Upcoming Events</h2>

          {loading ? (
            <p>Loading events...</p>
          ) : (
            <table className="member-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentEvents && stats.recentEvents.length > 0 ? (
                  stats.recentEvents.map((event) => (
                    <tr key={event.id}>
                      <td>{event.title}</td>

                      <td>{event.venue}</td>

                      <td>{event.eventDate}</td>
                      <td>
                        {event.description?.length > 50
                          ? `${event.description.substring(0, 50)}...`
                          : event.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No events found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
