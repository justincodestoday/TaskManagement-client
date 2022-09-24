import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../../api/users";

const PublicRoutes = () => {
  const { isAuth } = checkAuth();

  return !isAuth ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoutes;
