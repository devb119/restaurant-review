import { createReducer } from "@reduxjs/toolkit";
import { IUserModel } from "../models";

interface UserState {
  user: IUserModel | Record<string, never>;
}

const initialState: UserState = {
  user: {},
};

const userReducer = createReducer(initialState, (builder) =>
  console.log(builder)
);

export default userReducer;
