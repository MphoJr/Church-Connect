import { NavLink } from "react-router-dom";

function PastorLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>ChurchConnect</h2>

        <nav className="sidebar-nav">
          <NavLink to="/pastor/dashboard">Dashboard</NavLink>

          <NavLink to="/pastor/appointments">Appointments</NavLink>

          <NavLink to="/pastor/calendar">Calendar</NavLink>

          <NavLink to="/pastor/reminders">Reminders</NavLink>

          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <h3>Welcome, {user?.fullName}</h3>
        </div>

        {children}
      </main>
    </div>
  );
}

export default PastorLayout;
