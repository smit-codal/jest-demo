import { createBrowserRouter } from "react-router-dom";
import UsersList from "./pages/users/list/list";
import UserDetails from "./pages/users/detail/user-details";
import { LoginPage } from "./pages/login/login";
import CreateUsers from "./pages/users/create/create";
import ProtectedRoute from "./components/ProtectedRoute";

export const paths = {
  login: "/",
  userDetails: "/user-detail/",
  userList: "/user-list",
  createUser: "/create-user",
};

const router = createBrowserRouter([
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.userList,
    element: (
      <ProtectedRoute>
        <UsersList />
      </ProtectedRoute>
    ),
  },
  {
    path: paths.userDetails + ":id",
    element: (
      <ProtectedRoute>
        <UserDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: paths.createUser,
    element: (
      <ProtectedRoute>
        <CreateUsers />
      </ProtectedRoute>
    ),
  },
]);

export default router;
