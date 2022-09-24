import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../../api/users";

const PrivateRoutes = () => {
  const { isAuth } = checkAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
