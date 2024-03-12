import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Import your useAuth hook

export const ProtectedRoute = ({ element }) => {
  const user = useAuth();

  if (!user) {
    // Redirect to the login page
    return <Navigate to="/signin" />;
  }

  return element;
};
