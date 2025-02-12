import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role }: { component: React.FC, role: string }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (userRole !== role) return <Navigate to="/" />;

  return <Component />;
};

export default ProtectedRoute;

