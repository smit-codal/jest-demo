import { Users } from "../../pages/users/types";
import { GET_USER_LIST, CREATE_USER } from "./types";

type InitialStateProps = {
  users: Users[];
};

const INITIAL_STATE: InitialStateProps = {
  users: [],
};

type ActionTypes = {
  type: string;
  payload: Users[];
};

const userReducer = (state = INITIAL_STATE, action: ActionTypes) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        users: action.payload,
      };

    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};

export default userReducer;
