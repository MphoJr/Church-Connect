import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import Visitors from "../pages/Visitors";
import Attendance from "../pages/Attendance";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/members" element={<Members />} />
      <Route path="/visitors" element={<Visitors />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
}

export default AppRoutes;
