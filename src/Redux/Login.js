import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginSuccess: false,
    loginFail: false,
    token: "",
    userId: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loginSuccess = true;
      state.loginFail = false;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    loginFail: (state) => {
      state.loginSuccess = false;
      state.loginFail = true;
      state.token = "";
    },
  },
});

export const { loginSuccess, loginFail } = loginSlice.actions;
export default loginSlice.reducer;
