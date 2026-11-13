import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getMembers,
  createMember,
  deleteMember,
  updateMember,
} from "../../services/memberService";

function Members() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

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
      const response = await getMembers();
      setMembers(response.data);
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

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      ministry: "",
      status: "Active",
      joinDate: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMember(editingId, formData);
      } else {
        await createMember(formData);
      }

      resetForm();
      loadMembers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);

    setFormData({
      fullName: member.fullName || "",
      phone: member.phone || "",
      email: member.email || "",
      ministry: member.ministry || "",
      status: member.status || "Active",
      joinDate: member.joinDate || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      loadMembers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="members-container">
        <h1>Members</h1>

        <input
          type="text"
          placeholder="Search members..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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

          <button type="submit">
            {editingId ? "Update Member" : "Add Member"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
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
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="7">No members found</td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.fullName}</td>
                  <td>{member.phone}</td>
                  <td>{member.email}</td>
                  <td>{member.ministry}</td>
                  <td>{member.status}</td>
                  <td>{member.joinDate}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </button>

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
