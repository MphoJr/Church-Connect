import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaUserFriends,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({ sidebarOpen }) => {
  return (
    <div
      className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <div className="sidebar-header">
        <h2>{sidebarOpen ? "ChurchConnect" : "CC"}</h2>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">
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
            <NavLink to="/settings">
              <FaCog />
              {sidebarOpen && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
