import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../../api/users";

const CustomerRoutes = () => {
  const { isAuth, user } = checkAuth();

  return isAuth && !user.data.isAdmin ? <Outlet /> : <Navigate to="/main" />;
};

export default CustomerRoutes;
