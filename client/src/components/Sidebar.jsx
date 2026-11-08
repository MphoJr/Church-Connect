import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaUserFriends,
  FaCalendarAlt,
  FaChartBar,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <div className="sidebar-header">
        {sidebarOpen && <h2>ChurchConnect</h2>}

        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <FaHome />
              {sidebarOpen && <span>Dashboard</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/members">
              <FaUsers />
              {sidebarOpen && <span>Members</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/attendance">
              <FaClipboardCheck />
              {sidebarOpen && <span>Attendance</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/visitors">
              <FaUserFriends />
              {sidebarOpen && <span>Visitors</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/events">
              <FaCalendarAlt />
              {sidebarOpen && <span>Events</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/reports">
              <FaChartBar />
              {sidebarOpen && <span>Reports</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile">
              <FaUserCircle />
              {sidebarOpen && <span>My Profile</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
