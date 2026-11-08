import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { getStats, getAttendanceReport } from "../services/reportService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Reports() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalVisitors: 0,
    totalEvents: 0,
    totalAttendance: 0,
  });

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getStats();

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAttendanceReport = async () => {
    try {
      const response = await getAttendanceReport(startDate, endDate);

      const labels = Object.keys(response.data);

      const values = Object.values(response.data);

      setChartData({
        labels,
        datasets: [
          {
            label: "Attendance By Service",
            data: values,
            backgroundColor: ["#2563eb", "#16a34a", "#f59e0b", "#9333ea"],
            borderRadius: 8,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="reports-container">
        <h1>Reports & Analytics</h1>

        <div className="stats">
          <div className="card">
            <h4>Total Members</h4>
            <h2>{stats.totalMembers}</h2>
          </div>

          <div className="card">
            <h4>Total Visitors</h4>
            <h2>{stats.totalVisitors}</h2>
          </div>

          <div className="card">
            <h4>Total Events</h4>
            <h2>{stats.totalEvents}</h2>
          </div>

          <div className="card">
            <h4>Attendance Records</h4>
            <h2>{stats.totalAttendance}</h2>
          </div>
        </div>

        <div className="report-filters">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={loadAttendanceReport}>Generate Report</button>
        </div>

        <div className="chart-panel">
          <h3>Attendance By Service</h3>

          {chartData.labels.length > 0 ? (
            <Bar data={chartData} />
          ) : (
            <p>Select a date range and generate a report.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Reports;
