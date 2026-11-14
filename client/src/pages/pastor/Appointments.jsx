import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getPastorAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";

function Appointments() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await getPastorAppointments(user.id);

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateAppointmentStatus(id, "Completed");

      loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Approved":
        return "status-approved";

      case "Completed":
        return "status-completed";

      case "Declined":
        return "status-declined";

      default:
        return "";
    }
  };

  return (
    <AdminLayout>
      <div className="appointments-container">
        <h1>My Appointments</h1>

        <p>View and manage your assigned appointments.</p>

        {loading ? (
          <p>Loading appointments...</p>
        ) : (
          <table className="member-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Meeting Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8">No appointments assigned.</td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.fullName}</td>

                    <td>{appointment.phone}</td>

                    <td>{appointment.meetingType}</td>

                    <td>{appointment.preferredDate}</td>

                    <td>{appointment.preferredTime}</td>

                    <td>{appointment.message}</td>

                    <td className={getStatusClass(appointment.status)}>
                      {appointment.status}
                    </td>

                    <td>
                      {appointment.status !== "Completed" && (
                        <button
                          className="action-btn complete-btn"
                          onClick={() => handleComplete(appointment.id)}
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default Appointments;
