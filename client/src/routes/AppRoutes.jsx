import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  );
}

export default AppRoutes;
