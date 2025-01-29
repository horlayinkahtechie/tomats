import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/Auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
