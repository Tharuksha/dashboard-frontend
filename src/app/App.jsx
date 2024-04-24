import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import ManageBooks from "@/pages/ManageBooks/ManageBooks";
import DonateBooks from "@/pages/DonateBooks/DonateBooks";
import { useEffect, useState } from "react";
import "./globals.css";


function App() {
  const [admindashboard, setAdminDashboard] = useState(false);
  const [userdashboard, setUserDashboard] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("login");
    const role = localStorage.getItem("role");

    if (
      key === null ||
      role === null ||
      key === undefined ||
      role === undefined
    ) {
      navigate("/login");
    } else {
      if (role === "admin") {
        setAdminDashboard(true);
      } else {
        setUserDashboard(true);
      }
    }
  }, []);

  return (
    <div>
      {admindashboard ? (
        <AdminDashboard />
      ) : userdashboard ? (
        <UserDashboard />
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/books" element={<ManageBooks />} />
          <Route path="/donatebooks" element={<DonateBooks />} />
          
          
        </Routes>
      )}
    </div>
  );
}

export default App;
