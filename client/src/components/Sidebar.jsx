import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaCalendarAlt,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>ChurchConnect</h2>

      <ul>
        <li>
          <FaHome /> Dashboard
        </li>
        <li>
          <FaUsers /> Members
        </li>
        <li>
          <FaClipboardCheck /> Attendance
        </li>
        <li>
          <FaCalendarAlt /> Events
        </li>
        <li>
          <FaChartBar /> Reports
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
