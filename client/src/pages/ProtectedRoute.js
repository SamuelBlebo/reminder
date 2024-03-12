import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const ProtectedRoute = ({ element }) => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to the login page
      navigate("/signin");
    }
  }, [user, navigate]);

  return user ? element : null;
};
