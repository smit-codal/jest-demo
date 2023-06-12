import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../router";

function ProtectedRoute({ children }: { children: any }) {
  const navigate = useNavigate();
  const isAuth = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  useEffect(() => {
    if (!isAuth()) {
      navigate(paths.login);
    }
  }, []);

  return children;
}
export default ProtectedRoute;
