// src/pages/Reports.jsx

import AdminLayout from "../layouts/AdminLayout";
import AttendanceChart from "../components/AttendanceChart";

function Reports() {
  return (
    <AdminLayout>
      <div className="reports-container">
        <h1>Reports & Analytics</h1>

        <div className="stats">
          <div className="card">
            <h4>Total Members</h4>
            <h2>256</h2>
          </div>

          <div className="card">
            <h4>Attendance Rate</h4>
            <h2>82%</h2>
          </div>

          <div className="card">
            <h4>Visitors This Month</h4>
            <h2>15</h2>
          </div>

          <div className="card">
            <h4>Upcoming Events</h4>
            <h2>4</h2>
          </div>
        </div>

        <div className="chart-panel">
          <h3>Monthly Attendance Trend</h3>
          <AttendanceChart />
        </div>

        <div className="reports-grid">
          <div className="report-card">
            <h3>Top Ministries</h3>

            <ul>
              <li>Youth Ministry - 65 Members</li>
              <li>Women's Ministry - 54 Members</li>
              <li>Men's Ministry - 43 Members</li>
              <li>Media Team - 18 Members</li>
            </ul>
          </div>

          <div className="report-card">
            <h3>Attendance Summary</h3>

            <ul>
              <li>Sunday Service - 185</li>
              <li>Bible Study - 87</li>
              <li>Youth Service - 76</li>
              <li>Prayer Meeting - 58</li>
            </ul>
          </div>

          <div className="report-card">
            <h3>Visitor Summary</h3>

            <ul>
              <li>First-Time Visitors - 10</li>
              <li>Returning Visitors - 5</li>
              <li>Most Attended Service - Sunday Service</li>
            </ul>
          </div>

          <div className="report-card">
            <h3>Upcoming Events</h3>

            <ul>
              <li>Youth Conference</li>
              <li>Prayer Night</li>
              <li>Community Outreach</li>
              <li>Family Day</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Reports;
