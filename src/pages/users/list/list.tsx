import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../apiUtils";
import { Users } from "../types";
import { paths } from "../../../router";
import "./list.css";

export default function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    async function getUsersData() {
      const { data } = await getUsers();
      setUsers(data);
    }
    getUsersData();
  }, []);

  const handleUserDetail = (id: string) => {
    navigate(paths.userDetails + id);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(paths.login);
  };

  return (
    <div className="user-container center">
      <h1>Users List</h1>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => handleUserDetail(user.id)}>
                <th>{user.first_name}</th>
                <th>{user.last_name}</th>
                <th>{user.email}</th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="status-text">Fetching...</div>
      )}
      <button
        className="create-user"
        onClick={() => navigate(paths.createUser)}
      >
        Create User
      </button>
      <div data-testid="logout-btn" className="back-btn" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}
