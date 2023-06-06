import { createBrowserRouter } from "react-router-dom";
import UsersList from "./pages/users/list/list";
import UserDetails from "./pages/users/detail/user-details";
import { LoginPage } from "./pages/login/login";

export const paths = {
  login: "/login",
  root: "/",
  userDetails: "/user-detail/",
};

const router = createBrowserRouter([
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.root,
    element: <UsersList />,
  },
  {
    path: paths.userDetails + ":id",
    element: <UserDetails />,
  },
]);

export default router;
