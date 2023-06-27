import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import dialogReducer from "./dialog.reducer";

export const store = configureStore({
  reducer: {
    // Ten thuoc tinh duoi day de dat ten cho state store name
    user: userReducer,
    dialog: dialogReducer
  },
});

// Lấy RootState và AppDispatch từ store phuc vu cho TS
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
