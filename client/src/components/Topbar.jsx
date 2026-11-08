import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

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
            <span className="user-name">Mpho</span>

            <span className="user-role">Admin</span>
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
