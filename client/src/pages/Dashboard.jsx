import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import AttendanceChart from "../components/AttendanceChart";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="welcome-section">
        <h1>Good Afternoon, Mpho 👋</h1>

        <p>
          Welcome back to ChurchConnect. Here's what's happening at your church
          today.
        </p>
      </div>
      <div className="stats">
        <StatCard title="Total Members" value="256" color="#2563eb" />

        <StatCard title="Attendance Today" value="184" color="#16a34a" />

        <StatCard title="Visitors This Month" value="32" color="#f59e0b" />

        <StatCard title="Upcoming Events" value="6" color="#9333ea" />
      </div>

      <div className="dashboard-content">
        <div className="panel">
          <h3>Recent Attendance</h3>

          <p>Sunday Service Attendance: 184</p>

          <p>Bible Study Attendance: 85</p>
        </div>

        <div className="panel">
          <h3>Upcoming Events</h3>

          <p>Youth Conference</p>

          <p>Prayer Night</p>

          <p>Community Outreach</p>
        </div>

        <div className="chart-panel">
          <h3>Attendance Trend</h3>
          <AttendanceChart />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
