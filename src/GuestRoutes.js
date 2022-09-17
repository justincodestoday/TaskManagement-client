import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "./api/users";

const GuestRoutes = () => {
    const { isAuth } = checkAuth();

    return !isAuth ? <Outlet /> : <Navigate to="/main" />;
};

export default GuestRoutes;
