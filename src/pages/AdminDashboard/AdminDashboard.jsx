import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ManageAdmin from "../ManageAdmin/ManageAdmin";
import routes from "../../common/navigation/routes";
import { LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(() => <ManageAdmin />);
  const firstname = localStorage.getItem("firstname");
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.clear();
    navigate("/login");
  };

  const handleMenuClick = (element) => {
    setActiveComponent(() => element);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-5">
        <h1 className="text-3xl font-bold mb-5 text-center">Dashboard</h1>
        <ul>
          {routes.map((val) => (
            <li key={val.key} onClick={() => handleMenuClick(val.element)}>
              <Button className="w-56 h-[55px] my-5 text-lg">{val.name}</Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-700 text-white p-5 flex justify-between items-center">
          <h2 className="text-2xl">Hello, {firstname}👋</h2>

          <Button onClick={handleLogout} variant="destructive" size="icon">
            <LogOut size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 bg-gray-700">
          <div>
            {activeComponent || (
              <div>Select a menu option to view its contents.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
