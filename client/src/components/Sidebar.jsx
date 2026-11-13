import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaUserFriends,
  FaCalendarAlt,
  FaChartBar,
  FaUserCircle,
  FaCalendarCheck,
  FaBell,
} from "react-icons/fa";

function Sidebar({ sidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "Admin";

  const isPastor = user?.role === "Pastor";

  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
      }`}
    >
      <div className="sidebar-logo">
        {sidebarOpen ? <h2>ChurchConnect</h2> : <h2>CC</h2>}
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          <FaHome />
          {sidebarOpen && <span>Dashboard</span>}
        </NavLink>

        {isAdmin && (
          <>
            <NavLink to="/members">
              <FaUsers />
              {sidebarOpen && <span>Members</span>}
            </NavLink>

            <NavLink to="/attendance">
              <FaClipboardCheck />
              {sidebarOpen && <span>Attendance</span>}
            </NavLink>

            <NavLink to="/visitors">
              <FaUserFriends />
              {sidebarOpen && <span>Visitors</span>}
            </NavLink>

            <NavLink to="/events">
              <FaCalendarAlt />
              {sidebarOpen && <span>Events</span>}
            </NavLink>

            <NavLink to="/reports">
              <FaChartBar />
              {sidebarOpen && <span>Reports</span>}
            </NavLink>

            <NavLink to="/appointments">
              <FaCalendarCheck />
              {sidebarOpen && <span>Appointments</span>}
            </NavLink>
          </>
        )}

        {isPastor && (
          <>
            <NavLink to="/pastor/appointments">
              <FaCalendarCheck />
              {sidebarOpen && <span>Appointments</span>}
            </NavLink>

            <NavLink to="/pastor/calendar">
              <FaCalendarAlt />
              {sidebarOpen && <span>Calendar</span>}
            </NavLink>

            <NavLink to="/pastor/reminders">
              <FaBell />
              {sidebarOpen && <span>Reminders</span>}
            </NavLink>

            <NavLink to="/reports">
              <FaChartBar />
              {sidebarOpen && <span>Reports</span>}
            </NavLink>
          </>
        )}

        <NavLink to="/profile">
          <FaUserCircle />
          {sidebarOpen && <span>My Profile</span>}
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
