import { Routes, Route } from "react-router-dom";

import Login from "../pages/admin/Login";
import Register from "../pages/admin/Register";

import Dashboard from "../pages/admin/Dashboard";
import Members from "../pages/admin/Members";
import Attendance from "../pages/admin/Attendance";
import Visitors from "../pages/admin/Visitors";
import Events from "../pages/admin/Events";
import Reports from "../pages/admin/Reports";
import Profile from "../pages/admin/Profile";
import BookAppointment from "../pages/public/BookAppointment";
import Appointments from "../pages/admin/Appointments";
import PastorAppointments from "../pages/pastor/Appointments";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/book-appointment" element={<BookAppointment />} />
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/members"
        element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/visitors"
        element={
          <ProtectedRoute>
            <Visitors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pastor/appointments"
        element={
          <ProtectedRoute>
            <PastorAppointments />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
