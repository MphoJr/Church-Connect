import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  createAnnouncement,
  getAnnouncements,
} from "../../services/announcementService";

function Announcements() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [announcements, setAnnouncements] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    audience: "Everyone",
    message: "",
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const response = await getAnnouncements();

    setAnnouncements(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createAnnouncement({
      ...formData,
      createdBy: user.fullName,
    });

    setFormData({
      title: "",
      audience: "Everyone",
      message: "",
    });

    loadAnnouncements();
  };

  return (
    <AdminLayout>
      <div className="announcements-page">
        <h1>Church Announcements</h1>

        <form className="announcement-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />

          <select
            value={formData.audience}
            onChange={(e) =>
              setFormData({
                ...formData,
                audience: e.target.value,
              })
            }
          >
            <option>Everyone</option>

            <option>Members</option>

            <option>Worship Team</option>

            <option>Youth Ministry</option>

            <option>Leadership Team</option>

            <option>Visitors</option>
          </select>

          <textarea
            rows="5"
            placeholder="Announcement..."
            value={formData.message}
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value,
              })
            }
          />

          <button type="submit">Publish</button>
        </form>

        <div className="announcement-list">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              <h3>{announcement.title}</h3>

              <span>Audience: {announcement.audience}</span>

              <p>{announcement.message}</p>

              <small>Posted by {announcement.createdBy}</small>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Announcements;
