import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main">
        <Topbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
