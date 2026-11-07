import { FaBars } from "react-icons/fa";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="topbar">
      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars />
      </button>

      <h3>ChurchConnect</h3>

      <div>Welcome Admin</div>
    </div>
  );
};

export default Topbar;
