import { useEffect, useState } from "react";
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
    ministry: "",
  });

  const loadMembers = async () => {
    const res = await getMembers();
    setMembers(res.data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createMember(formData);

    setFormData({
      fullName: "",
      phone: "",
      ministry: "",
    });

    loadMembers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Members</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({
              ...formData,
              fullName: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Ministry"
          value={formData.ministry}
          onChange={(e) =>
            setFormData({
              ...formData,
              ministry: e.target.value,
            })
          }
        />

        <button type="submit">Add Member</button>
      </form>

      <hr />

      {members.map((member) => (
        <div key={member.id}>
          <strong>{member.fullName}</strong>

          {" - "}

          {member.ministry}

          <button
            onClick={async () => {
              await deleteMember(member.id);
              loadMembers();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Members;
