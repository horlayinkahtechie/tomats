import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, requiredRole, children }) => {
  const navigate = useNavigate;
  if (!user || (requiredRole && role !== requiredRole)) {
    return navigate("/");
  }
  return children;
};

export default ProtectedRoute;
