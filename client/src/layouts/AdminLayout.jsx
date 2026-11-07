import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Topbar />

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
