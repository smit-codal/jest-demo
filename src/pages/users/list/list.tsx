import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../apiUtils";
import { Users } from "../types";
import { paths } from "../../../router";
import "./users.css";

export default function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    async function getUsersData() {
      const users = await getUsers();
      console.log(users)
      if(users[0].email) {
        console.log("email exists")
      }
      setUsers(users);
    }
    getUsersData();
  }, []);

  const handleUserDetail = (id: string) => {
    navigate(paths.userDetails + id)
  };

  return (
    <>
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
      ) : null}
    </>
  );
}
