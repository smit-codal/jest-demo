import { Users } from "../../pages/users/types";
import { GET_USER_LIST, CREATE_USER } from "./types";

export const createUser = (user: Users) => {
  return {
    type: CREATE_USER,
    payload: user
  };
};

export const getUsers = () => {
  return {
    type: GET_USER_LIST,
  };
};
