import {Users} from "./pages/users/types";

const BASE_URL = "https://reqres.in/";

const USERS_LIST = "api/users";

const fetchData = async (endPoint: string) => {
  return fetch(BASE_URL + endPoint)
    .then((res) => res.json())
    .then((json) => json.data);
};

const getUsers = (): Promise<Users[]> => {
  return fetchData(USERS_LIST);
};

const fetchUserDetail = (id: string): Promise<Users> => {
  return fetchData(`${USERS_LIST}/${id}`)
}

export { getUsers, fetchUserDetail };
