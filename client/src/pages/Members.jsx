import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  getMembers,
  createMember,
  deleteMember,
} from "../services/memberService";

function Members() {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    ministry: "",
    status: "Active",
    joinDate: "",
  });

  const loadMembers = async () => {
    try {
      const res = await getMembers();
      setMembers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMember(formData);

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        ministry: "",
        status: "Active",
        joinDate: "",
      });

      loadMembers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      loadMembers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="members-container">
        <h1>Members</h1>

        <form className="member-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
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

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <select
            name="ministry"
            value={formData.ministry}
            onChange={handleChange}
          >
            <option value="">Select Ministry</option>
            <option value="Youth">Youth</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Worship">Worship</option>
            <option value="Media">Media</option>
            <option value="Children">Children</option>
          </select>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
          />

          <button type="submit">Add Member</button>
        </form>

        <table className="member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Ministry</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="7">No members found</td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id}>
                  <td>{member.fullName}</td>
                  <td>{member.phone}</td>
                  <td>{member.email}</td>
                  <td>{member.ministry}</td>
                  <td>{member.status}</td>
                  <td>{member.joinDate}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(member.id)}
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

export default Members;
