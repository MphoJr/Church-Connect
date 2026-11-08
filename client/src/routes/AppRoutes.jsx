import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import Visitors from "../pages/Visitors";
import Attendance from "../pages/Attendance";
import Events from "../pages/Events";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Login from "../pages/Login";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/members" element={<Members />} />
      <Route path="/visitors" element={<Visitors />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/events" element={<Events />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
