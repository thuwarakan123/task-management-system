import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login.tsx";
//import Register from "../components/Auth/Register.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AdminDashboard from "../pages/Dashboard.tsx";
import UpdatePassword from "../components/Auth/UpdatePassword.tsx";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
      {/* <Route path="/user-dashboard" element={<ProtectedRoute component={UserDashboard} role="user" />} /> */}
      {/* <Route path="/user-management" element={<ProtectedRoute component={UserManagement} role="admin" />} /> */}
      {/* <Route path="/admin-tasks" element={<ProtectedRoute component={AdminTaskManagement} role="admin" />} />
      <Route path="/user-tasks" element={<ProtectedRoute component={UserTaskManagement} role="user" />} /> */}
    </Routes>
  );
};

export default AppRouter;
