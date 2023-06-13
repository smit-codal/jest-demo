import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../pages/users/types";

type InitialStateProps = {
  users: Users[];
};

const initialState: InitialStateProps = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserList: (state, action: PayloadAction<Users[]>) => {
      state.users = action.payload;
    },
    createUserOnStore: (state, action: PayloadAction<Users>) => {
      state.users.push(action.payload);
    },
  },
});

export const { getUserList, createUserOnStore } = userSlice.actions;

export default userSlice.reducer;
