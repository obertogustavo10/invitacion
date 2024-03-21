import { configureStore } from "@reduxjs/toolkit";
import user from "./slides/user/userSlide";

export const store = configureStore({
  reducer: {
    user,
  },
});
