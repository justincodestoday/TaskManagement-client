import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../../api/users";

const AdminRoutes = () => {
  const { isAuth, user } = checkAuth();

  return isAuth && user.data.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AdminRoutes;
