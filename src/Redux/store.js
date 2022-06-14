import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";
import loginReducer from "./Login";
import { taskReducer } from "./Task/reducer";
export const store = configureStore(
  {
    reducer: {
      login: loginReducer,
      task: taskReducer,
    },
  },

  applyMiddleware(ReduxThunk)
);
