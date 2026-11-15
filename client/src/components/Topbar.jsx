import { useEffect, useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";

import { getNotifications, markAsRead } from "../services/notificationService";

function Topbar({ sidebarOpen, setSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      loadNotifications();
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
        <div className="notification-wrapper">
          <div
            className="notification-icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />

            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>

          {showNotifications && (
            <div className="notification-dropdown">
              <h4>Notifications</h4>

              {notifications.length === 0 ? (
                <p>No notifications.</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      notification.isRead ? "" : "unread"
                    }`}
                  >
                    <h5>{notification.title}</h5>

                    <p>{notification.message}</p>

                    {!notification.isRead && (
                      <button
                        className="read-btn"
                        onClick={() => handleRead(notification.id)}
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="user-profile">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="avatar-img" />
          ) : (
            <div className="avatar">
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
