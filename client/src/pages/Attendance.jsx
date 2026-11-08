import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import { getMembers } from "../services/memberService";
import { saveAttendance } from "../services/attendanceService";

function Attendance() {
  const [members, setMembers] = useState([]);
  const [service, setService] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await getMembers();

      const membersWithAttendance = response.data.map((member) => ({
        ...member,
        present: false,
      }));

      setMembers(membersWithAttendance);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAttendance = (id) => {
    setMembers(
      members.map((member) =>
        member.id === id
          ? {
              ...member,
              present: !member.present,
            }
          : member,
      ),
    );
  };

  const resetAttendance = () => {
    setMembers(
      members.map((member) => ({
        ...member,
        present: false,
      })),
    );

    setService("");
    setAttendanceDate("");
  };

  const handleSave = async () => {
    try {
      if (!service) {
        alert("Please select a service.");
        return;
      }

      if (!attendanceDate) {
        alert("Please select an attendance date.");
        return;
      }

      const selectedMembers = members.filter((member) => member.present);

      if (selectedMembers.length === 0) {
        alert("Please mark at least one member present.");
        return;
      }

      const attendanceData = selectedMembers.map((member) => ({
        memberId: member.id,
        memberName: member.fullName,
        service,
        attendanceDate,
        status: "Present",
      }));

      console.log(attendanceData);

      await saveAttendance(attendanceData);

      alert("Attendance saved successfully.");

      resetAttendance();
    } catch (error) {
      console.error(error);

      alert("Failed to save attendance.");
    }
  };

  return (
    <AdminLayout>
      <div className="attendance-container">
        <h1>Attendance Management</h1>

        <div className="attendance-form">
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select Service</option>

            <option value="Sunday Service">Sunday Service</option>

            <option value="Bible Study">Bible Study</option>

            <option value="Prayer Meeting">Prayer Meeting</option>

            <option value="Youth Service">Youth Service</option>
          </select>

          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>

        <table className="member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Ministry</th>
              <th>Present</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="4">No members found</td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id}>
                  <td>{member.fullName}</td>

                  <td>{member.phone}</td>

                  <td>{member.ministry}</td>

                  <td>
                    <input
                      type="checkbox"
                      checked={member.present}
                      onChange={() => toggleAttendance(member.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button className="profile-btn" onClick={handleSave}>
          Save Attendance
        </button>
      </div>
    </AdminLayout>
  );
}

export default Attendance;
