import { Users } from "./pages/users/types";

const BASE_URL = "https://reqres.in/";

const USERS_LIST = "api/users";
const USER_LOGIN = "api/login";
const CREATE_USER = "api/users";

const fetchData = async (endPoint: string, method: string, data?: Object) => {
  return fetch(BASE_URL + endPoint, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      return res.json();
    })
    .then((json) => json);
};

const getUsers = (): Promise<{ data: Users[] }> => {
  return fetchData(USERS_LIST, "GET");
};

const fetchUserDetail = (id: string): Promise<{ data: Users }> => {
  return fetchData(`${USERS_LIST}/${id}`, "GET");
};

const loginUser = (data: { email: string; password: string }) => {
  return fetchData(`${USER_LOGIN}`, "POST", data);
};

const createUser = (user: { name: string; job: string }) => {
  return fetchData(`${CREATE_USER}`, "POST", user);
};

const updateUser = (id: string | undefined, user: { name: string; job: string }) => {
  return fetchData(`${CREATE_USER}/${id}`, "PUT", user);
};

export { getUsers, fetchUserDetail, loginUser, createUser, updateUser };
