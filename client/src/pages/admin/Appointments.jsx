import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await getAppointments();

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);

      loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="appointments-container">
        <h1>Appointment Requests</h1>

        <table className="member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Meeting Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8">No appointments found</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.fullName}</td>

                  <td>{appointment.phone}</td>

                  <td>{appointment.email}</td>

                  <td>{appointment.meetingType}</td>

                  <td>{appointment.preferredDate}</td>

                  <td>{appointment.preferredTime}</td>

                  <td>{appointment.status}</td>

                  <td>
                    <button
                      onClick={() => updateStatus(appointment.id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(appointment.id, "Declined")}
                    >
                      Decline
                    </button>

                    <button
                      onClick={() => updateStatus(appointment.id, "Completed")}
                    >
                      Complete
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

export default Appointments;
