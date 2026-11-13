import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

function Visitors() {
  const [visitors, setVisitors] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: "",
    firstVisitDate: "",
    invitedBy: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVisitor = {
      id: Date.now(),
      ...formData,
    };

    setVisitors([...visitors, newVisitor]);

    setFormData({
      fullName: "",
      phone: "",
      service: "",
      firstVisitDate: "",
      invitedBy: "",
    });
  };

  const handleDelete = (id) => {
    setVisitors(visitors.filter((visitor) => visitor.id !== id));
  };

  return (
    <AdminLayout>
      <div className="visitors-container">
        <h1>Visitors</h1>

        <form className="visitor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Visitor Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            <option>Sunday Service</option>
            <option>Bible Study</option>
            <option>Youth Service</option>
            <option>Prayer Meeting</option>
          </select>

          <input
            type="date"
            name="firstVisitDate"
            value={formData.firstVisitDate}
            onChange={handleChange}
          />

          <input
            type="text"
            name="invitedBy"
            placeholder="Invited By"
            value={formData.invitedBy}
            onChange={handleChange}
          />

          <button type="submit">Add Visitor</button>
        </form>

        <table className="member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Visit Date</th>
              <th>Invited By</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {visitors.length === 0 ? (
              <tr>
                <td colSpan="6">No visitors recorded</td>
              </tr>
            ) : (
              visitors.map((visitor) => (
                <tr key={visitor.id}>
                  <td>{visitor.fullName}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.service}</td>
                  <td>{visitor.firstVisitDate}</td>
                  <td>{visitor.invitedBy}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(visitor.id)}
                    >
                      Delete
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

export default Visitors;
