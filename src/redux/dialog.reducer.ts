import { createAction, createReducer } from "@reduxjs/toolkit";

export interface DialogState {
  open: boolean;
  text: string;
  title: string;
  handleClickYes: () => void;
}

const initialState: DialogState = {
  open: false,
  text: "",
  title: "",
  handleClickYes: () => {
    return;
  },
};

export const setDialog = createAction<DialogState>("setDialog");
export const closeDialog = createAction<undefined>("closeDialog");


const dialogReducer = createReducer(initialState, (builder) =>
  builder.addCase(setDialog, (state, action) => {
    // immerjs giup mutate 1 state object 1 cach an toan
    state.open = action.payload.open;
    state.text = action.payload.text;
    state.title = action.payload.title;
    state.handleClickYes = action.payload.handleClickYes;
  }).addCase(closeDialog, (state) => {
    // immerjs giup mutate 1 state object 1 cach an toan
    state.open = false
  })
);

export default dialogReducer;
