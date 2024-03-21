import { createSlice } from "@reduxjs/toolkit";

//estado inicial del user
const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export default userSlice.reducer;
//exportamos la actions

export const { setUser } = userSlice.actions;
