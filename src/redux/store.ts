import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    // Ten thuoc tinh duoi day de dat ten cho state store name
    user: userReducer,
  },
});

// Lấy RootState và AppDispatch từ store phuc vu cho TS
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
