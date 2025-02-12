import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login.tsx";
import Register from "../components/Auth/Register.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AdminDashboard from "../pages/AdminDashboard.tsx";
import UserDashboard from "../pages/UserDashboard.tsx";
import UserManagement from "../pages/UserManagement.tsx";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<ProtectedRoute component={AdminDashboard} role="admin" />} />
      <Route path="/user-dashboard" element={<ProtectedRoute component={UserDashboard} role="user" />} />
      {/* <Route path="/user-management" element={<ProtectedRoute component={UserManagement} role="admin" />} /> */}
    </Routes>
  );
};

export default AppRouter;
