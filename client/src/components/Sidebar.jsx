import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaCalendarAlt,
  FaChartBar,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>ChurchConnect</h2>
      <ul>
        <li>
          <Link to="/dashboard">
            <FaHome /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/members">
            <FaUsers /> Members
          </Link>
        </li>

        <li>
          <Link to="/attendance">
            <FaClipboardCheck /> Attendance
          </Link>
        </li>

        <li>
          <Link to="/events">
            <FaCalendarAlt /> Events
          </Link>
        </li>

        <li>
          <Link to="/reports">
            <FaChartBar /> Reports
          </Link>
        </li>
        <li>
          <Link to="/visitors">
            <FaUserFriends />
            Visitors
          </Link>
        </li>
      </ul>{" "}
    </div>
  );
};

export default Sidebar;
