import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // Wrong role
    return <Navigate to="/login" />;
  }

  return children; // everything ok
}

export default ProtectedRoute;
