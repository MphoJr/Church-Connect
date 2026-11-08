import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.fullName || "Guest";

  const role = user?.role || "User";

  return (
    <div className="topbar">
      <div className="topbar-title">ChurchConnect</div>

      <div className="topbar-right">
        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="user-profile" onClick={() => navigate("/profile")}>
          <div className="avatar">M</div>

          <div className="user-info">
            <span className="user-name">{userName}</span>

            <span className="user-role">{role}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
