import { useEffect, useState } from "react";
import { getAnnouncements } from "../../services/announcementService";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const response = await getAnnouncements();

      setAnnouncements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="public-announcements-page">
      <div className="page-header">
        <h1>Church Announcements</h1>

        <p>Stay updated with the latest church news and upcoming activities.</p>
      </div>

      <div className="announcement-list">
        {announcements.length === 0 ? (
          <div className="empty-announcements">
            <h3>No Announcements Available</h3>

            <p>Please check back later.</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              <span className="audience-badge">{announcement.audience}</span>

              <h2>{announcement.title}</h2>

              <p>{announcement.message}</p>

              <small>Posted by {announcement.createdBy}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Announcements;
