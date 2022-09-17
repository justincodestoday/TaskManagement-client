import { useNavigate } from "react-router-dom";
import { logout } from "../../api/users";

export const Main = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div>This is the main component</div>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};
