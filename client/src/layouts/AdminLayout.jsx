import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="container">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="main">
        <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
