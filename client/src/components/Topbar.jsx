import { FaBars, FaBell } from "react-icons/fa";
import { getNotifications } from "../services/notificationService";
import { useEffect, useState } from "react";

function Topbar({ sidebarOpen, setSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await getNotifications(user.id);

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
      </div>

      <div className="topbar-right">
        <div className="notification-icon">
          <FaBell />

          <span className="notification-badge">{unreadCount}</span>
        </div>

        <div className="user-profile">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="avatar-img" />
          ) : (
            <div className="avatar">
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}

          <div className="user-info">
            <span className="user-name">{user?.fullName}</span>

            <span className="user-role">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
