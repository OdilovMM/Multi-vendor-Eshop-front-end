import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.customerAuth);
  if (!userInfo) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
