import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Attendance() {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", present: false },
    { id: 2, name: "Mary Smith", present: false },
    { id: 3, name: "Peter Jones", present: false },
    { id: 4, name: "Sarah Williams", present: false },
  ]);

  const handleAttendance = (id) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, present: !member.present } : member,
      ),
    );
  };

  const handleSave = () => {
    console.log({
      service,
      date,
      attendance: members,
    });

    alert("Attendance recorded successfully");
  };

  return (
    <AdminLayout>
      <div className="attendance-container">
        <h1>Attendance Management</h1>

        <div className="attendance-form">
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select Service</option>
            <option>Sunday Service</option>
            <option>Bible Study</option>
            <option>Youth Service</option>
            <option>Prayer Meeting</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Present</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>

                  <td>
                    <input
                      type="checkbox"
                      checked={member.present}
                      onChange={() => handleAttendance(member.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Attendance
        </button>
      </div>
    </AdminLayout>
  );
}

export default Attendance;
